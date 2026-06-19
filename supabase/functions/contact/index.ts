import { createClient } from 'npm:@supabase/supabase-js@2';
import { Resend } from 'npm:resend@6.14.0';

type ContactRequestBody = {
	inquiry_types?: string[];
	inquiry_content?: string;
	name?: string;
	phone?: string;
	email?: string;
	brand_names?: string;
	brand_launch_status?: string | null;
	brand_launch_month?: string | null;
	referral_source?: string;
	referral_other?: string | null;
	showroom_operation?: boolean | null;
	marketing_agreed?: boolean;
};

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(01[016789]|02|0[3-9][0-9])[0-9]{3,4}[0-9]{4}$/;

const normalizeString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			...corsHeaders,
			'Content-Type': 'application/json',
		},
	});

const getSupabaseSecretKey = () => {
	const explicitSecretKey = Deno.env.get('SUPABASE_SECRET_KEY');
	if (explicitSecretKey) return explicitSecretKey;

	const legacyServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
	if (legacyServiceRoleKey) return legacyServiceRoleKey;

	const secretKeysJson = Deno.env.get('SUPABASE_SECRET_KEYS');
	if (!secretKeysJson) return null;

	try {
		const secretKeys = JSON.parse(secretKeysJson) as Record<string, string>;
		return secretKeys.default ?? Object.values(secretKeys)[0] ?? null;
	} catch {
		return null;
	}
};

const validatePayload = (payload: Partial<ContactRequestBody>) => {
	const inquiryTypes = Array.isArray(payload.inquiry_types) ? payload.inquiry_types.filter(type => typeof type === 'string' && type.trim()) : [];
	const phoneNumbers = normalizeString(payload.phone).replace(/[^0-9]/g, '');

	if (inquiryTypes.length === 0) return '문의 유형을 하나 이상 선택해주세요.';
	if (!normalizeString(payload.name)) return '성함을 입력해주세요.';
	if (!normalizeString(payload.phone)) return '연락처를 입력해주세요.';
	if (!phoneRegex.test(phoneNumbers)) return '올바른 전화번호 형식이 아닙니다.';
	if (!normalizeString(payload.email)) return '이메일을 입력해주세요.';
	if (!emailRegex.test(normalizeString(payload.email))) return '올바른 이메일 형식이 아닙니다.';
	if (!normalizeString(payload.brand_names)) return '브랜드명을 입력해주세요.';
	if (!normalizeString(payload.referral_source)) return '유입 경로를 선택해주세요.';
	if (payload.referral_source === '기타' && !normalizeString(payload.referral_other)) return '기타 유입 경로 내용을 입력해주세요.';

	return null;
};

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const formatNotificationText = (contact: Required<Omit<ContactRequestBody, 'brand_launch_status' | 'brand_launch_month' | 'showroom_operation'>> & Pick<ContactRequestBody, 'referral_other'>) => {
	const lines = [
		'새 문의가 접수되었습니다.',
		'',
		`문의 유형: ${contact.inquiry_types.join(', ')}`,
		`성함: ${contact.name}`,
		`연락처: ${contact.phone}`,
		`이메일: ${contact.email}`,
		`브랜드명: ${contact.brand_names}`,
		`유입 경로: ${contact.referral_source}${contact.referral_other ? ` (${contact.referral_other})` : ''}`,
		`마케팅 정보 수신 동의: ${contact.marketing_agreed ? '동의' : '미동의'}`,
		'',
		'문의 내용:',
		contact.inquiry_content || '-',
	];

	return lines.join('\n');
};

const formatNotificationHtml = (contact: Required<Omit<ContactRequestBody, 'brand_launch_status' | 'brand_launch_month' | 'showroom_operation'>> & Pick<ContactRequestBody, 'referral_other'>) => {
	const rows = [
		['문의 유형', contact.inquiry_types.join(', ')],
		['성함', contact.name],
		['연락처', contact.phone],
		['이메일', contact.email],
		['브랜드명', contact.brand_names],
		['유입 경로', `${contact.referral_source}${contact.referral_other ? ` (${contact.referral_other})` : ''}`],
		['마케팅 정보 수신 동의', contact.marketing_agreed ? '동의' : '미동의'],
	];

	return `
		<h2>새 문의가 접수되었습니다.</h2>
		<table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 720px;">
			<tbody>
				${rows
					.map(
						([label, value]) => `
							<tr>
								<th align="left" style="border: 1px solid #e5e7eb; background: #f9fafb; width: 180px;">${escapeHtml(label)}</th>
								<td style="border: 1px solid #e5e7eb;">${escapeHtml(value || '-')}</td>
							</tr>
						`
					)
					.join('')}
			</tbody>
		</table>
		<h3>문의 내용</h3>
		<p style="white-space: pre-wrap;">${escapeHtml(contact.inquiry_content || '-')}</p>
	`;
};

Deno.serve(async request => {
	if (request.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	if (request.method !== 'POST') {
		return jsonResponse({ message: '허용되지 않은 요청 방식입니다.' }, 405);
	}

	const supabaseUrl = Deno.env.get('SUPABASE_URL');
	const supabaseSecretKey = getSupabaseSecretKey();
	const resendApiKey = Deno.env.get('RESEND_API_KEY');
	const notificationFrom = Deno.env.get('CONTACT_NOTIFICATION_FROM');
	const notificationTo = (Deno.env.get('CONTACT_NOTIFICATION_TO') ?? '')
		.split(',')
		.map(email => email.trim())
		.filter(Boolean);

	if (!supabaseUrl || !supabaseSecretKey) {
		return jsonResponse({ message: 'Supabase 환경 변수가 설정되지 않았습니다.' }, 500);
	}

	if (!resendApiKey || !notificationFrom || notificationTo.length === 0) {
		return jsonResponse({ message: '문의 알림 이메일 환경 변수가 설정되지 않았습니다.' }, 500);
	}

	let payload: Partial<ContactRequestBody>;

	try {
		payload = await request.json();
	} catch {
		return jsonResponse({ message: '요청 형식이 올바르지 않습니다.' }, 400);
	}

	const validationError = validatePayload(payload);
	if (validationError) {
		return jsonResponse({ message: validationError }, 400);
	}

	const contact = {
		inquiry_types: payload.inquiry_types?.map(type => type.trim()).filter(Boolean) ?? [],
		inquiry_content: normalizeString(payload.inquiry_content),
		name: normalizeString(payload.name),
		phone: normalizeString(payload.phone),
		email: normalizeString(payload.email),
		brand_names: normalizeString(payload.brand_names),
		brand_launch_status: payload.brand_launch_status ?? null,
		brand_launch_month: payload.brand_launch_month ?? null,
		referral_source: normalizeString(payload.referral_source),
		referral_other: payload.referral_source === '기타' ? normalizeString(payload.referral_other) : null,
		showroom_operation: payload.showroom_operation ?? null,
		marketing_agreed: Boolean(payload.marketing_agreed),
	};

	const supabase = createClient(supabaseUrl, supabaseSecretKey, {
		auth: {
			persistSession: false,
		},
	});

	const { data: insertedContact, error } = await supabase
		.from('contacts')
		.insert([
			{
				...contact,
				status: 'new',
			},
		])
		.select('id')
		.single();

	if (error || !insertedContact) {
		console.error('문의 저장 실패:', error);
		return jsonResponse({ message: '문의 제출 중 오류가 발생했습니다.' }, 500);
	}

	const resend = new Resend(resendApiKey);

	try {
		await resend.emails.send({
			from: notificationFrom,
			to: notificationTo,
			subject: `[BNB CNX] ${contact.name} 님의 새 문의가 접수되었습니다.`,
			text: formatNotificationText(contact),
			html: formatNotificationHtml(contact),
			replyTo: contact.email,
		});
	} catch (emailError) {
		console.error('문의 알림 이메일 발송 실패:', emailError);

		const { error: deleteError } = await supabase.from('contacts').delete().eq('id', insertedContact.id);
		if (deleteError) {
			console.error('알림 실패 후 문의 저장 롤백 실패:', deleteError);
		}

		return jsonResponse({ message: '알림 이메일 발송에 실패해 문의 접수가 완료되지 않았습니다. 잠시 후 다시 시도해주세요.' }, 502);
	}

	return jsonResponse({
		ok: true,
		message: '문의가 접수되고 알림 이메일이 발송되었습니다.',
	});
});

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase, ContactFormData } from '@/lib/supabase';
import { toast } from 'sonner';

const INQUIRY_TYPES = [
	'중국 SNS 체험단 문의',
	'중국 SNS 채널 및 공식몰 운영 대행 문의',
	'LIVE 커머스 진행 문의',
	'글로벌 PPL / 협찬 마케팅 문의',
	'CNX 한국 브랜드 셀렉샵 무료입점 문의',
	'협업 / 기타 문의 사항',
];

const REFERRAL_SOURCES = ['지인 추천', '샤오홍슈', '유튜브', '인스타그램', '네이버검색', '구글 검색', '기타'];

export default function ContactForm() {
	const [formData, setFormData] = useState<ContactFormData>({
		inquiry_types: [],
		inquiry_content: '',
		name: '',
		phone: '',
		email: '',
		brand_names: '',
		referral_source: '',
		referral_other: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [privacyAgreed, setPrivacyAgreed] = useState(false);
	const [marketingAgreed, setMarketingAgreed] = useState(false);

	const handleCheckboxChange = (value: string, checked: boolean | 'indeterminate') => {
		if (checked === 'indeterminate') return;
		setFormData(prev => ({
			...prev,
			inquiry_types: checked ? [...(prev.inquiry_types ?? []), value] : (prev.inquiry_types ?? []).filter(type => type !== value),
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		let newValue = value;

		if (name === 'phone') {
			newValue = formatPhoneNumber(value);
		}

		setFormData(prev => ({ ...prev, [name]: newValue }));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	// 이메일 유효성 검사
	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// 전화번호 포맷팅 (하이픈 자동 추가)
	const formatPhoneNumber = (value: string) => {
		const numbers = value.replace(/[^0-9]/g, '');

		if (numbers.startsWith('02')) {
			// 02 (Seoul)
			if (numbers.length <= 2) return numbers;
			if (numbers.length <= 5) return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
			if (numbers.length <= 9) return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(5)}`;
			return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
		} else {
			// Others (010, 031, etc.)
			if (numbers.length <= 3) return numbers;
			if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
			if (numbers.length <= 10) return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
			return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
		}
	};

	// 전화번호 유효성 검사 (한국 전화번호 형식)
	const validatePhone = (phone: string): boolean => {
		// 숫자만 추출
		const phoneNumbers = phone.replace(/[^0-9]/g, '');
		// 010-XXXX-XXXX, 02-XXX-XXXX, 031-XXX-XXXX 등 한국 전화번호 형식
		const phoneRegex = /^(01[016789]|02|0[3-9][0-9])[0-9]{3,4}[0-9]{4}$/;
		return phoneRegex.test(phoneNumbers);
	};

	// 스크롤 헬퍼 함수
	const scrollToElement = (elementId: string) => {
		const element = document.getElementById(elementId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'center' });
			// 포커스 가능한 요소면 포커스
			if (element instanceof HTMLElement) {
				element.focus();
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// 필수 항목 검증
		if (!formData.inquiry_types || formData.inquiry_types.length === 0) {
			toast.warning('문의 유형을 하나 이상 선택해주세요.');
			scrollToElement('inquiry_types');
			return;
		}

		if (!formData.name || !formData.name.trim()) {
			toast.warning('성함을 입력해주세요.');
			scrollToElement('name');
			return;
		}

		if (!formData.phone || !formData.phone.trim()) {
			toast.warning('연락처를 입력해주세요.');
			scrollToElement('phone');
			return;
		}

		if (!validatePhone(formData.phone)) {
			toast.error('올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)');
			scrollToElement('phone');
			return;
		}

		if (!formData.email || !formData.email.trim()) {
			toast.warning('이메일을 입력해주세요.');
			scrollToElement('email');
			return;
		}

		if (!validateEmail(formData.email)) {
			toast.error('올바른 이메일 형식이 아닙니다.');
			scrollToElement('email');
			return;
		}

		if (!formData.brand_names || !formData.brand_names.trim()) {
			toast.warning('브랜드명을 입력해주세요.');
			scrollToElement('brand_names');
			return;
		}

		if (!formData.referral_source || !formData.referral_source.trim()) {
			toast.warning('유입 경로를 선택해주세요.');
			// Select 컴포넌트의 트리거로 스크롤
			const referralTrigger = document.getElementById('referral_source')?.closest('[role="combobox"]');
			if (referralTrigger instanceof HTMLElement) {
				referralTrigger.scrollIntoView({ behavior: 'smooth', block: 'center' });
				(referralTrigger as HTMLElement).focus();
			}
			return;
		}

		if (formData.referral_source === '기타' && (!formData.referral_other || !formData.referral_other.trim())) {
			toast.warning('기타 유입 경로 내용을 입력해주세요.');
			const referralOtherInput = document.querySelector('input[name="referral_other"]');
			if (referralOtherInput instanceof HTMLElement) {
				referralOtherInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
				referralOtherInput.focus();
			}
			return;
		}

		if (!privacyAgreed) {
			toast.warning('개인정보 처리방침에 동의해주세요.');
			scrollToElement('privacy_agreed');
			return;
		}

		setIsSubmitting(true);

		try {
			const { error } = await supabase.from('contacts').insert([
				{
					...formData,
					marketing_agreed: marketingAgreed,
					status: 'new',
				},
			]);

			if (error) throw error;

			toast.success('문의가 성공적으로 제출되었습니다!\n빠른 시일 내에 연락드리겠습니다.');
			setFormData({
				inquiry_types: [],
				inquiry_content: '',
				name: '',
				phone: '',
				email: '',
				brand_names: '',
				referral_source: '',
				referral_other: '',
			});
			setPrivacyAgreed(false);
			setMarketingAgreed(false);
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error('문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mx-auto contact-form">
			<form noValidate onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
				{/* 문의 유형 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label id="inquiry_types" className="font-extrabold text-[#222222] label-title">
						문의 유형 <span className="text-[#ff6200]">*</span>
					</Label>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{INQUIRY_TYPES.map(type => (
							<div key={type} className="flex gap-2 items-center">
								<Checkbox id={type} checked={(formData.inquiry_types ?? []).includes(type)} onCheckedChange={(checked: boolean | 'indeterminate') => handleCheckboxChange(type, checked)} />
								<label htmlFor={type} className="text-[20px] font-medium text-[#666666] cursor-pointer">
									{type}
								</label>
							</div>
						))}
					</div>
				</div>

				{/* 문의 내용 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label htmlFor="inquiry_content" className="font-extrabold text-[#222222] label-title">
						문의 내용
					</Label>
					<Textarea
						id="inquiry_content"
						name="inquiry_content"
						value={formData.inquiry_content}
						onChange={handleChange}
						placeholder={`• 문의하시게 된 배경 및 상담받고 싶은 방향
• 캠페인 목표, 일정 등 구체적인 정보 기입 시 더욱 정확한 안내 가능(선택 사항)`}
						className="h-[200px] text-[20px] font-medium text-[#222222] placeholder:text-[#9b9b9b] border-[rgba(0,0,0,0.1)] rounded-[4px] resize-none"
					/>
				</div>

				{/* 담당자 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label className="font-extrabold text-[#222222] label-title">
						담당자 <span className="text-[#ff6200]">*</span>
					</Label>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col gap-[4px]">
							<Label htmlFor="name" className="text-[16px] font-extrabold text-[#666666]">
								성함
							</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								placeholder="이름을 입력해주세요"
								className="h-[54px] text-[20px] font-medium placeholder:text-[#9b9b9b] border-[rgba(0,0,0,0.1)] rounded-[4px]"
							/>
						</div>
						<div className="flex flex-col gap-[4px]">
							<Label htmlFor="phone" className="text-[16px] font-extrabold text-[#666666]">
								연락처
							</Label>
							<Input
								id="phone"
								name="phone"
								type="tel"
								maxLength={13}
								value={formData.phone}
								onChange={handleChange}
								required
								placeholder="전화번호를 입력해주세요"
								className="h-[54px] text-[20px] font-medium placeholder:text-[#9b9b9b] border-[rgba(0,0,0,0.1)] rounded-[4px]"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-[4px]">
						<Label htmlFor="email" className="text-[16px] font-extrabold text-[#666666]">
							E-mail
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
							placeholder="이메일을 입력해주세요"
							className="h-[54px] text-[20px] font-medium placeholder:text-[#9b9b9b] border-[rgba(0,0,0,0.1)] rounded-[4px]"
						/>
					</div>
				</div>

				{/* 브랜드명 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label htmlFor="brand_names" className="font-extrabold text-[#222222] label-title">
						브랜드명 <span className="text-[#ff6200]">*</span>
					</Label>
					<Input
						id="brand_names"
						name="brand_names"
						value={formData.brand_names}
						onChange={handleChange}
						required
						placeholder="복수 브랜드 시 쉼표로 구분"
						className="h-[54px] text-[20px] font-medium placeholder:text-[#9b9b9b] border-[rgba(0,0,0,0.1)] rounded-[4px]"
					/>
				</div>

				{/* 유입 경로 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label className="font-extrabold text-[#222222] label-title">
						유입 경로 <span className="text-[#ff6200]">*</span>
					</Label>
					<Select value={formData.referral_source ?? ''} onValueChange={(value: string) => handleSelectChange('referral_source', value)} required>
						<SelectTrigger id="referral_source" className="h-[54px] text-[20px] border-[rgba(0,0,0,0.1)] rounded-[4px]">
							<SelectValue placeholder="선택해주세요" />
						</SelectTrigger>
						<SelectContent>
							{REFERRAL_SOURCES.map(source => (
								<SelectItem key={source} value={source} className="text-[20px] py-3">
									{source}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{formData.referral_source === '기타' && (
						<Input
							name="referral_other"
							value={formData.referral_other ?? ''}
							onChange={handleChange}
							placeholder="기타 내용을 입력해주세요"
							className="h-[54px] text-[20px] font-medium placeholder:text-[#9b9b9b] border-[rgba(0,0,0,0.1)] rounded-[4px]"
						/>
					)}
				</div>
				<div className="space-y-4">
					{/* 개인정보 처리방침 동의 */}
					<div className="flex flex-col md:flex-row items-center gap-[8px]">
						<div className="flex items-center gap-[4px]">
							<Checkbox
								id="privacy_agreed"
								checked={privacyAgreed}
								onCheckedChange={(checked: boolean | 'indeterminate') => {
									if (checked === 'indeterminate') return;
									setPrivacyAgreed(checked);
								}}
							/>
							<label htmlFor="privacy_agreed" className="text-[20px] font-medium text-[#222222] cursor-pointer">
								[필수] 개인정보 수집 및 이용약관에 동의합니다.
							</label>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<button type="button" className="text-[20px] font-medium text-[#222222] underline underline-offset-2 hover:text-[#666666]">
									약관보기
								</button>
							</DialogTrigger>
							<DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto">
								<DialogHeader>
									<DialogTitle className="text-[24px] font-bold text-[#222222]">개인정보 처리방침</DialogTitle>
								</DialogHeader>
								<div className="text-[16px] leading-relaxed text-[#666666] space-y-4">
									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">제1조 (목적)</h3>
										<p>
											본 개인정보 처리방침은 CNX(이하 &apos;회사&apos;)가 제공하는 서비스 이용과 관련하여 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간,
											개인정보의 파기에 관한 사항을 정보주체에게 안내하는 것을 목적으로 합니다.
										</p>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">제2조 (수집하는 개인정보 항목)</h3>
										<p>회사는 문의 접수 및 상담을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
										<ul className="pl-4 mt-2 space-y-1 list-disc">
											<li>필수항목: 성함, 연락처, 이메일, 브랜드명</li>
											<li>
												선택항목: 문의 내용, 브랜드 현황, 유입 경로
												<br />
												선택항목은 문의 상담을 위한 참고 용도로만 사용되며, 입력하지 않아도 서비스 이용에는 제한이 없습니다.
											</li>
										</ul>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">제3조 (개인정보의 수집 및 이용목적)</h3>
										<p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
										<ul className="pl-4 mt-2 space-y-1 list-disc">
											<li>서비스 문의 접수 및 상담</li>
											<li>고객 요청사항 처리 및 응대</li>
											<li>홍보·이벤트 정보 제공 등 마케팅 목적의 활용은 별도 동의를 받습니다.</li>
										</ul>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">제4조 (개인정보의 보유 및 이용기간)</h3>
										<p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령에 의해 보존할 필요가 있는 경우 일정기간 보존 후 파기합니다.</p>
										<ul className="pl-4 mt-2 space-y-1 list-disc">
											<li>보존 기간: 3년</li>
											<li>보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률</li>
											<li>파기 절차: 목적 달성 후 즉시 파기</li>
											<li>파기 방법: 전자파일(영구삭제), 문서(파쇄)</li>
										</ul>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">제5조 (개인정보의 제3자 제공 여부)</h3>
										<p>회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">제6조 (정보주체의 권리)</h3>
										<p>정보주체는 다음과 같은 권리를 행사할 수 있습니다.</p>
										<ul className="pl-4 mt-2 space-y-1 list-disc">
											<li>개인정보 열람 요구</li>
											<li>개인정보 정정 요구</li>
											<li>개인정보 삭제 요구</li>
											<li>개인정보 처리 정지 요구</li>
										</ul>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">제7조 (개인정보 보호책임자)</h3>
										<p>
											회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고
											있습니다.
										</p>
										<div className="pl-4 mt-2">
											<p>- 개인정보보호책임자: 김ㅇㅇ (운영팀)</p>
											<p>- 문의처: biz@bnb-cnx.com</p>
											<p>- 전화번호: 070-4715-8801</p>
										</div>
									</section>

									<section className="text-[14px] text-[#999999]">
										<p>본 방침은 2024년 1월 1일부터 시행됩니다.</p>
									</section>
								</div>
							</DialogContent>
						</Dialog>
					</div>

					{/* 마케팅 정보 수신 동의 */}
					<div className="flex flex-col md:flex-row items-center gap-[8px]">
						<div className="flex items-center gap-[4px]">
							<Checkbox
								id="marketing_agreed"
								checked={marketingAgreed}
								onCheckedChange={(checked: boolean | 'indeterminate') => {
									if (checked === 'indeterminate') return;
									setMarketingAgreed(checked);
								}}
							/>
							<label htmlFor="marketing_agreed" className="text-[20px] font-medium text-[#222222] cursor-pointer">
								[선택] 마케팅 정보 수신에 동의합니다.
							</label>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<button type="button" className="text-[20px] font-medium text-[#222222] underline underline-offset-2 hover:text-[#666666]">
									약관보기
								</button>
							</DialogTrigger>
							<DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto">
								<DialogHeader>
									<DialogTitle className="text-[24px] font-bold text-[#222222]">마케팅 정보 수신 동의</DialogTitle>
								</DialogHeader>
								<div className="text-[16px] leading-relaxed text-[#666666] space-y-4">
									<section>
										<p>CNX는 정보통신망 이용촉진 및 정보보호 등에 관한 법률에 따라 고객님께 다양한 혜택과 정보를 제공하기 위해 아래와 같이 마케팅 정보를 전송합니다.</p>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">1. 수집 및 이용 목적</h3>
										<p>새로운 서비스(제품) 안내, 이벤트 및 광고성 정보 제공</p>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">2. 수집 항목</h3>
										<p>성함, 연락처, 이메일</p>
									</section>

									<section>
										<h3 className="text-[18px] font-bold text-[#222222] mb-2">3. 보유 및 이용 기간</h3>
										<p>동의 철회 시</p>
									</section>

									<section>
										<p className="text-[#ff6200]">※ 귀하는 동의를 거부할 권리가 있으나, 거부 시 이벤트 안내 등 혜택 정보를 받으실 수 없습니다.</p>
									</section>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>
				{/* 제출 버튼 */}
				<div className="flex justify-center items-center mb-16">
					<Button type="submit" disabled={isSubmitting} className="h-auto btn-primary">
						{isSubmitting ? '제출 중...' : '제출하기'}
					</Button>
				</div>
			</form>
		</div>
	);
}

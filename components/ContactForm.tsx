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

const INQUIRY_TYPES = ['중국 SNS 체험단 문의', '중국 SNS 채널 운영대행 문의', 'LIVE 커머스 진행 문의', '글로벌 PPL / 협찬 마케팅 문의', 'CNX 한국 브랜드 셀렉샵 입점 문의', '협업 / 기타 문의 사항'];

const BRAND_LAUNCH_STATUS = ['준비중', '출시완료'];

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const REFERRAL_SOURCES = ['지인 추천', '샤오홍슈', '유튜브', '인스타그램', '네이버검색', '구글 검색', '기타'];

export default function ContactForm() {
	const [formData, setFormData] = useState<ContactFormData>({
		inquiry_types: [],
		inquiry_content: '',
		name: '',
		phone: '',
		email: '',
		brand_names: '',
		brand_launch_status: '',
		brand_launch_month: '',
		showroom_operation: null,
		referral_source: '',
		referral_other: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [privacyAgreed, setPrivacyAgreed] = useState(false);

	const handleCheckboxChange = (value: string, checked: boolean | 'indeterminate') => {
		if (checked === 'indeterminate') return;
		setFormData(prev => ({
			...prev,
			inquiry_types: checked ? [...(prev.inquiry_types ?? []), value] : (prev.inquiry_types ?? []).filter(type => type !== value),
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	// 이메일 유효성 검사
	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
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
			// 첫 번째 체크박스로 스크롤
			const firstCheckbox = document.querySelector('input[type="checkbox"]');
			if (firstCheckbox instanceof HTMLElement) {
				firstCheckbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
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
			const referralSelect = document.querySelector('[name="referral_source"]')?.closest('[role="combobox"]');
			if (referralSelect instanceof HTMLElement) {
				referralSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
				referralSelect.focus();
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
				brand_launch_status: '',
				brand_launch_month: '',
				showroom_operation: null,
				referral_source: '',
				referral_other: '',
			});
			setPrivacyAgreed(false);
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error('문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mx-auto contact-form">
			<form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
				{/* 문의 유형 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label className="font-extrabold text-[#222222] label-title">
						문의 유형 <span className="text-[#ff6200]">*</span>
					</Label>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{INQUIRY_TYPES.map(type => (
							<div key={type} className="flex items-center gap-[4px]">
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
								maxLength={11}
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

				{/* 브랜드 현황 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label className="font-extrabold text-[#222222] label-title">브랜드 현황</Label>
					<div className="flex flex-col gap-[4px]">
						<Label htmlFor="brand_launch_status" className="text-[16px] font-extrabold text-[#666666]">
							브랜드 출시 여부
						</Label>
						<Select value={formData.brand_launch_status ?? ''} onValueChange={(value: string) => handleSelectChange('brand_launch_status', value)}>
							<SelectTrigger className="h-[54px] text-[20px] border-[rgba(0,0,0,0.1)] rounded-[4px]">
								<SelectValue placeholder="선택해주세요" />
							</SelectTrigger>
							<SelectContent>
								{BRAND_LAUNCH_STATUS.map(status => (
									<SelectItem key={status} value={status} className="text-[20px] py-3">
										{status}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* 준비중 선택 시 출시 예정월 */}
					{formData.brand_launch_status === '준비중' && (
						<div className="flex flex-col gap-[4px]">
							<Label htmlFor="brand_launch_month" className="text-[16px] font-extrabold text-[#666666]">
								출시 예정월
							</Label>
							<Select value={formData.brand_launch_month ?? ''} onValueChange={(value: string) => handleSelectChange('brand_launch_month', value)}>
								<SelectTrigger className="h-[54px] text-[20px] border-[rgba(0,0,0,0.1)] rounded-[4px]">
									<SelectValue placeholder="월을 선택해주세요" />
								</SelectTrigger>
								<SelectContent>
									{MONTHS.map(month => (
										<SelectItem key={month} value={month} className="text-[20px] py-3">
											{month} 출시 예정
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}

					{/* 출시완료 선택 시 쇼룸 및 매장 운영 여부 */}
					{formData.brand_launch_status === '출시완료' && (
						<div className="flex items-center gap-[8px]">
							<Checkbox
								id="showroom_operation"
								checked={formData.showroom_operation ?? false}
								onCheckedChange={(checked: boolean | 'indeterminate') => {
									if (checked === 'indeterminate') return;
									setFormData(prev => ({ ...prev, showroom_operation: checked }));
								}}
							/>
							<label htmlFor="showroom_operation" className="text-[20px] font-medium text-[#666666] cursor-pointer">
								쇼룸 및 매장 운영 중
							</label>
						</div>
					)}
				</div>

				{/* 유입 경로 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label className="font-extrabold text-[#222222] label-title">
						유입 경로 <span className="text-[#ff6200]">*</span>
					</Label>
					<Select value={formData.referral_source ?? ''} onValueChange={(value: string) => handleSelectChange('referral_source', value)} required>
						<SelectTrigger className="h-[54px] text-[20px] border-[rgba(0,0,0,0.1)] rounded-[4px]">
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
							개인정보 수집 및 이용약관에 동의합니다.
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
									<ul className="list-disc list-inside mt-2 space-y-1">
										<li>필수항목: 성함, 연락처, 이메일, 브랜드명</li>
										<li>선택항목: 문의 내용, 브랜드 현황, 유입 경로</li>
									</ul>
								</section>

								<section>
									<h3 className="text-[18px] font-bold text-[#222222] mb-2">제3조 (개인정보의 수집 및 이용목적)</h3>
									<p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
									<ul className="list-disc list-inside mt-2 space-y-1">
										<li>서비스 문의 접수 및 상담</li>
										<li>고객 요청사항 처리 및 응대</li>
										<li>마케팅 및 광고 활용 (동의 시)</li>
									</ul>
								</section>

								<section>
									<h3 className="text-[18px] font-bold text-[#222222] mb-2">제4조 (개인정보의 보유 및 이용기간)</h3>
									<p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령에 의해 보존할 필요가 있는 경우 일정기간 보존 후 파기합니다.</p>
									<ul className="list-disc list-inside mt-2 space-y-1">
										<li>보존 기간: 3년</li>
										<li>보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률</li>
									</ul>
								</section>

								<section>
									<h3 className="text-[18px] font-bold text-[#222222] mb-2">제5조 (정보주체의 권리)</h3>
									<p>정보주체는 다음과 같은 권리를 행사할 수 있습니다.</p>
									<ul className="list-disc list-inside mt-2 space-y-1">
										<li>개인정보 열람 요구</li>
										<li>개인정보 정정 요구</li>
										<li>개인정보 삭제 요구</li>
										<li>개인정보 처리 정지 요구</li>
									</ul>
								</section>

								<section>
									<h3 className="text-[18px] font-bold text-[#222222] mb-2">제6조 (개인정보 보호책임자)</h3>
									<p>
										회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고
										있습니다.
									</p>
									<div className="mt-2 pl-4">
										<p>- 문의처: contact@cnx.com</p>
										<p>- 전화번호: 02-1234-5678</p>
									</div>
								</section>

								<section className="text-[14px] text-[#999999]">
									<p>본 방침은 2024년 1월 1일부터 시행됩니다.</p>
								</section>
							</div>
						</DialogContent>
					</Dialog>
				</div>

				{/* 제출 버튼 */}
				<div className="flex items-center justify-center mb-16">
					<Button type="submit" disabled={isSubmitting} className="btn-primary h-auto">
						{isSubmitting ? '제출 중...' : '제출하기'}
					</Button>
				</div>
			</form>
		</div>
	);
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase, ContactFormData } from '@/lib/supabase';

const INQUIRY_TYPES = ['중국 SNS 체험단 문의', '중국 SNS 채널 운영대행 문의', 'LIVE 커머스 진행 문의', '글로벌 PPL / 협찬 마케팅 문의', 'CNX 한국 브랜드 셀렉샵 입점 문의', '협업 / 기타 문의 사항'];

const BRAND_LAUNCH_STATUS = ['선택해주세요', '준비중', '출시완료'];

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const REFERRAL_SOURCES = ['선택해주세요', '지인 추천', '샤오홍슈', '유튜브', '인스타그램', '네이버검색', '구글 검색', '기타'];

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
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');

		try {
			const { error } = await supabase.from('contacts').insert([
				{
					...formData,
					status: 'new',
				},
			]);

			if (error) throw error;

			setSubmitStatus('success');
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
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white rounded-[60px] px-[60px] pt-px pb-[60px] max-w-[1000px] mx-auto">
			<form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">
				{/* 문의 유형 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label className="text-[24px] font-extrabold text-[#222222]">
						문의 유형 <span className="text-[#ff6200]">*</span>
					</Label>
					<div className="grid grid-cols-2 gap-[16px]">
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
					<Label htmlFor="inquiry_content" className="text-[24px] font-extrabold text-[#222222]">
						문의 내용
					</Label>
					<Textarea
						id="inquiry_content"
						name="inquiry_content"
						value={formData.inquiry_content}
						onChange={handleChange}
						placeholder="•	문의하시게 된 배경 및 상담받고 싶은 방향&#10;•	캠페인 목표, 일정 등 구체적인 정보 기입 시 더욱 정확한 안내 가능(선택 사항)"
						className="h-[200px] text-[20px] font-medium text-[#222222] placeholder:text-[#9b9b9b] border-[rgba(0,0,0,0.1)] rounded-[4px] resize-none"
					/>
				</div>

				{/* 담당자 */}
				<div className="flex flex-col gap-[20px] border-b border-[rgba(0,0,0,0.1)] pb-[40px]">
					<Label className="text-[24px] font-extrabold text-[#222222]">
						담당자 <span className="text-[#ff6200]">*</span>
					</Label>
					<div className="grid grid-cols-2 gap-[20px]">
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
					<Label htmlFor="brand_names" className="text-[24px] font-extrabold text-[#222222]">
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
					<Label className="text-[24px] font-extrabold text-[#222222]">브랜드 현황</Label>
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
					<Label className="text-[24px] font-extrabold text-[#222222]">
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

				{/* 제출 상태 메시지 */}
				{submitStatus === 'success' && <div className="p-4 bg-green-50 text-green-800 rounded-md text-center">문의가 성공적으로 제출되었습니다! 빠른 시일 내에 연락드리겠습니다.</div>}

				{submitStatus === 'error' && <div className="p-4 bg-red-50 text-red-800 rounded-md text-center">문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.</div>}

				{/* 제출 버튼 */}
				<div className="flex items-center justify-center">
					<Button type="submit" disabled={isSubmitting} className="bg-[#222222] text-[#baff00] text-[28px] font-extrabold px-[40px] py-[20px] rounded-[100px] h-auto uppercase hover:bg-[#333333]">
						{isSubmitting ? '제출 중...' : '제출하기'}
					</Button>
				</div>
			</form>
		</div>
	);
}

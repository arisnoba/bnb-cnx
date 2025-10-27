'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Contact, supabase } from '@/lib/supabase';

const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
	switch (status) {
		case 'new':
			return 'destructive';
		case 'read':
			return 'secondary';
		case 'replied':
			return 'default';
		default:
			return 'outline';
	}
};

const getStatusLabel = (status: string): string => {
	switch (status) {
		case 'new':
			return '신규';
		case 'read':
			return '읽음';
		case 'replied':
			return '답변완료';
		default:
			return status;
	}
};

const statusOptions: Array<{ value: Contact['status'] | 'all'; label: string }> = [
	{ value: 'all', label: '전체' },
	{ value: 'new', label: '신규' },
	{ value: 'read', label: '읽음' },
	{ value: 'replied', label: '답변완료' },
];

export default function AdminContactsPage() {
	const router = useRouter();
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [statusFilter, setStatusFilter] = useState<'all' | Contact['status']>('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [updatingId, setUpdatingId] = useState<string | null>(null);
	const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

	const fetchContacts = useCallback(async () => {
		setIsLoading(true);
		try {
			const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });

			if (error) throw error;
			setContacts(data || []);
		} catch (error) {
			console.error('문의 데이터를 불러오는데 실패했습니다:', error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const updateStatus = useCallback(
		async (id: string, newStatus: Contact['status']) => {
			setUpdatingId(id);
			try {
				const { error } = await supabase.from('contacts').update({ status: newStatus }).eq('id', id);

				if (error) throw error;
				await fetchContacts();
			} catch (error) {
				console.error('문의 상태를 업데이트하는데 실패했습니다:', error);
			} finally {
				setUpdatingId(null);
			}
		},
		[fetchContacts]
	);

	useEffect(() => {
		let active = true;

		const ensureSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!active) return;

			if (!session) {
				router.replace('/admin/login');
				return;
			}

			setIsCheckingAuth(false);
			fetchContacts();
		};

		ensureSession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (!session) {
				router.replace('/admin/login');
			}
		});

		return () => {
			active = false;
			subscription.unsubscribe();
		};
	}, [fetchContacts, router]);

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('로그아웃 중 오류가 발생했습니다:', error);
		}

		setContacts([]);
		router.replace('/admin/login');
	};

	const filteredContacts = useMemo(() => {
		const normalizedQuery = searchTerm.trim().toLowerCase();

		return contacts.filter(contact => {
			const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;

			if (!normalizedQuery) {
				return matchesStatus;
			}

			const haystack = [contact.name, contact.email, contact.phone, contact.brand_names, contact.inquiry_content, contact.referral_source, contact.referral_other, ...(contact.inquiry_types ?? [])]
				.filter(Boolean)
				.join(' ')
				.toLowerCase();

			return matchesStatus && haystack.includes(normalizedQuery);
		});
	}, [contacts, searchTerm, statusFilter]);

	const stats = useMemo(() => {
		return {
			total: contacts.length,
			new: contacts.filter(c => c.status === 'new').length,
			read: contacts.filter(c => c.status === 'read').length,
			replied: contacts.filter(c => c.status === 'replied').length,
		};
	}, [contacts]);

	if (isCheckingAuth) {
		return (
			<div className="container flex min-h-screen items-center justify-center py-12">
				<p className="text-muted-foreground">접근 권한을 확인하는 중입니다…</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="container py-8 max-w-7xl">
				{/* 헤더 */}
				<div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">문의 관리</h1>
						<p className="text-slate-600 mt-1">접수된 문의를 효율적으로 관리하세요</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" onClick={fetchContacts} disabled={isLoading} className="shadow-sm">
							{isLoading ? '새로고침 중…' : '새로고침'}
						</Button>
						<Button variant="outline" onClick={handleLogout} className="shadow-sm">
							로그아웃
						</Button>
					</div>
				</div>

				{/* 통계 대시보드 */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
					<Card className="shadow-sm border-l-4 border-l-slate-500">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-slate-600">전체 문의</p>
									<p className="text-3xl font-bold text-slate-900 mt-2">{stats.total}</p>
								</div>
								<div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
									<span className="text-2xl">📊</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="shadow-sm border-l-4 border-l-red-500">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-slate-600">신규</p>
									<p className="text-3xl font-bold text-red-600 mt-2">{stats.new}</p>
								</div>
								<div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center">
									<span className="text-2xl">🔔</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="shadow-sm border-l-4 border-l-yellow-500">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-slate-600">확인중</p>
									<p className="text-3xl font-bold text-yellow-600 mt-2">{stats.read}</p>
								</div>
								<div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">
									<span className="text-2xl">👀</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="shadow-sm border-l-4 border-l-green-500">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm font-medium text-slate-600">답변완료</p>
									<p className="text-3xl font-bold text-green-600 mt-2">{stats.replied}</p>
								</div>
								<div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
									<span className="text-2xl">✅</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* 필터 및 검색 */}
				<Card className="mb-6 shadow-sm">
					<CardContent className="p-6">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-end flex-1">
								<div className="flex-1 min-w-[200px]">
									<Label htmlFor="status-filter" className="text-sm font-medium mb-2 block">
										상태 필터
									</Label>
									<Select value={statusFilter} onValueChange={value => setStatusFilter(value as typeof statusFilter)}>
										<SelectTrigger id="status-filter" className="w-full">
											<SelectValue placeholder="상태를 선택하세요" />
										</SelectTrigger>
										<SelectContent>
											{statusOptions.map(option => (
												<SelectItem key={option.value} value={option.value}>
													{option.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="flex-1 min-w-[300px]">
									<Label htmlFor="contact-search" className="text-sm font-medium mb-2 block">
										검색
									</Label>
									<Input
										id="contact-search"
										value={searchTerm}
										onChange={event => setSearchTerm(event.target.value)}
										placeholder="🔍 이름, 이메일, 브랜드, 내용 등으로 검색"
										className="w-full"
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* 문의 목록 - 카드 기반 */}
				<div className="text-slate-600 font-medium mb-2">
					{filteredContacts.length !== contacts.length && <span className="text-blue-600">{filteredContacts.length}건 표시 / </span>}
					<span>총 {contacts.length}건</span>
				</div>
				{isLoading ? (
					<div className="py-16 text-center">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4"></div>
						<p className="text-slate-600">문의 데이터를 불러오는 중입니다…</p>
					</div>
				) : contacts.length === 0 ? (
					<Card className="shadow-sm">
						<CardContent className="py-16 text-center">
							<div className="text-6xl mb-4">📭</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-2">등록된 문의가 없습니다</h3>
							<p className="text-slate-600">새로운 문의가 접수되면 여기에 표시됩니다.</p>
						</CardContent>
					</Card>
				) : filteredContacts.length === 0 ? (
					<Card className="shadow-sm">
						<CardContent className="py-16 text-center">
							<div className="text-6xl mb-4">🔍</div>
							<h3 className="text-xl font-semibold text-slate-900 mb-2">검색 결과가 없습니다</h3>
							<p className="text-slate-600">다른 키워드로 검색하거나 필터를 변경해보세요.</p>
						</CardContent>
					</Card>
				) : (
					<div className="grid grid-cols-1 gap-4">
						{filteredContacts.map(contact => (
							<Card
								key={contact.id}
								className="shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4"
								style={{
									borderLeftColor: contact.status === 'new' ? '#ef4444' : contact.status === 'read' ? '#eab308' : '#22c55e',
								}}>
								<CardContent className="p-6">
									<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
										{/* 왼쪽: 기본 정보 */}
										<div className="flex-1 space-y-3">
											<div className="flex items-start justify-between gap-2">
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-2">
														<h3 className="text-lg font-bold text-slate-900">{contact.name}</h3>
														<Badge variant={getStatusVariant(contact.status)} className="text-xs">
															{getStatusLabel(contact.status)}
														</Badge>
													</div>
													<div className="flex flex-wrap gap-2 text-sm text-slate-600">
														<span className="flex items-center gap-1">📧 {contact.email}</span>
														<span className="flex items-center gap-1">📱 {contact.phone}</span>
													</div>
												</div>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
												<div>
													<span className="font-semibold text-slate-700">브랜드:</span>
													<span className="ml-2 text-slate-600">{contact.brand_names}</span>
												</div>
												{contact.brand_launch_status && (
													<div>
														<span className="font-semibold text-slate-700">출시 여부:</span>
														<span className="ml-2 text-slate-600">{contact.brand_launch_status}</span>
														{contact.brand_launch_month && <span className="text-slate-500"> ({contact.brand_launch_month})</span>}
													</div>
												)}
												<div>
													<span className="font-semibold text-slate-700">유입 경로:</span>
													<span className="ml-2 text-slate-600">
														{contact.referral_source}
														{contact.referral_other && ` (${contact.referral_other})`}
													</span>
												</div>
												<div>
													<span className="font-semibold text-slate-700">문의 일시:</span>
													<span className="ml-2 text-slate-600">{contact.created_at ? new Date(contact.created_at).toLocaleString('ko-KR') : '-'}</span>
												</div>
											</div>

											{contact.inquiry_types && contact.inquiry_types.length > 0 && (
												<div>
													<span className="font-semibold text-slate-700 text-sm block mb-2">문의 유형:</span>
													<div className="flex flex-wrap gap-2">
														{contact.inquiry_types.map((type, index) => (
															<Badge key={`${contact.id}-type-${index}`} variant="outline" className="text-xs">
																{type}
															</Badge>
														))}
													</div>
												</div>
											)}

											{contact.inquiry_content && (
												<div>
													<span className="font-semibold text-slate-700 text-sm block mb-1">문의 내용:</span>
													<p className="text-sm text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded-lg">{contact.inquiry_content}</p>
												</div>
											)}
										</div>

										{/* 오른쪽: 액션 */}
										<div className="flex lg:flex-col gap-2 lg:min-w-[160px]">
											<Select value={contact.status} onValueChange={value => updateStatus(contact.id!, value as Contact['status'])} disabled={updatingId === contact.id}>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="상태 변경" />
												</SelectTrigger>
												<SelectContent>
													{statusOptions
														.filter(option => option.value !== 'all')
														.map(option => (
															<SelectItem key={option.value} value={option.value as Contact['status']}>
																{option.label}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
											<Button variant="outline" size="sm" onClick={() => setSelectedContact(contact)} className="w-full">
												상세보기
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}

				{/* 상세보기 모달 */}
				{selectedContact && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedContact(null)}>
						<Card className="max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
							<CardHeader className="border-b bg-slate-50">
								<div className="flex items-start justify-between">
									<div>
										<CardTitle className="text-2xl">{selectedContact.name} 님의 문의</CardTitle>
										<CardDescription className="mt-1">{selectedContact.created_at ? new Date(selectedContact.created_at).toLocaleString('ko-KR') : '-'}</CardDescription>
									</div>
									<Button variant="ghost" size="sm" onClick={() => setSelectedContact(null)} className="text-slate-500 hover:text-slate-900">
										✕
									</Button>
								</div>
							</CardHeader>
							<CardContent className="p-6 space-y-6">
								<div className="flex items-center gap-2">
									<Badge variant={getStatusVariant(selectedContact.status)} className="text-sm">
										{getStatusLabel(selectedContact.status)}
									</Badge>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-1">
										<Label className="text-sm font-semibold text-slate-700">이메일</Label>
										<p className="text-sm text-slate-900">{selectedContact.email}</p>
									</div>
									<div className="space-y-1">
										<Label className="text-sm font-semibold text-slate-700">연락처</Label>
										<p className="text-sm text-slate-900">{selectedContact.phone}</p>
									</div>
									<div className="space-y-1">
										<Label className="text-sm font-semibold text-slate-700">브랜드명</Label>
										<p className="text-sm text-slate-900">{selectedContact.brand_names}</p>
									</div>
									{selectedContact.brand_launch_status && (
										<div className="space-y-1">
											<Label className="text-sm font-semibold text-slate-700">브랜드 출시 여부</Label>
											<p className="text-sm text-slate-900">
												{selectedContact.brand_launch_status}
												{selectedContact.brand_launch_month && ` (${selectedContact.brand_launch_month})`}
											</p>
										</div>
									)}
									<div className="space-y-1">
										<Label className="text-sm font-semibold text-slate-700">유입 경로</Label>
										<p className="text-sm text-slate-900">
											{selectedContact.referral_source}
											{selectedContact.referral_other && ` (${selectedContact.referral_other})`}
										</p>
									</div>
								</div>

								{selectedContact.inquiry_types && selectedContact.inquiry_types.length > 0 && (
									<div className="space-y-2">
										<Label className="text-sm font-semibold text-slate-700">문의 유형</Label>
										<div className="flex flex-wrap gap-2">
											{selectedContact.inquiry_types.map((type, index) => (
												<Badge key={`modal-${selectedContact.id}-${index}`} variant="secondary">
													{type}
												</Badge>
											))}
										</div>
									</div>
								)}

								{selectedContact.inquiry_content && (
									<div className="space-y-2">
										<Label className="text-sm font-semibold text-slate-700">문의 내용</Label>
										<div className="bg-slate-50 p-4 rounded-lg">
											<p className="text-sm text-slate-900 whitespace-pre-wrap">{selectedContact.inquiry_content}</p>
										</div>
									</div>
								)}

								<div className="pt-4 border-t flex gap-2">
									<Select
										value={selectedContact.status}
										onValueChange={value => {
											updateStatus(selectedContact.id!, value as Contact['status']);
											setSelectedContact(null);
										}}
										disabled={updatingId === selectedContact.id}>
										<SelectTrigger className="flex-1">
											<SelectValue placeholder="상태 변경" />
										</SelectTrigger>
										<SelectContent>
											{statusOptions
												.filter(option => option.value !== 'all')
												.map(option => (
													<SelectItem key={option.value} value={option.value as Contact['status']}>
														{option.label}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
									<Button variant="outline" onClick={() => setSelectedContact(null)}>
										닫기
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</div>
		</div>
	);
}

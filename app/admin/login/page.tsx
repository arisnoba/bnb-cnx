'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';

// Supabase 에러 메시지 한글 번역
const translateAuthError = (errorMessage: string): string => {
	const errorMap: Record<string, string> = {
		'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
		'Email not confirmed': '이메일 인증이 완료되지 않았습니다.',
		'User not found': '존재하지 않는 사용자입니다.',
		'Invalid email': '유효하지 않은 이메일 주소입니다.',
		'Password should be at least 6 characters': '비밀번호는 최소 6자 이상이어야 합니다.',
		'Email already registered': '이미 등록된 이메일입니다.',
		'Unable to validate email address': '이메일 주소를 확인할 수 없습니다.',
		'Signups not allowed for this instance': '회원가입이 허용되지 않습니다.',
		'Email rate limit exceeded': '이메일 전송 횟수가 초과되었습니다. 잠시 후 다시 시도해주세요.',
		'Invalid email or password': '이메일 또는 비밀번호가 올바르지 않습니다.',
	};

	// 정확히 일치하는 메시지가 있으면 반환
	if (errorMap[errorMessage]) {
		return errorMap[errorMessage];
	}

	// 부분 일치 검사
	for (const [key, value] of Object.entries(errorMap)) {
		if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
			return value;
		}
	}

	// 매핑되지 않은 에러는 기본 메시지 반환
	return '로그인에 실패했습니다. 다시 시도해주세요.';
};

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		let isMounted = true;

		const verifySession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!isMounted) return;
			if (session) {
				router.replace('/admin/contacts');
			}
		};

		verifySession();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (session) {
				router.replace('/admin/contacts');
			}
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, [router]);

	const handleLogin = async () => {
		if (!email || !password) {
			setError('이메일과 비밀번호를 입력해주세요.');
			return;
		}

		setIsSubmitting(true);
		const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

		if (authError) {
			setError(translateAuthError(authError.message));
			setIsSubmitting(false);
			return;
		}

		setError('');
		setIsSubmitting(false);
		router.replace('/admin/contacts');
	};

	return (
		<div className="container flex min-h-screen items-center justify-center py-12">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>관리자 로그인</CardTitle>
					<CardDescription>등록된 관리자 계정으로 로그인하세요.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">이메일</Label>
							<Input
								id="email"
								type="email"
								value={email}
								autoComplete="email"
								onChange={event => setEmail(event.target.value)}
								onKeyDown={event => {
									if (event.key === 'Enter') {
										event.preventDefault();
										handleLogin();
									}
								}}
								placeholder="admin@example.com"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">비밀번호</Label>
							<Input
								id="password"
								type="password"
								value={password}
								autoComplete="current-password"
								onChange={event => setPassword(event.target.value)}
								onKeyDown={event => {
									if (event.key === 'Enter') {
										event.preventDefault();
										handleLogin();
									}
								}}
								placeholder="비밀번호를 입력하세요"
							/>
						</div>
						{error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">{error}</div>}
						<Button onClick={handleLogin} className="w-full" disabled={isSubmitting}>
							{isSubmitting ? '로그인 중…' : '로그인'}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

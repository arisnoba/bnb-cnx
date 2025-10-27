import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
	throw new Error('Supabase URL 환경 변수가 설정되지 않았습니다. NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_URL을 확인하세요.');
}

if (!supabaseAnonKey) {
	throw new Error('Supabase Anon Key 환경 변수가 설정되지 않았습니다. NEXT_PUBLIC_SUPABASE_ANON_KEY 또는 SUPABASE_ANON_KEY을 확인하세요.');
}

// Supabase 생성 타입
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			contacts: {
				Row: {
					brand_launch_month: string | null;
					brand_launch_status: string | null;
					brand_names: string;
					created_at: string;
					email: string;
					id: string;
					inquiry_content: string;
					inquiry_types: string[];
					name: string;
					phone: string;
					referral_other: string | null;
					referral_source: string;
					showroom_operation: boolean | null;
					status: string;
					updated_at: string;
				};
				Insert: {
					brand_launch_month?: string | null;
					brand_launch_status?: string | null;
					brand_names: string;
					created_at?: string;
					email: string;
					id?: string;
					inquiry_content?: string;
					inquiry_types?: string[];
					name: string;
					phone: string;
					referral_other?: string | null;
					referral_source: string;
					showroom_operation?: boolean | null;
					status?: string;
					updated_at?: string;
				};
				Update: {
					brand_launch_month?: string | null;
					brand_launch_status?: string | null;
					brand_names?: string;
					created_at?: string;
					email?: string;
					id?: string;
					inquiry_content?: string;
					inquiry_types?: string[];
					name?: string;
					phone?: string;
					referral_other?: string | null;
					referral_source?: string;
					showroom_operation?: boolean | null;
					status?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Contact 타입 정의 (Supabase Row 타입 사용)
export type Contact = Database['public']['Tables']['contacts']['Row'];

// Contact 폼 데이터 타입 (Supabase Insert 타입 사용)
export type ContactFormData = Omit<Database['public']['Tables']['contacts']['Insert'], 'status' | 'created_at' | 'updated_at'>;

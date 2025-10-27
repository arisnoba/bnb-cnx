import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

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

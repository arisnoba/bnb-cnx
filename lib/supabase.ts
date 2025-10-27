import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Contact 타입 정의
export interface Contact {
  id?: string
  inquiry_types: string[] // 문의 유형 (체크박스 다중 선택)
  inquiry_content: string // 문의 내용
  name: string // 성함
  phone: string // 연락처
  email: string // 이메일
  brand_names: string // 브랜드명
  brand_launch_status?: string // 브랜드 출시 여부
  brand_launch_month?: string // 브랜드 출시 월
  referral_source: string // 유입 경로
  referral_other?: string // 유입 경로 기타
  status: 'new' | 'read' | 'replied'
  created_at?: string
}

// Contact 폼 데이터 타입
export interface ContactFormData {
  inquiry_types: string[]
  inquiry_content: string
  name: string
  phone: string
  email: string
  brand_names: string
  brand_launch_status?: string
  brand_launch_month?: string
  referral_source: string
  referral_other?: string
}

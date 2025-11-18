# Supabase 설정 가이드

## 프로젝트 정보

-  **프로젝트 ID**: `msbfcyrygirjdlliajhk`
-  **프로젝트 이름**: `bnb-cnx`
-  **리전**: `ap-northeast-2` (서울)
-  **상태**: `ACTIVE_HEALTHY`

## 데이터베이스 구조

### Contacts 테이블

이미 생성되어 있는 `contacts` 테이블 스키마:

| 컬럼명              | 타입        | 설명                      | 필수 |
| ------------------- | ----------- | ------------------------- | ---- |
| id                  | UUID        | 고유 식별자 (자동 생성)   | ✓    |
| inquiry_types       | TEXT[]      | 문의 유형 (배열)          | ✓    |
| inquiry_content     | TEXT        | 문의 내용                 | -    |
| name                | TEXT        | 성함                      | ✓    |
| phone               | TEXT        | 연락처                    | ✓    |
| email               | TEXT        | 이메일                    | ✓    |
| brand_names         | TEXT        | 브랜드명                  | ✓    |
| brand_launch_status | TEXT        | 브랜드 출시 여부          | -    |
| brand_launch_month  | TEXT        | 브랜드 출시 월            | -    |
| referral_source     | TEXT        | 유입 경로                 | ✓    |
| referral_other      | TEXT        | 유입 경로 기타            | -    |
| status              | TEXT        | 상태 (new/read/replied)   | ✓    |
| created_at          | TIMESTAMPTZ | 생성 일시                 | ✓    |
| updated_at          | TIMESTAMPTZ | 수정 일시 (자동 업데이트) | ✓    |

## RLS (Row Level Security) 정책 설정

### Supabase SQL Editor에서 실행할 스크립트

아래 코드 블록 전체를 그대로 복사해 SQL Editor에 붙여 넣은 뒤 실행하세요. (`sql` 과 ````` 끝나는 줄 사이의 모든 내용을 선택하면 됩니다.)

```sql
-- 1. RLS 활성화
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- 2. 익명/인증 사용자 모두 contact 폼을 제출할 수 있도록 허용 (INSERT)
DROP POLICY IF EXISTS "공개 폼 제출 허용" ON public.contacts;
CREATE POLICY "공개 폼 제출 허용"
ON public.contacts
FOR INSERT
TO public
WITH CHECK (true);

-- 3. 인증된 사용자만 모든 contact 데이터를 조회할 수 있음 (SELECT)
DROP POLICY IF EXISTS "관리자 조회 허용" ON public.contacts;
CREATE POLICY "관리자 조회 허용"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

-- 4. 인증된 사용자만 contact 상태를 업데이트할 수 있음 (UPDATE)
DROP POLICY IF EXISTS "관리자 수정 허용" ON public.contacts;
CREATE POLICY "관리자 수정 허용"
ON public.contacts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. 인증된 사용자만 contact를 삭제할 수 있음 (DELETE)
DROP POLICY IF EXISTS "관리자 삭제 허용" ON public.contacts;
CREATE POLICY "관리자 삭제 허용"
ON public.contacts
FOR DELETE
TO authenticated
USING (true);
```

### 적용된 보안 정책

1. **공개 폼 제출**: 익명/인증 사용자 모두 contact 폼을 제출할 수 있음 (INSERT)
2. **관리자 조회**: 인증된 사용자만 모든 contact 데이터를 조회할 수 있음 (SELECT)
3. **관리자 수정**: 인증된 사용자만 contact 상태를 업데이트할 수 있음 (UPDATE)
4. **관리자 삭제**: 인증된 사용자만 contact를 삭제할 수 있음 (DELETE)

## 관리자 계정 생성

### Supabase Dashboard에서 관리자 계정 생성

1. [Supabase Dashboard](https://supabase.com/dashboard/project/msbfcyrygirjdlliajhk) 접속
2. 좌측 메뉴에서 **Authentication** → **Users** 클릭
3. **Add User** 버튼 클릭
4. 관리자 이메일과 비밀번호 입력
5. **Auto Confirm User** 체크박스 활성화
6. **Create User** 버튼 클릭

### SQL로 관리자 계정 생성 (선택)

```sql
-- 관리자 계정 생성 예시
-- Supabase Dashboard의 SQL Editor에서 실행
-- 참고: 실제 비밀번호는 더 복잡하게 설정하세요
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@bnb-cnx.com',  -- 이메일 변경
  crypt('your-secure-password', gen_salt('bf')),  -- 비밀번호 변경
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

## 로그인 흐름

1. 사용자가 `/admin/login` 페이지 접속
2. Supabase Auth에 등록된 이메일과 비밀번호로 로그인
3. 성공 시 `/admin/contacts` 페이지로 리다이렉트
4. 세션이 유지되는 동안 관리자 기능 사용 가능
5. 로그아웃 시 다시 로그인 페이지로 이동

## 보안 주의사항

-  `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨)
-  `NEXT_PUBLIC_SUPABASE_ANON_KEY`는 공개되어도 안전합니다 (RLS로 보호됨)
-  관리자 계정의 비밀번호는 강력하게 설정하세요
-  정기적으로 Security Advisors를 확인하세요

## 추가 보안 강화 권장사항

Supabase Security Advisors에서 다음 항목들을 권장하고 있습니다:

1. **[Function Search Path](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable)**:

   -  `update_updated_at_column` 함수의 search_path를 고정하는 것이 좋습니다.

2. **[Leaked Password Protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)**:

   -  HaveIBeenPwned.org와 연동된 비밀번호 유출 보호 기능 활성화를 권장합니다.

3. **[MFA (Multi-Factor Authentication)](https://supabase.com/docs/guides/auth/auth-mfa)**:
   -  더 강력한 보안을 위해 MFA 옵션을 활성화하는 것이 좋습니다.

## 문제 해결

### 로그인이 안 되는 경우

1. Supabase Dashboard에서 사용자가 제대로 생성되었는지 확인
2. 이메일이 확인(confirmed)되었는지 확인
3. `.env.local` 파일의 환경 변수가 올바른지 확인
4. 개발 서버를 재시작 (`npm run dev`)

### RLS 오류가 발생하는 경우

1. Supabase Dashboard의 Table Editor에서 `contacts` RLS가 활성화되어 있는지 확인
2. Authentication → Policies에서 정책이 위 SQL과 동일하게 설정되어 있는지 확인
3. 특히 INSERT 정책이 `TO public` 으로 설정되어 있는지 점검

## 관련 링크

-  [Supabase Dashboard](https://supabase.com/dashboard/project/msbfcyrygirjdlliajhk)
-  [Supabase 문서](https://supabase.com/docs)
-  [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
-  [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)

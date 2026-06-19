# 배포 가이드

## 사전 준비

### Supabase

운영 권장 방식은 기존 Supabase 프로젝트를 클라이언트 조직으로 이전하는 것입니다.

1. 클라이언트가 Supabase 조직을 생성합니다.
2. 현재 프로젝트 소유자를 클라이언트 조직에 초대합니다.
3. Supabase Dashboard에서 프로젝트를 클라이언트 조직으로 transfer합니다.
4. 이전 후 Billing, Auth Users, RLS Policies, API Keys, Project URL을 확인합니다.
5. `/contact`, `/admin/login`, `/admin/contacts`를 다시 검증합니다.

### 정적 사이트 환경변수

정적 사이트 빌드 시에는 공개 가능한 값만 사용합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
NEXT_PUBLIC_CONTACT_FUNCTION_URL=https://your-project-ref.supabase.co/functions/v1/contact
```

`NEXT_PUBLIC_CONTACT_FUNCTION_URL`은 생략할 수 있습니다. 생략하면 `NEXT_PUBLIC_SUPABASE_URL/functions/v1/contact`를 호출합니다.

### Supabase Edge Function secrets

Resend와 관리자 알림 설정은 Supabase Edge Function secret으로 설정합니다. 정적 호스팅 환경변수에 넣지 않습니다.

```bash
supabase secrets set \
  RESEND_API_KEY="your-resend-api-key" \
  CONTACT_NOTIFICATION_TO="biz@bnb-cnx.com,manager@bnb-cnx.com" \
  CONTACT_NOTIFICATION_FROM="BNB CNX <noreply@contact.bnb-cnx.com>" \
  --project-ref msbfcyrygirjdlliajhk
```

`CONTACT_NOTIFICATION_TO`는 쉼표로 여러 담당자 이메일을 넣을 수 있습니다. 운영상으로는 그룹 메일 하나를 쓰는 편이 더 관리하기 쉽습니다.

## Supabase Function 배포

문의 저장과 Resend 알림 발송은 `supabase/functions/contact`가 처리합니다.

```bash
supabase functions deploy contact --project-ref msbfcyrygirjdlliajhk
```

이 함수는 공개 문의 폼에서 호출해야 하므로 `supabase/config.toml`에서 `verify_jwt = false`로 설정되어 있습니다.

## Cafe24 정적 배포

```bash
npm run build
```

빌드가 성공하면 생성된 `out/` 디렉터리의 파일을 Cafe24 웹 루트에 업로드합니다.

주의:
- `out/`만 업로드합니다.
- `.env.local`은 업로드하지 않습니다.
- Supabase Function 배포와 secrets 설정이 먼저 완료되어야 Contact 폼이 정상 동작합니다.

## 배포 후 확인사항

- Home, About, Contact 페이지 정상 로드
- Contact 폼 정상 제출
- Supabase `contacts` row 생성 확인
- 클라이언트 지정 이메일로 Resend 알림 도착 확인
- `/admin/login` 로그인 확인
- `/admin/contacts` 목록 조회와 상태 변경 확인
- 모바일 반응형 확인

## 문제 해결

### 문의 제출 실패

1. 브라우저 Network 탭에서 `functions/v1/contact` 응답 코드를 확인합니다.
2. Supabase Dashboard → Edge Functions → `contact` logs를 확인합니다.
3. `RESEND_API_KEY`, `CONTACT_NOTIFICATION_TO`, `CONTACT_NOTIFICATION_FROM` secret을 확인합니다.
4. Supabase URL과 publishable key가 빌드 시점에 올바르게 들어갔는지 확인합니다.

### 이메일 발송 실패로 문의 접수가 실패함

이 프로젝트는 DB 저장과 이메일 발송이 모두 성공해야 접수 완료로 처리합니다. 이메일 발송이 실패하면 저장된 row를 삭제해 접수를 되돌립니다.

1. Resend 발신 도메인 인증 상태를 확인합니다.
2. `CONTACT_NOTIFICATION_FROM`이 인증된 도메인 주소인지 확인합니다.
3. `CONTACT_NOTIFICATION_TO`가 실제 수신 가능한 주소인지 확인합니다.
4. Supabase Function 로그에서 `문의 알림 이메일 발송 실패`와 롤백 로그를 확인합니다.

## 유지보수

- Home: `app/page.tsx`
- About: `app/about/page.tsx`
- Contact UI: `app/contact/page.tsx`, `components/ContactForm.tsx`
- Contact 처리 함수: `supabase/functions/contact/index.ts`
- Supabase 설정: `supabase/config.toml`, `SUPABASE_SETUP.md`

수정 후 최소 검증:

```bash
npm run lint
npm run build
```

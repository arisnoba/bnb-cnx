# 배포 가이드

## 📋 사전 준비

### 1. Supabase 설정

1. [Supabase](https://supabase.com)에 가입 및 프로젝트 생성
2. SQL Editor에서 다음 SQL 실행:

```sql
-- contacts 테이블 생성
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  status text default 'new',
  created_at timestamp default now()
);

-- RLS 활성화
alter table contacts enable row level security;

-- 정책 생성 (누구나 INSERT, SELECT, UPDATE 가능)
create policy "Anyone can insert"
  on contacts for insert
  with check (true);

create policy "Anyone can read"
  on contacts for select
  using (true);

create policy "Anyone can update"
  on contacts for update
  using (true);
```

3. Supabase 프로젝트 설정에서 다음 정보 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Anon Public Key**: `eyJxxx...`

### 2. 환경변수 설정

`.env.local` 파일 수정:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

---

## 🚀 배포 방법

### Option 1: Vercel 배포 (추천 - 테스트용)

#### 1-1. GitHub 연동

```bash
# Git 초기화 (아직 안 했다면)
git init
git add .
git commit -m "Initial commit"

# GitHub에 푸시
git remote add origin https://github.com/your-username/bnb-cnx.git
git branch -M main
git push -u origin main
```

#### 1-2. Vercel 배포

1. [Vercel](https://vercel.com)에 가입 및 로그인
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 환경변수 설정:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
5. Deploy 클릭

#### 1-3. 커스텀 도메인 연결 (선택)

1. Vercel 프로젝트 설정 → Domains
2. 도메인 추가
3. DNS 설정:
   - Cafe24 도메인 관리에서 A 레코드 또는 CNAME 추가
   - Vercel이 제공하는 값 입력

**결과**: `https://your-project.vercel.app` 또는 커스텀 도메인으로 접속 가능

---

### Option 2: Cafe24 FTP 업로드

#### 2-1. 정적 파일 빌드

```bash
npm run build
```

빌드 완료 후 `out/` 폴더에 정적 파일 생성됨:
- `index.html` (Home)
- `about.html` (About)
- `contact.html` (Contact)
- `admin.html` (Admin)
- `_next/` (CSS, JS 파일들)

#### 2-2. FTP 업로드

1. **FileZilla** 또는 다른 FTP 클라이언트 사용
2. Cafe24 FTP 정보 입력:
   - 호스트: `ftp.your-domain.com`
   - 사용자명: Cafe24 FTP 계정
   - 비밀번호: FTP 비밀번호
3. `out/` 폴더의 **모든 파일**을 웹 루트(`public_html` 또는 `www`)에 업로드

#### 2-3. 환경변수 처리

⚠️ **중요**: `.env.local` 파일은 업로드하지 마세요!

정적 빌드에서는 환경변수가 빌드 시점에 JS 파일에 포함됩니다.
따라서 빌드 전에 `.env.local`이 올바르게 설정되어 있어야 합니다.

**결과**: `https://your-domain.com`으로 접속 가능

---

## 🔐 관리자 페이지 접속

1. `https://your-domain.com/admin` 접속
2. `.env.local`에 설정한 비밀번호 입력
3. 문의 목록 확인 및 관리

---

## 📊 배포 후 확인사항

### ✅ 체크리스트

- [ ] Home 페이지 정상 로드
- [ ] About 페이지 정상 로드
- [ ] Contact 페이지 정상 로드
- [ ] Contact 폼 제출 테스트
- [ ] Supabase에서 데이터 확인
- [ ] Admin 로그인 테스트
- [ ] Admin 대시보드에서 문의 목록 확인
- [ ] 상태 변경 기능 테스트
- [ ] 모바일 반응형 확인

---

## 🛠️ 문제 해결

### Supabase 연결 안 됨

1. `.env.local` 환경변수 확인
2. Supabase RLS 정책 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### 빌드 실패

```bash
# 의존성 재설치
rm -rf node_modules
npm install

# 빌드 재시도
npm run build
```

### Admin 로그인 안 됨

1. 비밀번호 확인 (`.env.local`의 `NEXT_PUBLIC_ADMIN_PASSWORD`)
2. localStorage 초기화: 브라우저 개발자 도구 → Application → Local Storage → 삭제

---

## 📝 유지보수

### 콘텐츠 수정

- Home: `app/page.tsx`
- About: `app/about/page.tsx`
- Contact: `app/contact/page.tsx`

수정 후 다시 빌드 & 배포:
```bash
npm run build
# Vercel: 자동 배포
# Cafe24: out/ 폴더 FTP 재업로드
```

### 디자인 수정

- 전역 스타일: `app/globals.css`
- Tailwind 설정: `tailwind.config.js`
- 컴포넌트: `components/` 폴더

---

## 📞 지원

문제가 발생하면 README.md 파일을 참고하거나 이슈를 등록해주세요.

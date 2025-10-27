# BNB CNX - Brand Website

3페이지 브랜드 웹사이트 (Home, About, Contact) + 관리자 페이지

## 🚀 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (테스트) / Cafe24 (프로덕션)

## 📁 프로젝트 구조

```
bnb-cnx/
├── app/
│   ├── layout.tsx          # 공통 레이아웃
│   ├── page.tsx            # Home
│   ├── about/page.tsx      # About
│   ├── contact/page.tsx    # Contact
│   └── admin/page.tsx      # Admin Dashboard
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── Header.tsx          # 네비게이션
│   ├── Footer.tsx          # 푸터
│   └── ContactForm.tsx     # 문의 폼
└── lib/
    ├── supabase.ts         # Supabase 클라이언트
    └── utils.ts            # 유틸리티 함수
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env.local` 파일에 Supabase 정보 입력:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password
```

### 3. Supabase 테이블 생성
Supabase SQL Editor에서 실행:
```sql
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  status text default 'new',
  created_at timestamp default now()
);

alter table contacts enable row level security;

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

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 📦 빌드 및 배포

### Vercel 배포 (테스트)
1. GitHub에 코드 push
2. Vercel에서 프로젝트 연결
3. 환경변수 설정
4. 자동 배포

### Cafe24 배포 (정적 빌드)
```bash
# 정적 파일 생성
npm run build

# out/ 폴더를 FTP로 업로드
```

## 🔐 관리자 페이지

- URL: `/admin`
- 비밀번호: `.env.local`의 `NEXT_PUBLIC_ADMIN_PASSWORD`
- 기능: 문의 목록 조회, 상태 관리

## 📄 페이지

- **Home** (`/`): 브랜드 소개
- **About** (`/about`): 회사/브랜드 정보
- **Contact** (`/contact`): 문의 폼
- **Admin** (`/admin`): 문의 관리 대시보드

## 🎨 커스터마이징

### 스타일 변경
`app/globals.css`에서 CSS 변수 수정

### 컴포넌트 추가
```bash
# shadcn/ui 컴포넌트 추가 예시
npx shadcn-ui@latest add [component-name]
```

## 📞 문의

프로젝트 관련 문의사항은 Contact 페이지를 이용해주세요.

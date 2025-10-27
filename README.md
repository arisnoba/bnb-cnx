# BNB CNX - Brand Website

3페이지 브랜드 웹사이트 (Home, About, Contact) + 관리자 페이지

## 🚀 기술 스택

-  **Framework**: Next.js 14 (App Router)
-  **Styling**: Tailwind CSS + shadcn/ui
-  **Database**: Supabase (PostgreSQL)
-  **Deployment**: Vercel (테스트) / Cafe24 (프로덕션)

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

`.env.local` 파일을 생성하고 Supabase 정보 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=https://msbfcyrygirjdlliajhk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

자세한 설정 방법은 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)를 참고하세요.

### 3. Supabase 설정

데이터베이스 테이블과 RLS 정책은 이미 설정되어 있습니다.
관리자 계정만 생성하면 됩니다:

1. [Supabase Dashboard](https://supabase.com/dashboard/project/msbfcyrygirjdlliajhk/auth/users) 접속
2. **Authentication** → **Users** → **Add User**
3. 이메일과 비밀번호 입력
4. **Auto Confirm User** 체크
5. **Create User** 클릭

자세한 내용은 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)를 참고하세요.

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

-  로그인: `/admin/login`
-  대시보드: `/admin/contacts`
-  인증 방식: Supabase Auth (이메일/비밀번호)
-  기능: 문의 목록 조회, 상태 관리 (신규 → 읽음 → 답변완료)
-  보안: Row Level Security (RLS)로 인증된 사용자만 접근 가능

## 📄 페이지

-  **Home** (`/`): 브랜드 소개
-  **About** (`/about`): 회사/브랜드 정보
-  **Contact** (`/contact`): 문의 폼
-  **Admin** (`/admin`): 문의 관리 대시보드

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

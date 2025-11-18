# BNB CNX - Brand Website

3페이지 브랜드 웹사이트(Home, About, Contact)와 비밀번호 기반 관리자 페이지로 구성된 Next.js 14(App Router) 프로젝트입니다.

## 기술 스택

- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS + shadcn/ui + SCSS 토큰 시스템
- Database: Supabase (PostgreSQL)
- Deployment: Vercel(테스트) / Cafe24(프로덕션)

## 프로젝트 구조

```
bnb-cnx/
├── app/
│   ├── layout.tsx              # 전역 레이아웃 및 메타
│   ├── page.tsx                # Home
│   ├── about/page.tsx          # About
│   ├── contact/page.tsx        # Contact
│   └── admin/
│       ├── page.tsx            # Admin Dashboard
│       └── layout.tsx          # 관리자 전용 래퍼
├── components/
│   ├── common/                 # Header, Footer, ContactButton 등 공통 UI
│   ├── home/                   # 홈 섹션 컴포넌트(ServiceCarousel 등)
│   ├── shared/                 # FlowCard, FlowGrid 등 베이스 컴포넌트
│   ├── ui/                     # BlurFade, Marquee 등 shadcn 확장
│   └── ContactForm.tsx         # Contact 페이지 폼
├── lib/
│   ├── supabase.ts             # Supabase 클라이언트 초기화
│   └── utils.ts                # 공용 유틸 함수
├── public/
│   └── images/                 # 페이지별 이미지와 아이콘
├── styles/
│   ├── abstracts/              # 토큰, 변수, 믹스인
│   ├── base/                   # 리셋과 전역 요소 스타일
│   ├── components/             # 재사용 가능한 SCSS 패턴
│   └── main.scss               # SCSS 엔트리(Next.js에서 import)
└── ...                         # 구성 파일(package.json, tsconfig 등)
```

## 설치 및 실행

1. 의존성 설치
   ```bash
   npm install
   ```
2. 환경변수 설정: 루트에 `.env.local` 생성 후 아래 값 입력
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_ADMIN_PASSWORD=your-password
   ```
   자세한 정보는 `SUPABASE_SETUP.md`를 참고하세요.
3. 관리자 계정 생성: Supabase Dashboard → Authentication → Users → Add User → Auto Confirm User 체크 → 생성
4. 개발 서버 실행
   ```bash
   npm run dev
   ```
   브라우저에서 http://localhost:3000 접속 후 화면을 확인합니다.

## 빌드 및 배포

- 테스트용 Vercel 배포: GitHub 연결 → 환경변수 입력 → push 시 자동 배포
- Cafe24 정적 배포: `npm run build` 후 생성된 `out/` 디렉터리를 FTP로 업로드
- 품질 점검: PR 전 `npm run lint` 실행과 Home/About/Contact/Admin UI 수동 점검을 권장합니다.

## 관리자 페이지

- 로그인: `/admin/login`
- 대시보드: `/admin/contacts`
- 인증 방식: Supabase Auth(이메일/비밀번호)
- 기능: 문의 목록 검색·필터, 상태(신규→읽음→답변완료) 변경
- 보안: RLS 정책으로 인증 사용자만 데이터 접근 가능

## 페이지 안내

- Home(`/`): 브랜드 소개와 서비스 섹션
- About(`/about`): 회사 및 파트너 정보
- Contact(`/contact`): Supabase 연동 문의 폼
- Admin(`/admin`): 문의 관리 전용 화면

## 커스터마이징

### 스타일 변경

- `styles/main.scss`를 Next.js 엔트리로 사용하며, 토큰·믹스인은 `styles/abstracts`, 베이스 리셋은 `styles/base`, 재사용 패턴은 `styles/components`에 배치합니다.
- 전역 변수나 레이아웃 설정을 추가할 경우 `styles/main.scss`에 partial import를 추가하고, 모듈형 패턴은 `styles/components/_<name>.scss`를 신설해 관리합니다.

### 컴포넌트 추가

```bash
npx shadcn-ui@latest add <component-name>
```

새 컴포넌트를 `components/`에 배치하고 `@/*` 경로 별칭으로 import하세요.

## 운영 인수인계 가이드

### 메인 비주얼 교체 방법(이미지/영상)

- 이미지 교체: `app/page.tsx` 상단의 `const imgHero = '/images/home/hero.jpg'` 경로를 유지한 상태에서 `public/images/home/hero.jpg` 파일만 교체하거나, 새로운 파일명을 지정합니다. 16:9 비율(권장 1920x1080px)과 2~3MB 이내 용량을 유지하면 레이아웃을 그대로 활용할 수 있습니다.
- 영상 교체: `hero-section` 내부의 배경용 `div`를 `<video autoPlay loop muted playsInline>` 태그로 바꾸고 `src="/videos/home/hero.mp4"`처럼 `public/videos/` 하위 경로를 지정하면 됩니다. 영상 역시 16:9 비율, H.264 코덱, 10MB 이하 용량을 권장하며, 초기 로딩 지연을 줄이기 위해 `poster` 속성으로 정적 이미지를 함께 지정하세요.
- 캐싱 반영: 정적 자산 교체 후에는 `npm run dev` 서버를 재시작하고 브라우저 캐시를 삭제하면 즉시 확인할 수 있습니다.

### 섹션별 텍스트 수정 경로

| 구분 | 파일 경로 | 수정 포인트 |
| --- | --- | --- |
| 홈 히어로 | `app/page.tsx` | `imgHero`, 헤드라인, 슬로건, 로고 경로 |
| 서비스 캐러셀 | `components/home/ServiceCarouselSection.tsx` | `services` 배열의 `title`, `description`, `image`, `anchor`, 배경색 |
| SNS Marketing | `components/home/SNSMarketingSection.tsx` | `services` 배열 텍스트, 해시태그, 이미지 리스트, `ContactButton` CTA |
| Brand Channel | `components/home/BrandChannelSection.tsx` | 헤드라인 카피, `FlowCard` 타이틀 및 설명 |
| Official Store | `components/home/OfficialStoreSection.tsx` | 섹션 설명, 카드 텍스트, 이미지 경로 |
| Live Commerce | `components/home/LiveCommerceSection.tsx` | KPI 텍스트, 왕홍 소개, CTA |
| CNX Mall | `components/home/CNXMallSection.tsx` | 오퍼 내용, 카드 리스트, 이미지 |
| PPL Marketing | `components/home/PPLMarketingSection.tsx` | 드라마/저널리즘 사례 텍스트, 썸네일 경로 |
| 공용 컴포넌트 | `components/Header.tsx`, `components/Footer.tsx`, `components/common/ContactButton.tsx` | 네비게이션 항목, 주소, CTA 문구 |
| 문의 폼 | `components/ContactForm.tsx` | 필드 라벨, 검증 메시지, 제출 성공/실패 카피 |

### 이미지 사이즈/비율 가이드

- 메인 히어로: 16:9 비율(예: 1920x1080px), JPEG 또는 MP4/WEBM. 모바일에서 배경이 확대되므로 핵심 내용은 중앙 60% 내에 배치합니다.
- 서비스 캐러셀 카드: `aspect-square` 레이아웃으로 1:1 비율을 사용합니다. 최소 1200x1200px 이미지를 권장하며, 피사체를 중앙에 두면 리사이즈 시 안정적입니다.
- SNS Marquee 썸네일: 컴포넌트 내부에서 `300x320px` 영역에 꽉 차도록 렌더링하므로 15:16 가까운 비율(예: 900x960px)을 사용하면 잘림이 최소화됩니다.
- Brand Channel 아이콘/배너: `public/images/home/brand/`에 132x132px PNG를 배치하고 필요 시 동일 크기의 교체 이미지를 준비합니다.
- 공용 로고 및 배너: `public/images/common/` 폴더에 SVG로 유지하면 `next/image` 최적화를 그대로 활용할 수 있습니다.

### 디자인 요소(배너·아이콘 등) 교체 경로

- 홈 전용 자산: `public/images/home/*` (service, sns, brand, live, mall 등 하위 폴더), 컴포넌트에서 절대 경로(`/images/...`)로 참조합니다.
- 공용 로고 및 아이콘: `public/images/common/*` 경로를 사용하며 Header, Footer, Hero 로고에 연결되어 있습니다.
- Contact/파트너 섹션 자산: 필요 시 `public/images/about/`, `public/images/partners/` 폴더에 새 이미지를 추가하고 해당 섹션 컴포넌트에서 경로만 교체하면 됩니다.
- shadcn 아이콘이나 커스텀 SVG는 `components/common` 또는 `components/shared` 내부에서 인라인으로 정의되어 있으므로, 새 파일을 추가하기보다 기존 SVG 코드를 교체하는 편이 간단합니다.

### 전체 페이지 구조 요약

- `app/layout.tsx`: 폰트, 메타, 전역 Providers.
- `app/page.tsx`: Hero → ServiceCarousel → SNS → BrandChannel → OfficialStore → LiveCommerce → CNXMall → PPL 순으로 렌더링하며, 각 섹션은 `components/home`의 컴포넌트로 분리됩니다.
- `app/about/page.tsx` / `app/contact/page.tsx`: 정적 콘텐츠 + `ContactForm` 조합, 필요 시 동일한 방식으로 섹션을 분리해 재사용합니다.
- `app/admin/page.tsx`: Supabase 세션을 검증한 뒤 `contacts` 테이블 데이터를 읽어오는 관리용 UI입니다.
- `components/` 트리는 공통 UI(`Header`, `Footer`, `ContactButton`), 폼(`ContactForm`), 홈 섹션(`home/*`), 애니메이션 도우미(`ui/*`), `FlowCard`/`FlowGrid` 같은 레이아웃 블록으로 구성됩니다.

### 기본 에러 체크 항목

1. 빌드/린트: `npm run lint`로 타입·스타일 오류를 우선 확인합니다.
2. 환경변수: `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_ADMIN_PASSWORD`가 정확히 입력되어 있는지 확인합니다.
3. Supabase Auth: 관리자 대시보드 로그인 문제가 발생하면 Supabase Dashboard → Authentication → Policies에서 RLS와 Auth 설정을 점검합니다.
4. 네트워크 호출: Contact 폼 제출 실패 시 브라우저 DevTools Network 탭에서 `POST /api/contact` 응답 코드를 확인하고, Supabase Row Insert 권한을 검토합니다.
5. 정적 자산: 이미지가 보이지 않으면 `public/` 내 파일명과 `next/image` import 경로가 일치하는지, 그리고 `npm run dev` 재시작 후 캐시가 초기화되었는지 확인합니다.
6. Cafe24 배포: 정적 배포 전 `npm run build`가 성공하는지 확인하고, 업로드 후 `out/` 루트에 `index.html`이 위치했는지 점검합니다.

## 문의

프로젝트 관련 문의는 Contact 페이지 또는 관리자에게 직접 연락해 주세요.

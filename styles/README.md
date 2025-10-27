# SCSS 스타일 가이드

이 프로젝트는 Tailwind CSS와 함께 커스텀 SCSS를 사용합니다.

## 폴더 구조

```
styles/
├── abstracts/          # 변수, 믹스인 등 추상화된 스타일
│   ├── _variables.scss # 브랜드 컬러, spacing, font 등
│   └── _mixins.scss    # 재사용 가능한 믹스인
├── base/               # 기본 스타일
│   ├── _reset.scss     # CSS 리셋
│   └── _typography.scss # 타이포그래피
├── components/         # 컴포넌트별 스타일
│   └── _buttons.scss   # 버튼 스타일
└── main.scss          # 메인 엔트리 포인트
```

## 사용 방법

### 1. 브랜드 컬러 사용

```scss
.my-element {
	background-color: $brand-purple; // #a523d0
	color: $brand-neon; // #baff00
}
```

### 2. 믹스인 사용

```scss
.container-custom {
	@include container; // 반응형 컨테이너
}

.centered-box {
	@include flex-center; // flexbox 중앙 정렬
}

.my-heading {
	@include heading-1; // 큰 제목 스타일
}

.cta-button {
	@include button-primary; // 기본 버튼 스타일
}
```

### 3. 반응형 디자인

```scss
.responsive-element {
	width: 100%;

	@include md {
		width: 50%; // 768px 이상
	}

	@include lg {
		width: 33.333%; // 1024px 이상
	}
}
```

### 4. 유틸리티 클래스 (HTML에서 바로 사용)

```html
<!-- Typography -->
<h1 class="heading-1">큰 제목</h1>
<h2 class="heading-2">중간 제목</h2>
<p class="body-text">본문 텍스트</p>

<!-- Colors -->
<span class="text-brand-purple">보라색 텍스트</span>
<span class="text-brand-neon">형광 노란색 텍스트</span>

<!-- Layout -->
<div class="container-custom">컨테이너</div>
<div class="flex-center">중앙 정렬</div>

<!-- Buttons -->
<button class="btn-primary">기본 버튼</button>
<button class="btn-secondary">보조 버튼</button>
```

## 변수 목록

### 브랜드 컬러

-  `$brand-purple`: #a523d0
-  `$brand-neon`: #baff00
-  `$accent-orange`: #ff6200

### Spacing

-  `$spacing-xs`: 4px
-  `$spacing-sm`: 8px
-  `$spacing-md`: 16px
-  `$spacing-lg`: 20px
-  `$spacing-xl`: 40px
-  `$spacing-2xl`: 60px
-  `$spacing-3xl`: 120px

### Font Sizes

-  `$font-xs`: 14px
-  `$font-sm`: 16px
-  `$font-md`: 20px
-  `$font-lg`: 24px
-  `$font-xl`: 28px
-  `$font-2xl`: 68px

## 컴포넌트 스타일 추가하기

새로운 컴포넌트 스타일을 추가하려면:

1. `styles/components/` 폴더에 새 파일 생성 (예: `_cards.scss`)
2. `styles/main.scss`에 import 추가:
   ```scss
   @import 'components/cards';
   ```

## 자동 컴파일

Next.js는 자동으로 SCSS를 컴파일합니다. 별도의 빌드 설정이 필요 없습니다.

개발 서버 실행:

```bash
npm run dev
```

SCSS 파일을 수정하면 자동으로 감지되어 재컴파일됩니다.

## Tailwind vs SCSS 사용 가이드

-  **Tailwind 사용**: 간단한 레이아웃, spacing, 색상
-  **SCSS 사용**: 복잡한 컴포넌트, 재사용 가능한 패턴, 브랜드 특화 스타일

### 예시

```tsx
// Tailwind + SCSS 조합
<div className="flex gap-4 p-4">
	<button className="btn-primary">버튼 1</button>
	<button className="btn-secondary">버튼 2</button>
</div>
```

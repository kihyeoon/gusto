# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - 개발 서버 실행 (브라우저 자동 열림)
- `pnpm build` - 프로덕션 빌드
- `pnpm start` - 프로덕션 서버 실행
- `pnpm lint` - ESLint로 코드 검사
- `pnpm test` - Vitest로 단위/통합 테스트 실행
- `pnpm test:ui` - Vitest UI 모드로 테스트 실행
- `pnpm storybook` - Storybook 개발 서버 실행 (포트 6006)
- `pnpm cypress:open` - Cypress E2E 테스트 GUI 실행
- `pnpm e2e` - 서버 시작 후 Cypress GUI 실행
- `pnpm e2e:ci` - 서버 시작 후 Cypress headless 실행

### Sanity Studio 명령어 (sanity-studio 디렉토리)

- `cd sanity-studio && pnpm dev` - Sanity Studio CMS 실행

## 프로젝트 아키텍처

### 핵심 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn/UI
- **State Management**: TanStack Query (React Query)
- **Authentication**: NextAuth v5 Beta
- **CMS**: Sanity Studio
- **AI Integration**: OpenAI API + AI SDK
- **Testing**: Vitest, Cypress, Testing Library, Storybook

### 도메인 기반 폴더 구조

프로젝트는 feature-based 아키텍처를 따릅니다:

```
src/
├── app/                 # Next.js App Router (라우팅, 레이아웃, API routes)
├── components/          # 공통 UI 컴포넌트 (NavBar, 다이얼로그 등)
├── features/           # 도메인별 기능 모듈
│   ├── auth/           # 사용자 인증 관련
│   └── recipe/         # 레시피 도메인 (핵심 비즈니스 로직)
│       ├── apis/       # API 클라이언트 (client.ts, server.ts)
│       ├── components/ # 레시피 관련 UI 컴포넌트
│       ├── hooks/      # 레시피 관련 커스텀 훅
│       ├── libs/       # 도메인 유틸리티 (AI 프롬프트, 스키마 등)
│       ├── models/     # 타입 정의 (Recipe, Ingredient 등)
│       └── services/   # 비즈니스 로직 서비스
├── libs/               # 공통 유틸리티 및 라이브러리
└── services/           # 외부 서비스 연동 (S3, Sanity)
```

### 핵심 도메인 모델

레시피 도메인의 주요 타입들 (`src/features/recipe/models/recipe.ts`):
- `Recipe` - 완전한 레시피 엔티티
- `RecipeFromAI` - AI로부터 생성된 레시피 데이터
- `RecipeInput` - 레시피 생성 입력 데이터
- `RecipePreview` - 레시피 목록용 미리보기 데이터

### AI 기반 레시피 생성 워크플로우

1. 유튜브 URL 입력 → 영상 스크립트 추출
2. OpenAI API를 통한 레시피 생성 (스트리밍)
3. Sanity CMS에 레시피 저장
4. S3에 썸네일 이미지 저장

### 테스트 전략

- **단위 테스트**: Vitest + Testing Library (`.spec.tsx`, `.test.ts`)
- **컴포넌트 테스트**: Storybook (`.stories.ts`)
- **E2E 테스트**: Cypress (`cypress/e2e/`)
- **모킹**: MSW를 활용한 API 모킹 (`src/__mocks__/`)

### 개발 시 주의사항

- 파일명은 kebab-case 사용 (`.cursor/rules/next-tailwind-project.mdc` 참고)
- 컴포넌트는 기능별로 세분화하여 구성
- API 호출은 TanStack Query를 통해 캐싱 및 상태 관리
- Tailwind CSS + shadcn/ui 컴포넌트 시스템 활용
- TypeScript strict 모드 활용
- 클린 코드 및 클린 아키텍처 원칙 준수

### 환경 변수

프로젝트는 여러 외부 서비스와 연동됩니다:
- OpenAI API (레시피 생성)
- NextAuth (인증)
- Sanity (CMS)
- AWS S3 (이미지 저장)
- Vercel (배포 및 분석)
# Gusto - AI 기반 레시피 생성 및 관리 시스템

Gusto는 AI를 활용하여 유튜브 요리 영상 URL로부터 레시피를 자동 생성하고, 생성된 레시피를 관리할 수 있는 웹 애플리케이션입니다. 

## 주요 기능

- **레시피 생성**  
  유튜브 영상 URL을 입력하면 AI가 해당 영상을 분석하여 레시피(재료, 조리 순서, 팁 등)를 자동으로 생성합니다.

- **레시피 목록 및 상세 페이지**  
  생성된 레시피 목록을 확인하고, 각 레시피의 상세 정보를 볼 수 있습니다. 상세 페이지에서는 레시피 편집, 삭제 등의 기능도 제공됩니다.

- **사용자 인증**  
  NextAuth를 통한 로그인/로그아웃 기능을 제공하여, 인증된 사용자에 한해 레시피 생성 및 편집이 가능합니다.

- **UI 컴포넌트**  
  `RecipeEdit`, `RecipeView`, `CommentForm` 등 모듈화된 UI 컴포넌트로 구성되어 있으며, Storybook을 통해 개별 컴포넌트의 문서화와 테스트가 가능합니다.

- **테스트 및 품질 보증**  
  Vitest, Cypress, Testing Library 등의 도구를 사용하여 단위/통합 테스트와 E2E 테스트를 진행하고 있습니다.

- **콘텐츠 관리**  
  Sanity Studio를 연동하여 콘텐츠를 관리하고, 데이터의 CRUD 작업을 효율적으로 처리할 수 있습니다.

## 개발 환경

- **Framework**: Next.js  
- **언어**: TypeScript  
- **스타일**: TailwindCSS, shadcn-ui
- **상태 관리 및 API**: react-query, axios  
- **테스트 도구**: Vitest, Cypress, Testing Library, Storybook  
- **인증**: NextAuth  
- **콘텐츠 관리**: Sanity Studio

## 프로젝트 구조

```
Gusto/
├── src/
│   ├── app/                   # Next.js 앱의 레이아웃, 라우팅 및 글로벌 설정
│   ├── components/            # 재사용 가능한 UI 컴포넌트 (예: NavBar, ConfirmDialog 등)
│   ├── features/              # 도메인별 기능 모듈 (레시피 관련 컴포넌트, 훅, 서비스 등)
│   │   └── recipe/
│   │       ├── components/    # 레시피 상세, 편집, 목록 관련 컴포넌트
│   │       ├── hooks/         # 레시피 관련 커스텀 훅 (useRecipes 등)
│   │       └── services/      # API 요청 및 데이터 처리 로직 (createRecipe, updateRecipe, deleteRecipe 등)
│   ├── libs/                  # 유틸리티, 상수, API 클라이언트 등 공통 라이브러리
│   └── stories/               # Storybook 스토리 파일
├── .github/                   # PR/Issue 템플릿 등
├── sanity-studio/             # Sanity Studio 관련 설정 및 구성 파일
├── .storybook/               # Storybook 설정 파일들
├── public/                    # 정적 파일 (이미지, 폰트 등)
├── package.json               # 프로젝트 의존성 및 스크립트
└── tsconfig.json              # TypeScript 설정 파일
```

## 설치 및 실행 방법

이 프로젝트는 [pnpm](https://pnpm.io/)을 사용하여 의존성을 관리합니다. 아래 명령어를 통해 pnpm을 설치한 후 진행해주세요.

1. **pnpm 설치 및 의존성 설치**

   만약 pnpm이 설치되어 있지 않다면, 아래 명령어로 pnpm을 설치할 수 있습니다.
   ```
   npm install -g pnpm
   ```

   이후, 프로젝트 루트에서 의존성을 설치합니다.
   ```
   pnpm install
   ```

2. **개발 서버 실행**

   ```
   pnpm dev
   ```

   기본적으로 [http://localhost:3000](http://localhost:3000) 에서 애플리케이션에 접근할 수 있습니다.

3. **테스트 실행**

   - **단위 및 통합 테스트 (Vitest)**
     ```
     pnpm test
     ```
   - **E2E 테스트 (Cypress)**
     ```
     pnpm e2e
     ```

4. **Storybook 실행 (컴포넌트 문서화 및 테스트)**

   ```
   pnpm storybook
   ```

5. **Sanity Studio 실행 (콘텐츠 관리)**

   ```
   cd sanity-studio
   pnpm install
   pnpm dev
   ```

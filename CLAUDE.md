# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 안내서입니다. 비개발자도 이해할 수 있도록 쉬운 말로 작성했습니다.

## 프로젝트 소개

**OK 금융 그룹 샘플 프로젝트**입니다. 웹 브라우저에서 동작하는 1페이지짜리(SPA) 웹 앱이며, Lovable이라는 도구로 처음 만들어졌습니다.

사용된 주요 기술:
- **Vite + React + TypeScript** — 화면을 만드는 기본 틀
- **shadcn/ui (Radix 기반)** — 버튼, 다이얼로그 등 미리 만들어진 UI 부품 모음
- **Supabase** — 데이터 저장소(데이터베이스)와 로그인 등 백엔드 기능 제공
- **Tailwind CSS** — 디자인(색상, 여백 등)을 빠르게 입히는 도구

## 자주 쓰는 명령어

이 프로젝트는 **Bun**이라는 패키지 매니저를 사용합니다(`bun.lockb` 파일 존재). npm으로도 동작합니다.

| 명령어 | 설명 |
|---|---|
| `bun dev` | 개발용 서버 실행 (브라우저 주소: `http://localhost:8080`) |
| `bun run build` | 실제 배포용으로 빌드(완성본 만들기) |
| `bun run build:dev` | 개발 모드로 빌드 |
| `bun run lint` | 코드 스타일 검사 (ESLint) |
| `bun test` | 단위 테스트 한 번 실행 (Vitest) |
| `bun run test:watch` | 파일이 바뀔 때마다 자동으로 테스트 실행 |
| `bunx vitest run 경로/파일.test.ts -t "테스트 이름"` | 특정 테스트 1개만 실행 |
| `bunx playwright test` | 브라우저를 직접 띄워서 하는 E2E 테스트 |

설정 파일 위치: [playwright.config.ts](playwright.config.ts), [vitest.config.ts](vitest.config.ts)

## 코드 구조 한눈에 보기

```
src/
├── main.tsx           ← 앱의 시작점
├── App.tsx            ← 전체 화면 구조와 라우팅(주소별 페이지 연결)
├── pages/             ← 각 페이지(주소)별 화면
├── components/        ← 여러 곳에서 재사용하는 화면 부품
│   └── ui/            ← shadcn/ui 기본 부품 모음
├── integrations/
│   └── supabase/      ← Supabase 연결 코드
├── hooks/             ← 재사용 가능한 React 훅
└── lib/               ← 유틸리티 함수
```

### 알아두면 좋은 점

- **앱의 시작 흐름**: [src/main.tsx](src/main.tsx) → [src/App.tsx](src/App.tsx) 순서로 실행됩니다. `App.tsx`는 데이터 관리(TanStack Query), 툴팁, 알림(Toaster), 라우팅(BrowserRouter)을 모두 감싸 줍니다.
- **새 페이지 추가 시 주의**: `App.tsx`에서 라우트(`<Route>`)를 추가할 때는 반드시 `path="*"` (찾을 수 없음 페이지) **위쪽**에 넣어야 합니다. 아래에 넣으면 새 페이지가 동작하지 않습니다.
- **경로 단축어 `@/`**: 코드에서 `@/components/...`처럼 쓰면 `src/components/...`를 가리킵니다. ([vite.config.ts](vite.config.ts), [tsconfig.json](tsconfig.json)에 설정됨)
- **React 중복 방지**: `vite.config.ts`의 `dedupe` 설정은 React가 두 번 로드되어 생기는 버그를 막기 위한 것이므로, 손대지 않는 것이 좋습니다.
- **Supabase 환경변수**: `.env` 파일에 Supabase 접속 정보가 들어 있습니다. 이 파일은 절대 외부에 공유하면 안 됩니다.
- **폼(입력양식)**: `react-hook-form` + `zod` 조합을 사용합니다. (입력값 검증)
- **다크 모드**: `next-themes` 라이브러리로 처리합니다.
- **Lovable 태거**: `componentTagger()` 플러그인은 **개발 모드에서만** 동작합니다. 배포용 빌드에는 포함되지 않습니다.

## 개발 서버 포트

기본 포트는 일반적인 5173이 아닌 **8080**입니다. 브라우저에서 `http://localhost:8080`으로 접속하세요.

# OK 금융 그룹 샘플 프로젝트

OK금융그룹 업무 점검(체크리스트) 샘플 웹 애플리케이션입니다. "월간 점검", "분기 점검"과 같은 카테고리별 점검 항목을 체크하고 메모를 남길 수 있는 단일 페이지 앱입니다.

## 주요 기능

- 점검 항목 체크/해제
- 항목별 메모 입력
- 진행률 표시 (완료/전체, 퍼센트 + 프로그레스 바)
- 필터 (전체 / 완료 / 미완료)
- 라이트/다크 테마 전환
- 카테고리별 섹션 그룹핑

## 기술 스택

- **프레임워크**: React 18 + TypeScript + Vite (SWC 플러그인)
- **UI**: Tailwind CSS + shadcn/ui (Radix UI 기반), lucide-react 아이콘
- **라우팅/상태/폼**: react-router-dom, @tanstack/react-query, react-hook-form + zod
- **백엔드 연동**: Supabase (`@supabase/supabase-js`)
- **테스트**: Vitest + Testing Library, Playwright (E2E)

## 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 린트
npm run lint

# 테스트
npm run test
```

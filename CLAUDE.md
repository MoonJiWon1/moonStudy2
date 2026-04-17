@AGENTS.md

# Harness Engineering Landing Page

## 프로젝트 개요
하네스 엔지니어링 방법론을 소개하는 Next.js 랜딩 페이지.
이 CLAUDE.md 자체가 하네스 엔지니어링 컨텍스트 파일 역할을 한다.

## Tech Stack
- Framework : Next.js (App Router)
- Language  : TypeScript
- Styling   : Tailwind CSS
- Animation : Framer Motion
- Icons     : lucide-react
- Deploy    : Vercel

## 프로젝트 구조
src/
  app/
    page.tsx              # 메인 랜딩 (Hero + HarnessExplain + HowItWorks)
    guide/page.tsx        # CLAUDE.md 작성법 페이지
    layout.tsx            # 폰트, 메타데이터
  components/
    SiteNav.tsx           # 상단 네비게이션
    Hero.tsx              # 타이틀 + CTA
    HarnessExplain.tsx    # 하네스 엔지니어링 설명
    HowItWorks.tsx        # 3단계 설명
    GuideContent.tsx      # CLAUDE.md 작성 가이드
    Footer.tsx
  lib/
    constants.ts          # 섹션 텍스트, 데이터

## 코딩 규칙
- 컴포넌트는 function 키워드 사용 (arrow function X)
- 주석은 한국어로 작성
- "use client"는 상태/이벤트가 필요한 컴포넌트에만
- props 타입은 같은 파일 상단에 type Props = {} 로 정의

## 디자인 가이드
- 배경: #f8fafc (라이트 테마)
- 포인트 컬러: #3b82f6 (blue-500)
- 폰트: Geist Sans (본문), Geist Mono (코드 블록)
- 섹션 간격: py-24, 최대 너비 max-w-4xl mx-auto px-6

## 금지 사항
- any 타입 사용 금지
- 외부 UI 라이브러리 추가 시 먼저 물어볼 것
- .env 파일 수정 금지
- 파일 새로 만들기보다 기존 파일 수정 선호

## 배포 전 필수 체크 (이 단계를 건너뛰지 말 것)
코드 수정 후 "완료"라고 말하기 전에 반드시 순서대로 실행:
1. npx tsc --noEmit   → TypeScript 타입 오류 0개 확인
2. npm run build      → 빌드 성공 확인
에러가 하나라도 있으면 수정 후 재실행. 둘 다 통과해야만 완료.

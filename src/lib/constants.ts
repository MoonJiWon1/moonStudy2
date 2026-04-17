// CLAUDE.md 전체 내용 (화면에 표시됨)
export const CLAUDE_MD_CONTENT = `# Harness Engineering Landing Page

## 프로젝트 개요
하네스 엔지니어링 방법론을 소개하는 Next.js 랜딩 페이지.
이 CLAUDE.md 자체가 사이트에 표시되어 데모 역할을 한다.

## Tech Stack
- Framework : Next.js 14 (App Router)
- Language  : TypeScript (strict mode)
- Styling   : Tailwind CSS v3
- Animation : Framer Motion
- Icons     : lucide-react
- Deploy    : Vercel

## 프로젝트 구조
src/
  app/
    page.tsx          # 메인 랜딩 (Hero + 섹션들)
    layout.tsx        # 폰트, 메타데이터
  components/
    Hero.tsx          # 타이틀 + CTA
    HowItWorks.tsx    # 3단계 설명
    ClaudemdViewer.tsx# CLAUDE.md 코드 뷰어
    Footer.tsx
  lib/
    constants.ts      # 섹션 텍스트, 데이터

## 코딩 규칙
- 컴포넌트는 function 키워드 사용 (arrow function X)
- props 타입은 같은 파일 상단에 type Props = {} 로 정의
- Tailwind 클래스 순서: 레이아웃 → 간격 → 색상 → 타이포
- "use client"는 상태/이벤트가 필요한 컴포넌트에만

## 디자인 가이드
- 색상: 다크 배경 (#0a0a0a) + 포인트 (#60a5fa, blue-400)
- 폰트: Geist Sans (본문), Geist Mono (코드 블록)
- 섹션 간격: py-24, 최대 너비 max-w-4xl mx-auto px-6

## 금지 사항
- any 타입 사용 금지
- inline style 사용 금지 (Tailwind만)
- 외부 UI 라이브러리 추가 시 먼저 물어볼 것

## 완료 체크리스트
새 컴포넌트 추가 후:
1. TypeScript 에러 없는지 확인 (npx tsc --noEmit)
2. 모바일 반응형 확인 (sm: md: lg: 브레이크포인트)
3. 컴포넌트를 page.tsx에 import 추가했는지 확인`

// HowItWorks 단계 데이터
export const STEPS = [
  {
    number: '01',
    title: 'CLAUDE.md 작성',
    desc: '프로젝트 구조, 코딩 규칙, 디자인 가이드를 CLAUDE.md 한 파일에 정의한다. Claude Code가 이 파일을 매 대화마다 자동으로 읽는다.',
    tag: 'context',
  },
  {
    number: '02',
    title: 'Claude Code 실행',
    desc: 'claude 명령어로 에디터를 열면 컨텍스트가 이미 로드된 상태다. "Hero 컴포넌트 만들어줘" 한 줄로 프로젝트 규칙을 따르는 코드가 생성된다.',
    tag: 'execution',
  },
  {
    number: '03',
    title: '일관된 코드베이스',
    desc: '팀원이 바뀌어도, 대화가 새로 시작되어도 CLAUDE.md가 컨텍스트를 유지한다. 규칙 이탈 없이 프로젝트가 성장한다.',
    tag: 'consistency',
  },
]

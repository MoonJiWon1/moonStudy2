# harness-demo 프로젝트에서 사용한 하네스 엔지니어링 기법

## 기둥 01 — 컨텍스트 엔지니어링 ✅

### 프로젝트 CLAUDE.md (`harness-demo/CLAUDE.md`)
Claude가 세션 시작 시 자동으로 읽는 실제 컨텍스트 파일.

```markdown
@AGENTS.md   ← 파일 분리 참조 (목차형)

## 프로젝트 개요
## Tech Stack
## 프로젝트 구조
## 코딩 규칙
## 디자인 가이드
## 금지 사항
## 배포 전 필수 체크
```

`@AGENTS.md`로 파일을 분리해 참조하는 것 자체가 매뉴얼의 **"목차형으로 분리해 필요한 정보만 로드"** 기법이다.

---

### AGENTS.md — Next.js 버전 함정 사전 경고

```markdown
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure
may all differ from your training data.
Read the relevant guide in node_modules/next/dist/docs/ before writing any code.
```

AI가 학습 데이터 기준의 구버전 Next.js 코드를 짜는 것을 시작 전에 차단.

---

### 글로벌 CLAUDE.md (`C:\Users\MOONJI\.claude\CLAUDE.md`)
모든 프로젝트에 공통 적용되는 지도 역할.

```markdown
# 코딩 스타일
- 주석은 한국어로
- 불필요한 console.log 남기지 말 것
- 파일 새로 만들기보다 기존 파일 수정 선호

# 스킬 사용 규칙
- 프론트엔드 UI 작업 요청이 오면 항상 frontend-design 스킬을 먼저 실행할 것

# 웹개발 팀 구성
| 스킬              | 역할      |
|-------------------|-----------|
| /frontend-design  | 프론트엔드 |
| /bmad             | 기획/설계  |
| /mcp-builder      | 백엔드     |
| /systemic-debugging | 검증     |
```

---

## 기둥 02 — 아키텍처 제약 ✅

### 배포 전 필수 체크 (CLAUDE.md에 명시)

```markdown
## 배포 전 필수 체크 (이 단계를 건너뛰지 말 것)
코드 수정 후 "완료"라고 말하기 전에 반드시 순서대로 실행:
1. npx tsc --noEmit   → TypeScript 타입 오류 0개 확인
2. npm run build      → 빌드 성공 확인
에러가 하나라도 있으면 수정 후 재실행. 둘 다 통과해야만 완료.
```

Claude는 이 규칙을 읽고 매 작업마다 실제로 빌드를 실행한 뒤에만 완료를 선언했다.

### 코딩 규칙 / 금지 사항 (CLAUDE.md에 명시)

```markdown
## 코딩 규칙
- 컴포넌트는 function 키워드 사용 (arrow function X)
- 주석은 한국어로 작성
- "use client"는 상태/이벤트가 필요한 컴포넌트에만

## 금지 사항
- any 타입 사용 금지
- 외부 UI 라이브러리 추가 시 먼저 물어볼 것
- 파일 새로 만들기보다 기존 파일 수정 선호
```

### TypeScript + ESLint
`tsconfig.json` + `eslint.config.mjs`로 타입 오류나 린트 위반 시 빌드 자체가 실패하도록 구성.

---

## 기둥 03 — 피드백 루프 ✅

### Vercel 자동 배포
`main` 브랜치에 push하면 자동 빌드·배포 트리거. 결과를 URL로 즉각 확인.

### IDE Diagnostics (VSCode)
파일 수정 즉시 타입 오류 인라인 표시.
실제로 이번 작업 중 `'WORKFLOW' is declared but its value is never read` 오류를 IDE가 즉시 잡았고 바로 수정했다.

---

## 기둥 04 — 엔트로피 관리 ⚠️ (규칙만, 자동화 도구 없음)

CLAUDE.md에 규칙은 명시되어 있다:
- 불필요한 console.log 남기지 말 것
- 파일 새로 만들기보다 기존 파일 수정 선호

Husky 같은 커밋 전 자동 강제 도구는 미적용.

---

## 요약

| 기둥 | 적용 여부 | 사용한 도구/방법 |
|------|-----------|-----------------|
| 컨텍스트 엔지니어링 | ✅ 적극 활용 | CLAUDE.md (프로젝트 규칙 전체), @AGENTS.md 분리, 글로벌 CLAUDE.md + 멀티 에이전트 스킬 |
| 아키텍처 제약 | ✅ 적용 | 배포 전 필수 체크 명시, 코딩 규칙/금지 사항, TypeScript, ESLint |
| 피드백 루프 | ✅ 간접 적용 | Vercel 자동 배포, IDE Diagnostics |
| 엔트로피 관리 | ⚠️ 규칙만 | CLAUDE.md 규칙 명시 (Husky 미적용) |

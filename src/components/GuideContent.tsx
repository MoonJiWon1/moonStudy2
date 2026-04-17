'use client'

import { motion } from 'framer-motion'

// 하네스 엔지니어링 4대 기둥에 맞게 섹션을 구성
const PILLARS = [
  {
    pillar: '기둥 01 — 컨텍스트 엔지니어링',
    pillarDesc: '필요한 정보를 AI가 읽기 쉬운 형태로 저장소에 배치해 적시에 제공한다.',
    accent: '#3b82f6',
    sections: [
      {
        badge: '필수',
        title: '프로젝트 개요',
        desc: '프로젝트가 무엇인지 한두 줄로 설명합니다. Claude가 전체 맥락을 파악하는 출발점입니다. 이게 없으면 Claude는 프로젝트 성격을 추측해서 엉뚱한 방향으로 코드를 짭니다.',
        code: `## 프로젝트 개요
반려동물 친화 식당을 검색하는 React 앱.
Kakao Maps API + Spring Boot REST API 연동.`,
      },
      {
        badge: '필수',
        title: '기술 스택',
        desc: '어떤 프레임워크, 언어, 라이브러리를 쓰는지 명시합니다. 명시하지 않으면 Claude가 자신이 좋다고 생각하는 기술로 코드를 짭니다.',
        code: `## Tech Stack
- Framework : Next.js 14 (App Router)
- Language  : TypeScript
- Styling   : Tailwind CSS
- Backend   : Spring Boot 3`,
      },
      {
        badge: '권장',
        title: '프로젝트 구조',
        desc: '파일과 폴더가 어떻게 구성되어 있는지 적습니다. Claude가 새 파일을 만들 때 기존 구조를 벗어나지 않도록 합니다.',
        code: `## 프로젝트 구조
src/
  app/        # Next.js 페이지
  components/ # 재사용 컴포넌트
  lib/        # 유틸, 상수
  context/    # React Context`,
      },
    ],
  },
  {
    pillar: '기둥 02 — 아키텍처 제약',
    pillarDesc: '"좋아 보이는데?"라고 Claude가 판단하기 전에, 규칙을 기계적으로 강제한다.',
    accent: '#8b5cf6',
    sections: [
      {
        badge: '필수',
        title: '코딩 규칙',
        desc: '팀이 합의한 코딩 스타일을 명시합니다. 이 섹션이 없으면 Claude는 매 대화마다 다른 스타일로 코드를 짭니다.',
        code: `## 코딩 규칙
- 컴포넌트는 function 키워드 사용 (arrow function X)
- 주석은 한국어로 작성
- "use client"는 상태/이벤트가 필요한 컴포넌트에만`,
      },
      {
        badge: '필수',
        title: '금지 사항',
        desc: '절대 하면 안 되는 것들을 명시합니다. Claude가 "이게 더 낫지 않나요?"라고 판단해서 하려는 행동을 사전에 차단합니다.',
        code: `## 금지 사항
- any 타입 사용 금지
- inline style 사용 금지 (Tailwind만)
- 외부 UI 라이브러리 추가 시 먼저 물어볼 것
- .env 파일 수정 금지`,
      },
    ],
  },
  {
    pillar: '기둥 03 — 피드백 루프',
    pillarDesc: 'AI는 자신의 결과물을 과대평가한다. 즉각적인 교정 신호로 실수를 배포 전에 잡는다.',
    accent: '#10b981',
    sections: [
      {
        badge: '필수',
        title: '배포 전 필수 체크',
        desc: '"완료했습니다"라고 말하기 전에 반드시 실행해야 할 명령을 명시합니다. 이걸 CLAUDE.md에 써두면 Claude는 매번 자동으로 실행하고 에러가 없을 때만 완료로 처리합니다.',
        code: `## 배포 전 필수 체크 (이 단계를 건너뛰지 말 것)
코드 수정 후 "완료"라고 말하기 전에 반드시 순서대로 실행:
1. npx tsc --noEmit   → 타입 오류 0개 확인
2. npm run build      → 빌드 성공 확인
에러가 하나라도 있으면 수정 후 재실행. 둘 다 통과해야만 완료.`,
      },
      {
        badge: '고급',
        title: 'Verify Scripts (자동 검증)',
        desc: '단순 빌드 체크를 넘어 린트·테스트·빌드를 한 번에 실행하는 verify 스크립트를 만들면 AI가 스스로 검증합니다. UI 프로젝트라면 스크린샷도 logs/screenshots/ 에 저장해 AI가 시각적 결과를 확인하게 합니다.',
        code: `## 자동 검증 스크립트
# scripts/verify-task.sh 를 만들어두고 CLAUDE.md에 명시
## 검증 명령
npm run lint         → 린트 오류 0개 확인
npx tsc --noEmit     → 타입 오류 0개 확인
npm run test -- --run → 테스트 전체 통과 확인
npm run build        → 빌드 성공 확인
# 실패 시 로그를 logs/ 폴더에 저장하고 스스로 수정할 것`,
      },
    ],
  },
  {
    pillar: '기둥 04 — 엔트로피 관리',
    pillarDesc: 'AI가 만든 불필요한 코드와 파일을 주기적으로 정리해 환경을 깨끗하게 유지한다.',
    accent: '#f59e0b',
    sections: [
      {
        badge: '권장',
        title: '정리 규칙',
        desc: 'Claude가 파일을 추가할 때 지켜야 할 규칙을 명시합니다. 쌓인 불필요한 코드는 나중에 AI가 더 나쁜 결과를 내는 원인이 됩니다.',
        code: `## 정리 규칙
- 사용하지 않는 import는 즉시 제거
- 주석 처리된 코드 블록은 남기지 말 것
- 새 컴포넌트 추가 시 기존 유사 컴포넌트 재사용 먼저 검토
- 파일 새로 만들기보다 기존 파일 수정 선호`,
      },
      {
        badge: '고급',
        title: 'Husky — 커밋 전 강제 검증',
        desc: 'Husky를 설치하면 커밋 시 자동으로 검증 스크립트가 실행됩니다. CLAUDE.md에 명시해두면 AI가 커밋 전 Husky가 실행됨을 인지하고 사전에 오류를 수정합니다.',
        code: `## Git Hook (Husky)
이 프로젝트는 Husky pre-commit hook이 설정되어 있음.
커밋 전 자동으로 아래가 실행됨:
  - npm run lint
  - npx tsc --noEmit
  - npm run test -- --run
Hook을 --no-verify 플래그로 우회하지 말 것.
# 설치: npx husky-init && npm install`,
      },
    ],
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  )
}

export function GuideContent() {
  return (
    <section className="min-h-screen px-6 py-20" style={{ background: '#f8fafc' }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-20">

        {/* 헤더 */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#94a3b8' }}>
              CLAUDE.md 작성 가이드
            </span>
            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
          </div>

          <h1 className="font-sans font-black leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#0f172a' }}>
            하네스 기법으로<br />
            <span style={{ color: '#3b82f6' }}>CLAUDE.md 작성하기</span>
          </h1>

          <p className="font-sans text-base leading-relaxed max-w-xl" style={{ color: '#64748b' }}>
            단순한 규칙 나열이 아닙니다. 하네스 엔지니어링의 4대 기둥에 맞춰
            CLAUDE.md를 작성하면 AI가 일관되고 안전하게 동작합니다.
          </p>
        </FadeIn>

        {/* 4대 기둥별 섹션 */}
        {PILLARS.map((pillar, pi) => (
          <div key={pillar.pillar} className="flex flex-col gap-6">

            {/* 기둥 헤더 */}
            <FadeIn delay={pi * 0.05}>
              <div className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: pillar.accent }} />
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs font-semibold" style={{ color: pillar.accent }}>
                    {pillar.pillar}
                  </span>
                  <p className="font-sans text-sm" style={{ color: '#475569' }}>
                    {pillar.pillarDesc}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* 섹션 카드들 */}
            {pillar.sections.map((s, si) => (
              <FadeIn key={s.title} delay={pi * 0.05 + si * 0.07 + 0.1}>
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>

                  {/* 카드 헤더 */}
                  <div className="flex items-center gap-3 px-5 py-4" style={{ background: '#fff' }}>
                    <h2 className="font-sans font-bold text-base" style={{ color: '#0f172a' }}>
                      {s.title}
                    </h2>
                    <span className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: s.badge === '필수' ? '#eff6ff' : '#f8fafc',
                        color: s.badge === '필수' ? '#3b82f6' : '#94a3b8',
                        border: `1px solid ${s.badge === '필수' ? '#bfdbfe' : '#e2e8f0'}`,
                      }}>
                      {s.badge}
                    </span>
                  </div>

                  {/* 설명 */}
                  <div className="px-5 pb-4" style={{ background: '#fff' }}>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: '#64748b' }}>
                      {s.desc}
                    </p>
                  </div>

                  {/* 코드 예시 */}
                  <pre className="font-mono text-xs leading-relaxed px-5 py-4 overflow-x-auto"
                    style={{ background: '#f1f5f9', borderTop: '1px solid #e2e8f0', color: '#334155' }}>
                    {s.code}
                  </pre>
                </div>
              </FadeIn>
            ))}
          </div>
        ))}

        {/* 하단 팁 */}
        <FadeIn delay={0.3}>
          <div className="p-6 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <p className="font-mono text-xs font-semibold mb-3" style={{ color: '#3b82f6' }}>
              TIP — 처음 시작한다면
            </p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: '#475569' }}>
              처음부터 4가지 기둥을 전부 채울 필요는 없습니다.{' '}
              <span style={{ color: '#0f172a', fontWeight: 600 }}>프로젝트 개요 + 기술 스택 + 배포 전 체크</span>만
              써도 충분히 효과가 있습니다. Claude와 작업하면서 같은 실수가 반복될 때마다
              해당 기둥에 규칙을 하나씩 추가하면 됩니다.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}

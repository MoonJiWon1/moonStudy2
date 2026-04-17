'use client'

import { motion } from 'framer-motion'

const WHY_2026 = [
  {
    number: '01',
    title: '모델 상향 평준화',
    desc: '주요 AI 모델들의 성능 차이가 좁혀졌습니다. 이제 모델 자체보다 그 모델을 둘러싼 시스템(하네스)이 경쟁력이 됩니다.',
  },
  {
    number: '02',
    title: '실무 투입',
    desc: 'AI가 단순 데모를 넘어 실제 서비스 환경에서 작동하기 시작했습니다. 반복되는 실수나 궤도 이탈을 구조적으로 막아야 할 필요가 생겼습니다.',
  },
  {
    number: '03',
    title: '개념의 정립',
    desc: '하시코프의 미쉘 하시모토가 이 용어를 정리하고, OpenAI가 공식적으로 사용하면서 2026년에 업계 표준 용어로 자리잡았습니다.',
  },
]

const PILLARS = [
  {
    tag: '기둥 01',
    title: '컨텍스트 엔지니어링',
    desc: '코딩 규칙, 기술 스택 같은 필요한 정보를 AI가 읽기 쉬운 형태로 저장소에 배치해 적시에 제공합니다.',
    how: '모든 규칙을 한 파일에 넣지 말고, 목차형(agent.md)으로 분리해 필요한 정보만 로드하게 합니다.',
    color: '#3b82f6',
  },
  {
    tag: '기둥 02',
    title: '아키텍처 제약',
    desc: '"좋은 코드를 짜줘"라고 부탁하는 대신, 규칙을 어기면 빌드나 배포가 불가능하도록 기계적으로 강제합니다.',
    how: '프롬프트(부탁)가 아닌 Lint·Test·Hook 코드로 규칙 위반 시 실행 자체를 차단합니다.',
    color: '#8b5cf6',
  },
  {
    tag: '기둥 03',
    title: '피드백 루프',
    desc: 'AI는 자신의 결과물을 스스로 과대평가합니다. 즉각적인 교정 신호로 실수를 배포 전에 잡아야 합니다.',
    how: '로그, 스크린샷, 자동 테스트 결과를 통해 AI가 자신의 실수를 즉각 인지하게 합니다.',
    color: '#10b981',
  },
  {
    tag: '기둥 04',
    title: '엔트로피 관리',
    desc: 'AI가 만든 중복 코드나 불필요한 파일은 쌓일수록 이후 결과물의 품질을 떨어뜨립니다.',
    how: '주기적으로 중복 코드를 제거하고 문서를 최신화하는 청소 전담 에이전트를 운영합니다.',
    color: '#f59e0b',
  },
]

const WORKFLOW = [
  {
    step: 'Step 1',
    title: '환경 설정',
    sub: 'claude.md & agent.md',
    desc: '프로젝트 루트에 claude.md를 두어 에이전트가 시작 시 반드시 읽게 합니다. 기술 스택, 빌드/테스트 명령어, 상세 규칙 파일들의 경로를 명시해 지도를 만듭니다.',
  },
  {
    step: 'Step 2',
    title: '작업 격리',
    sub: 'Git Worktree',
    desc: 'AI가 별도의 worktree를 생성해 독립된 공간에서 구현하고 테스트합니다. 메인 환경이 망가지는 것을 방지하고, 인간의 확인 없이도 안전한 실험을 가능하게 합니다.',
  },
  {
    step: 'Step 3',
    title: '강제성 부여',
    sub: 'Husky & Verify Scripts',
    desc: 'scripts/verify-task.sh로 린트·단위 테스트·빌드를 한 번에 실행합니다. Husky로 커밋 전 반드시 이 검증을 통과해야만 저장되도록 물리적으로 강제합니다.',
  },
  {
    step: 'Step 4',
    title: '가시성 확보',
    sub: 'Logging & Screenshots',
    desc: '테스트 실패 시 에러 로그와 UI 스크린샷을 logs/screenshots/ 폴더에 저장합니다. AI는 이 기록을 보고 자신의 실수를 스스로 판단해 코드를 수정합니다.',
  },
  {
    step: 'Step 5',
    title: '자동 문서화 및 머지',
    sub: 'Merge',
    desc: 'docs/plans/ 폴더에 작업 계획(active)과 완료 기록(completed)을 자동 관리해 히스토리를 보존합니다. 모든 테스트가 통과되면 AI가 직접 커밋하고 메인 브랜치에 합칩니다.',
  },
]

const PRINCIPLES = [
  { title: '모델보다 환경', desc: '결과가 나쁘면 모델을 바꾸기 전 하네스 시스템부터 점검하세요.' },
  { title: '실패에서 시작', desc: '처음부터 완벽하게 설계하려 하지 말고, 실패할 때마다 재발 방지 장치를 하나씩 추가하세요.' },
  { title: '적게 넣어라', desc: '규칙이 너무 많으면 성능과 비용에 악영향을 줍니다. 최소 규칙으로 최대 효과를 내는 것이 기술입니다.' },
  { title: '시스템으로 강제', desc: '프롬프트로 부탁하지 말고, 린터나 빌드 도구 같은 시스템으로 통제하세요.' },
  { title: '함께 진화', desc: 'AI 모델이 발전하면 하네스도 그에 맞춰 더 단순하고 효율적으로 계속 진화해야 합니다.' },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#94a3b8' }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
    </div>
  )
}

export function HarnessExplain() {
  return (
    <section className="py-24 px-6 relative" style={{ background: '#f8fafc' }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-24">

        {/* ── 섹션 레이블 ── */}
        <FadeIn>
          <Label>01 — What is Harness Engineering</Label>
        </FadeIn>

        {/* ── 1. 개념 설명 ── */}
        <div className="flex flex-col gap-8">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#0f172a' }}
            >
              AI에게<br />
              <span style={{ color: '#3b82f6' }}>운영체제를 달다</span>
            </motion.h2>
          </div>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl flex flex-col gap-3"
                style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                <p className="font-mono text-xs" style={{ color: '#3b82f6' }}>어원</p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#475569' }}>
                  하네스(Harness)는 말에 씌우는 <span style={{ color: '#0f172a', fontWeight: 600 }}>마구(고삐, 안장)</span>입니다.
                  아무리 힘이 센 말도 마구가 없으면 제멋대로 뜁니다.
                  강력한 AI도 적절한 제약이 없으면 엉뚱한 결과를 냅니다.
                </p>
              </div>
              <div className="p-5 rounded-xl flex flex-col gap-3"
                style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                <p className="font-mono text-xs" style={{ color: '#3b82f6' }}>비유</p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#475569' }}>
                  AI 모델이 <span style={{ color: '#0f172a', fontWeight: 600 }}>CPU</span>라면,
                  하네스는 그 CPU를 효율적으로 돌리는 <span style={{ color: '#0f172a', fontWeight: 600 }}>운영체제(OS)</span>입니다.
                  아무리 좋은 CPU도 OS 없이는 제대로 쓸 수 없습니다.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="p-5 rounded-xl" style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
              <p className="font-mono text-xs mb-3" style={{ color: '#94a3b8' }}>한 줄 정의</p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: '#475569' }}>
                AI 에이전트를 감싸고 있는{' '}
                <span style={{ color: '#0f172a', fontWeight: 600 }}>제약 조건, 도구, 피드백 루프, 문서화 등 전체 운영 환경</span>을
                설계하고 개선하는 기술입니다.
                단순히 "프롬프트를 잘 쓰는 것"이 아니라, AI가 일하는{' '}
                <span style={{ color: '#0f172a', fontWeight: 600 }}>사무실 전체를 설계</span>하는 개념입니다.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── 2. 탄생 배경 ── */}
        <div className="flex flex-col gap-8">
          <FadeIn><Label>탄생 배경 — 왜 2026년인가</Label></FadeIn>

          <FadeIn delay={0.05}>
            <p className="font-sans text-sm leading-relaxed" style={{ color: '#64748b' }}>
              이 기법 자체는 새로운 것이 아닙니다.{' '}
              <span style={{ color: '#0f172a', fontWeight: 600 }}>바이브 코딩(Vibe Coding) 시절부터</span> 개발자들이
              자연스럽게 사용하던 방식이었습니다. Cursor, Claude Code 같은 AI 에디터를 쓸 때
              프로젝트 루트에 규칙 파일을 두고 AI가 참고하게 하는 패턴이 커뮤니티에서 퍼져나갔습니다.
              2026년에 이름이 붙으면서 방법론으로 체계화되었습니다.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-0">
            {WHY_2026.map((item, i) => (
              <FadeIn key={item.number} delay={i * 0.07}>
                <div className="h-px w-full" style={{ background: '#e2e8f0' }} />
                <div className="grid grid-cols-[4rem_1fr] sm:grid-cols-[6rem_1fr] gap-6 py-8">
                  <span className="font-mono font-bold pt-1"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: 1, color: '#dbeafe' }}>
                    {item.number}
                  </span>
                  <div className="flex flex-col gap-2 pt-1">
                    <h3 className="font-sans font-bold text-base" style={{ color: '#0f172a' }}>{item.title}</h3>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: '#64748b' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
            <div className="h-px w-full" style={{ background: '#e2e8f0' }} />
          </div>
        </div>

        {/* ── 3. 4대 기둥 ── */}
        <div className="flex flex-col gap-8">
          <FadeIn><Label>4대 기둥</Label></FadeIn>

          <FadeIn delay={0.05}>
            <p className="font-sans text-sm leading-relaxed" style={{ color: '#64748b' }}>
              단순히 프롬프트를 잘 쓰는 것을 넘어, 에이전트가 일하는 환경 전체를 설계하는 4가지 요소입니다.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.tag} delay={i * 0.07}>
                <div className="h-full p-5 rounded-xl flex flex-col gap-3"
                  style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                    <span className="font-mono text-xs" style={{ color: p.color }}>{p.tag}</span>
                  </div>
                  <h3 className="font-sans font-bold text-base" style={{ color: '#0f172a' }}>{p.title}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#64748b' }}>
                    {p.desc}
                  </p>
                  <div className="mt-1 pt-3 flex flex-col gap-1" style={{ borderTop: '1px solid #f1f5f9' }}>
                    <span className="font-mono text-xs" style={{ color: p.color }}>실전 적용</span>
                    <p className="font-sans text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
                      {p.how}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── 실전 워크플로우 5단계 ── */}
        <div className="flex flex-col gap-8">
          <FadeIn><Label>실전 워크플로우 — 5단계 프로세스</Label></FadeIn>

          <FadeIn delay={0.05}>
            <p className="font-sans text-sm leading-relaxed" style={{ color: '#64748b' }}>
              인간의 개입을 최소화하고 AI가 스스로 완결성 있는 코드를 짜게 만드는 5단계 프로세스입니다.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-0">
            {WORKFLOW.map((w, i) => (
              <FadeIn key={w.step} delay={i * 0.07}>
                <div className="h-px w-full" style={{ background: '#e2e8f0' }} />
                <div className="grid grid-cols-[4rem_1fr] sm:grid-cols-[6rem_1fr] gap-6 py-8">
                  <div className="flex flex-col gap-1 pt-1">
                    <span className="font-mono font-bold"
                      style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', lineHeight: 1, color: '#dbeafe' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-sans font-bold text-base" style={{ color: '#0f172a' }}>{w.title}</h3>
                      <span className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{ background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe' }}>
                        {w.sub}
                      </span>
                    </div>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: '#64748b' }}>
                      {w.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
            <div className="h-px w-full" style={{ background: '#e2e8f0' }} />
          </div>
        </div>

        {/* ── 4. 5가지 원칙 ── */}
        <div className="flex flex-col gap-8">
          <FadeIn><Label>5가지 핵심 원칙</Label></FadeIn>

          <div className="flex flex-col gap-3">
            {PRINCIPLES.map((pr, i) => (
              <FadeIn key={pr.title} delay={i * 0.06}>
                <div className="flex gap-4 p-5 rounded-xl"
                  style={{ background: '#fff', border: '1px solid #e2e8f0' }}>
                  <span className="font-mono text-xs pt-0.5 shrink-0 w-5" style={{ color: '#cbd5e1' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-sans font-semibold text-sm" style={{ color: '#0f172a' }}>{pr.title}</span>
                    <span className="font-sans text-sm leading-relaxed" style={{ color: '#64748b' }}>
                      {pr.desc}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── 결론 ── */}
        <FadeIn>
          <div className="p-6 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <p className="font-mono text-xs mb-3" style={{ color: '#3b82f6' }}>결론</p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: '#475569' }}>
              하네스 엔지니어링은 AI에게{' '}
              <span style={{ color: '#0f172a', fontWeight: 600 }}>"무엇을 말할까(프롬프트)"</span>나{' '}
              <span style={{ color: '#0f172a', fontWeight: 600 }}>"무엇을 보여줄까(컨텍스트)"</span>를 넘어{' '}
              <span style={{ color: '#0f172a', fontWeight: 600 }}>"어떤 환경에서 일하게 할까"</span>를 고민하는
              고차원적인 엔지니어링 단계입니다.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}

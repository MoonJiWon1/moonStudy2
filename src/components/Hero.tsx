'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden grid-bg" style={{ background: 'var(--background)' }}>

      {/* 스캔라인 */}
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      {/* 블루 코너 글로우 */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />

      {/* 수직 눈금선 */}
      {[0.25, 0.5, 0.75].map((p) => (
        <div key={p} className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{ left: `${p * 100}%`, background: 'rgba(59,130,246,0.06)' }} />
      ))}

      <div className="relative z-20 max-w-4xl mx-auto px-6 pt-32 pb-24 flex flex-col gap-0">

        {/* LABEL */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#3b82f6' }} />
          <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(59,130,246,0.6)' }}>
            Harness Engineering — CLAUDE.md
          </span>
        </motion.div>

        {/* 타이틀 */}
        <div className="relative mb-2 overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black leading-none tracking-tighter select-none"
            style={{ fontSize: 'clamp(5rem, 16vw, 11rem)', color: '#0f172a' }}
          >
            하네스
          </motion.h1>
        </div>

        <div className="relative mb-2 overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black leading-none tracking-tighter select-none"
            style={{
              fontSize: 'clamp(5rem, 16vw, 11rem)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(59,130,246,0.5)',
            }}
          >
            엔지니어링
          </motion.h1>
        </div>

        {/* 구분선 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left my-8 h-px"
          style={{ background: 'linear-gradient(90deg, #3b82f6 0%, rgba(59,130,246,0.1) 60%, transparent 100%)' }}
        />

        {/* 하단 ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          <p className="font-sans text-base leading-relaxed max-w-sm" style={{ color: '#64748b' }}>
            CLAUDE.md 한 파일이 팀 전체의 컨텍스트.<br />
            대화가 바뀌어도 코드는 일관성을 유지한다.
          </p>

          <div className="flex flex-col gap-3 shrink-0">
            <a href="#how-it-works"
              className="group inline-flex items-center gap-3 px-6 py-3 font-sans font-semibold text-sm text-white transition-all duration-200 rounded-lg"
              style={{ background: '#3b82f6' }}>
              어떻게 동작하나
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/guide"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs transition-all duration-200 rounded-lg"
              style={{ border: '1px solid rgba(59,130,246,0.25)', color: '#3b82f6', background: 'rgba(59,130,246,0.04)' }}>
              CLAUDE.md 작성법 →
            </a>
          </div>
        </motion.div>

        {/* 터미널 프롬프트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 self-start font-mono text-sm px-5 py-3 rounded-lg"
          style={{ border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.7)', color: '#94a3b8' }}>
          <span style={{ color: '#3b82f6' }}>~/project</span>
          <span style={{ color: '#cbd5e1' }}> $ </span>
          claude
          <span className="ml-1 animate-pulse" style={{ color: '#3b82f6' }}>▊</span>
        </motion.div>
      </div>

      {/* 하단 페이드 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--background))' }} />
    </section>
  )
}

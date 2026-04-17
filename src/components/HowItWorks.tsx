'use client'

import { motion } from 'framer-motion'
import { STEPS } from '@/lib/constants'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative" style={{ background: '#fff' }}>

      {/* 섹션 헤더 */}
      <div className="max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#94a3b8' }}>
            02 — How It Works
          </span>
          <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#0f172a' }}
          >
            세 단계로 끝나는<br />
            <span style={{ color: '#3b82f6' }}>일관된 코드베이스</span>
          </motion.h2>
        </div>
      </div>

      {/* 스텝 리스트 */}
      <div className="max-w-4xl mx-auto flex flex-col gap-0">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="h-px w-full" style={{ background: '#e2e8f0' }} />

            <div className="group grid grid-cols-[4rem_1fr_auto] sm:grid-cols-[6rem_1fr_auto] items-start gap-6 py-10
              hover:bg-black/[0.015] transition-colors duration-300 rounded-xl px-4 -mx-4 cursor-default">

              {/* 넘버 */}
              <span
                className="font-mono font-bold pt-1"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  lineHeight: 1,
                  color: '#dbeafe',
                }}
              >
                {step.number}
              </span>

              {/* 내용 */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-sans font-bold text-xl" style={{ color: '#0f172a' }}>{step.title}</h3>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{ background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe' }}
                  >
                    {step.tag}
                  </span>
                </div>
                <p className="font-sans text-sm leading-relaxed max-w-lg" style={{ color: '#64748b' }}>
                  {step.desc}
                </p>
              </div>

              {/* 화살표 */}
              <div
                className="mt-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                style={{ border: '1px solid #bfdbfe', color: '#3b82f6' }}
              >
                →
              </div>
            </div>
          </motion.div>
        ))}

        <div className="h-px w-full" style={{ background: '#e2e8f0' }} />
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Check, Clock } from 'lucide-react'
import { useDraft, HistoryEntry } from '@/context/DraftContext'

// ── 탭 타입 ───────────────────────────────────────────────────
type Tab    = 'original' | 'edit' | 'diff' | 'history'
type Status = 'idle' | 'saving' | 'saved' | 'error'

// ── Diff 알고리즘 (LCS) ───────────────────────────────────────
export type DiffLine = { type: 'same' | 'add' | 'remove'; line: string }

function computeDiff(a: string[], b: string[]): DiffLine[] {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1])
  const result: DiffLine[] = []
  let i = m, j = n
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i-1] === b[j-1]) { result.unshift({ type: 'same',   line: a[i-1] }); i--; j-- }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.unshift({ type: 'add',    line: b[j-1] }); j-- }
    else { result.unshift({ type: 'remove', line: a[i-1] }); i-- }
  }
  return result
}

// ── Syntax highlighting ───────────────────────────────────────
type TT = 'h1'|'h2'|'kv'|'bullet'|'num'|'indent'|'blank'|'plain'
function classify(line: string): TT {
  if (line.startsWith('# '))  return 'h1'
  if (line.startsWith('## ')) return 'h2'
  if (line.startsWith('- ') && (line.includes(' : ') || line.includes(': '))) return 'kv'
  if (line.startsWith('- '))  return 'bullet'
  if (/^\d+\./.test(line))    return 'num'
  if (line.startsWith('    ') || line.startsWith('\t')) return 'indent'
  if (line.trim() === '')     return 'blank'
  return 'plain'
}
function Token({ line, tt }: { line: string; tt: TT }) {
  if (tt === 'blank')  return <span>&nbsp;</span>
  if (tt === 'h1')     return <span style={{ color: '#93c5fd', fontWeight: 700 }}>{line}</span>
  if (tt === 'h2')     return <span style={{ color: 'var(--blue)', fontWeight: 600 }}>{line}</span>
  if (tt === 'kv') {
    const sep = line.includes(' : ') ? ' : ' : ': '
    const [k, ...rest] = line.slice(2).split(sep)
    return <><span style={{ color: '#f472b6' }}>{'- '}</span><span style={{ color: '#34d399' }}>{k}</span><span style={{ color: 'rgba(255,255,255,0.2)' }}>{sep}</span><span style={{ color: '#fcd34d' }}>{rest.join(sep)}</span></>
  }
  if (tt === 'bullet') return <><span style={{ color: '#f472b6' }}>{'- '}</span><span style={{ color: 'rgba(255,255,255,0.55)' }}>{line.slice(2)}</span></>
  if (tt === 'num')    return <span style={{ color: '#f9a8d4' }}>{line}</span>
  if (tt === 'indent') return <span style={{ color: '#a78bfa' }}>{line}</span>
  return <span style={{ color: 'rgba(255,255,255,0.35)' }}>{line}</span>
}

// ── 코드 뷰 ──────────────────────────────────────────────────
function CodeView({ lines }: { lines: string[] }) {
  return (
    <div className="flex overflow-auto" style={{ background: '#0d0d0d', maxHeight: '480px' }}>
      <div className="select-none py-4 shrink-0" style={{ borderRight: '1px solid rgba(255,255,255,0.04)' }}>
        {lines.map((_, i) => (
          <div key={i} className="font-mono text-xs leading-6 text-right px-4" style={{ color: 'rgba(255,255,255,0.12)', minWidth: '3rem' }}>
            {i + 1}
          </div>
        ))}
      </div>
      <div className="py-4 flex-1 overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i} className="font-mono text-xs leading-6 px-5 whitespace-pre hover:bg-white/[0.02] transition-colors">
            <Token line={line} tt={classify(line)} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Diff 뷰 ───────────────────────────────────────────────────
function DiffView({ diffLines, labelA = '원본', labelB = '수정' }: { diffLines: DiffLine[]; labelA?: string; labelB?: string }) {
  const adds = diffLines.filter(d => d.type === 'add').length
  const rems = diffLines.filter(d => d.type === 'remove').length
  let ln = 0, rn = 0

  return (
    <div className="overflow-auto" style={{ background: '#0d0d0d', maxHeight: '480px' }}>
      {/* 헤더 */}
      <div className="flex items-center gap-4 px-5 py-2 font-mono text-xs sticky top-0 z-10"
        style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>{labelA} → {labelB}</span>
        <span style={{ color: '#4ade80' }}>+{adds}</span>
        <span style={{ color: '#f87171' }}>−{rems}</span>
      </div>
      {diffLines.map((d, i) => {
        let leftNo = '', rightNo = ''
        if (d.type === 'remove') { ln++; leftNo = String(ln) }
        else if (d.type === 'add') { rn++; rightNo = String(rn) }
        else { ln++; rn++; leftNo = rightNo = String(ln) }

        const bg      = d.type === 'add' ? 'rgba(74,222,128,0.07)' : d.type === 'remove' ? 'rgba(248,113,113,0.07)' : 'transparent'
        const marker  = d.type === 'add' ? '+' : d.type === 'remove' ? '−' : ' '
        const mColor  = d.type === 'add' ? '#4ade80' : d.type === 'remove' ? '#f87171' : 'rgba(255,255,255,0.08)'
        const tColor  = d.type === 'add' ? 'rgba(74,222,128,0.85)' : d.type === 'remove' ? 'rgba(248,113,113,0.7)' : 'rgba(255,255,255,0.3)'

        return (
          <div key={i} className="flex font-mono text-xs leading-6"
            style={{ background: bg, borderLeft: `2px solid ${d.type !== 'same' ? mColor : 'transparent'}` }}>
            <span className="select-none text-right px-3 shrink-0 w-12" style={{ color: 'rgba(255,255,255,0.1)' }}>{leftNo}</span>
            <span className="select-none text-right px-3 shrink-0 w-12" style={{ color: 'rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.04)' }}>{rightNo}</span>
            <span className="px-2 shrink-0 select-none" style={{ color: mColor }}>{marker}</span>
            <span className="flex-1 px-2 whitespace-pre" style={{ color: tColor }}>{d.line || ' '}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── 변경 이력 뷰 ──────────────────────────────────────────────
function HistoryView({ history }: { history: HistoryEntry[] }) {
  const [selected, setSelected] = useState<number | null>(null)

  if (history.length === 0) {
    return (
      <div className="flex items-center justify-center font-mono text-xs py-20"
        style={{ background: '#0d0d0d', color: 'rgba(255,255,255,0.2)' }}>
        아직 저장된 이력이 없습니다
      </div>
    )
  }

  const sel = selected !== null ? history[selected] : null
  const prev = selected !== null && selected < history.length - 1 ? history[selected + 1] : null
  const diff = sel && prev ? computeDiff(prev.content.split('\n'), sel.content.split('\n')) : null

  return (
    <div className="flex" style={{ background: '#0d0d0d', maxHeight: '480px' }}>
      {/* 왼쪽: 이력 목록 */}
      <div className="w-44 shrink-0 overflow-y-auto" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        {history.map((entry, i) => (
          <button key={entry.id} onClick={() => setSelected(i)}
            className="w-full text-left px-4 py-3 transition-colors"
            style={{
              background: selected === i ? 'rgba(96,165,250,0.08)' : 'transparent',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              borderLeft: selected === i ? '2px solid var(--blue)' : '2px solid transparent',
            }}>
            <div className="font-mono text-xs font-semibold mb-0.5" style={{ color: selected === i ? 'var(--blue)' : '#fff' }}>
              {entry.label}
            </div>
            <div className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {entry.savedAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </button>
        ))}
      </div>

      {/* 오른쪽: diff 또는 전체 내용 */}
      <div className="flex-1 overflow-auto">
        {!sel && (
          <div className="flex items-center justify-center h-full font-mono text-xs"
            style={{ color: 'rgba(255,255,255,0.2)' }}>
            이력을 선택하세요
          </div>
        )}
        {sel && diff && (
          <DiffView diffLines={diff} labelA={prev!.label} labelB={sel.label} />
        )}
        {sel && !diff && (
          <CodeView lines={sel.content.split('\n')} />
        )}
      </div>
    </div>
  )
}

// ── 탭 버튼 ──────────────────────────────────────────────────
function TabBtn({ active, color = 'var(--blue)', onClick, badge, children }: {
  active: boolean; color?: string; onClick: () => void; badge?: string | number; children: React.ReactNode
}) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 px-4 font-mono text-xs transition-all h-full"
      style={{
        borderBottom: active ? `2px solid ${color}` : '2px solid transparent',
        color: active ? '#fff' : 'rgba(255,255,255,0.3)',
        background: active ? '#0d0d0d' : 'transparent',
      }}>
      {children}
      {badge !== undefined && (
        <span className="px-1.5 rounded font-semibold"
          style={{ background: active ? color : 'rgba(255,255,255,0.08)', color: active ? '#000' : 'rgba(255,255,255,0.4)', fontSize: '10px' }}>
          {badge}
        </span>
      )}
    </button>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export function ClaudemdViewer() {
  const { saved, draft, setSaved, setDraft, commit, reset, changed, previewMode, history } = useDraft()

  const [tab, setTab]     = useState<Tab>('original')
  const [status, setStatus] = useState<Status>('idle')

  // 파일에서 초기 내용 로드
  useEffect(() => {
    fetch('/api/claude-md')
      .then(r => r.json())
      .then(({ content }) => { setSaved(content); setDraft(content) })
  }, [setSaved, setDraft])

  // 미리보기 모드 전환 시 탭 조정
  useEffect(() => {
    if (previewMode) setTab('edit')
    else setTab('original')
  }, [previewMode])

  const run = useCallback(async () => {
    setStatus('saving')
    try {
      await fetch('/api/claude-md', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: draft }),
      })
      // commit이 saved를 업데이트 → DraftContext useEffect → CSS 변수 즉시 적용
      commit(draft)
      setStatus('saved')
      setTab('original')
      setTimeout(() => setStatus('idle'), 2000)
    } catch { setStatus('error') }
  }, [draft, commit])

  const diffLines  = changed ? computeDiff(saved.split('\n'), draft.split('\n')) : []
  const diffCount  = diffLines.filter(d => d.type !== 'same').length
  const displayLines = (previewMode ? draft : saved).split('\n')

  return (
    <section id="claude-md" className="py-24 px-6 relative" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(96,165,250,0.5)' }}>
            03 — CLAUDE.md
          </span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h2 initial={{ y: '100%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#fff' }}>
            이 페이지를 만든<br />
            <span style={{ color: previewMode ? '#f472b6' : 'var(--blue)' }}>
              {previewMode ? '수정 중인 파일' : '단 하나의 파일'}
            </span>
          </motion.h2>
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-sans text-sm mb-10" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {previewMode
            ? '미리보기 모드 — 상단 네비바에서 원본과 비교해보세요.'
            : '수정 탭에서 내용을 바꾸고 실행하면 파일에 반영됩니다.'}
        </motion.p>

        {/* ── IDE 창 ── */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl overflow-hidden"
          style={{
            border: `1px solid ${previewMode ? 'rgba(244,114,182,0.2)' : 'rgba(96,165,250,0.15)'}`,
            boxShadow: previewMode
              ? '0 0 80px rgba(244,114,182,0.05)'
              : '0 40px 80px rgba(0,0,0,0.5), 0 0 80px rgba(96,165,250,0.04)',
          }}>

          {/* ── 네비바 ── */}
          <div className="flex items-stretch justify-between"
            style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)', height: '44px' }}>
            <div className="flex items-stretch">
              <div className="flex items-center gap-1.5 px-4 shrink-0">
                <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <TabBtn active={tab === 'original'} color="var(--blue)" onClick={() => setTab('original')}>원본</TabBtn>
              <TabBtn active={tab === 'edit'}     color="#f472b6" onClick={() => { setTab('edit'); setStatus('idle') }}
                badge={changed ? '●' : undefined}>수정</TabBtn>
              <TabBtn active={tab === 'diff'}     color="#facc15" onClick={() => setTab('diff')}
                badge={changed ? diffCount : undefined}>변경</TabBtn>
              <TabBtn active={tab === 'history'} color="#a78bfa"
                onClick={() => setTab('history')}
                badge={history.length || undefined}>
                <Clock size={11} />이력
              </TabBtn>
            </div>

            {/* 실행/되돌리기 */}
            <div className="flex items-center gap-2 pr-4">
              {changed && (
                <button onClick={reset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs"
                  style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <RotateCcw size={11} /> 되돌리기
                </button>
              )}
              <button onClick={run} disabled={status === 'saving' || !changed}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded font-mono text-xs font-semibold transition-all disabled:opacity-30"
                style={{ background: status === 'saved' ? '#22c55e' : 'var(--blue)', color: '#000' }}>
                {status === 'saving' && <span className="animate-spin">⟳</span>}
                {status === 'saved'  && <><Check size={11} /> 저장됨</>}
                {status === 'error'  && '오류'}
                {status === 'idle'   && <><Play size={11} /> 실행</>}
              </button>
            </div>
          </div>

          {/* ── 콘텐츠 ── */}
          {tab === 'original' && <CodeView lines={displayLines} />}
          {tab === 'edit' && (
            <textarea value={draft} onChange={e => { setDraft(e.target.value); setStatus('idle') }}
              spellCheck={false}
              className="w-full font-mono text-xs leading-6 p-4 resize-none outline-none"
              style={{ background: '#0d0d0d', color: 'rgba(255,255,255,0.7)', height: '480px', caretColor: '#f472b6' }}
            />
          )}
          {tab === 'diff' && (
            changed
              ? <DiffView diffLines={diffLines} />
              : <div className="flex items-center justify-center font-mono text-xs py-20"
                  style={{ background: '#0d0d0d', color: 'rgba(255,255,255,0.2)' }}>변경사항 없음</div>
          )}
          {tab === 'history' && <HistoryView history={history} />}

          {/* ── 상태바 ── */}
          <div className="flex items-center justify-between px-4 py-1.5"
            style={{
              background: tab === 'edit' ? '#f472b6' : tab === 'diff' ? '#facc15' : tab === 'history' ? '#a78bfa' : 'var(--blue)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
            <div className="flex items-center gap-3 font-mono text-xs font-medium text-black">
              <span>⎇ main</span><span>·</span>
              <span>src/data/claude.md</span>
              {changed && <span>● 수정됨</span>}
              {previewMode && <span>👁 미리보기</span>}
            </div>
            <div className="font-mono text-xs text-black/60">{displayLines.length}L · UTF-8</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'
import { parseDesignConfig, DesignConfig, DEFAULT_CONFIG } from '@/lib/parseDesign'

export type HistoryEntry = {
  id:      number
  savedAt: Date
  content: string
  label:   string
}

type DraftContextType = {
  saved:          string
  draft:          string
  setSaved:       (v: string) => void
  setDraft:       (v: string) => void
  commit:         (newContent: string) => void
  reset:          () => void
  changed:        boolean
  previewMode:    boolean
  setPreviewMode: (v: boolean) => void
  history:        HistoryEntry[]
  designConfig:   DesignConfig
}

const DraftContext = createContext<DraftContextType | null>(null)

export function DraftProvider({ children }: { children: ReactNode }) {
  const [saved,        setSaved]        = useState('')
  const [draft,        setDraft]        = useState('')
  const [previewMode,  setPreviewMode]  = useState(false)
  const [history,      setHistory]      = useState<HistoryEntry[]>([])
  const [designConfig, setDesignConfig] = useState<DesignConfig>(DEFAULT_CONFIG)

  // 저장된 내용이 바뀔 때마다 디자인 설정 파싱 + CSS 변수 적용
  useEffect(() => {
    if (!saved) return
    const config = parseDesignConfig(saved)
    setDesignConfig(config)

    // 실제 CSS 변수를 :root에 적용
    const root = document.documentElement
    root.style.setProperty('--background', config.bg)
    root.style.setProperty('--blue',       config.accent)
    root.style.setProperty('--blue-dim',   `${config.accent}1e`)
  }, [saved])

  const commit = useCallback((newContent: string) => {
    setHistory(prev => [
      { id: prev.length + 1, savedAt: new Date(), content: newContent, label: `v${prev.length + 1}` },
      ...prev,
    ])
    setSaved(newContent)
  }, [])

  const reset = useCallback(() => setDraft(saved), [saved])

  return (
    <DraftContext.Provider value={{
      saved, draft, setSaved, setDraft, commit, reset,
      changed: draft !== saved,
      previewMode, setPreviewMode,
      history, designConfig,
    }}>
      {children}
    </DraftContext.Provider>
  )
}

export function useDraft() {
  const ctx = useContext(DraftContext)
  if (!ctx) throw new Error('useDraft must be used inside DraftProvider')
  return ctx
}

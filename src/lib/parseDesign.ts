// CLAUDE.md의 ## 디자인 가이드 섹션에서 CSS 변수를 추출한다
export type DesignConfig = {
  bg:     string  // 배경색
  accent: string  // 포인트색
}

export const DEFAULT_CONFIG: DesignConfig = {
  bg:     '#0a0a0a',
  accent: '#60a5fa',
}

export function parseDesignConfig(content: string): DesignConfig {
  const config = { ...DEFAULT_CONFIG }
  const lines = content.split('\n')
  let inSection = false

  for (const line of lines) {
    if (line.startsWith('## 디자인 가이드')) { inSection = true; continue }
    if (line.startsWith('## ') && inSection) break

    if (inSection && line.includes('색상')) {
      // hex 값 전부 추출 (#xxx 또는 #xxxxxx)
      const hexes = line.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g)
      if (hexes?.[0]) config.bg     = hexes[0]
      if (hexes?.[1]) config.accent = hexes[1]
    }
  }

  return config
}

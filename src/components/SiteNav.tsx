'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SiteNav() {
  const pathname = usePathname()
  const isMain = pathname === '/'

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 h-12"
      style={{
        background: 'rgba(248,250,252,0.85)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* 로고 */}
      <Link href="/" className="font-mono text-xs tracking-widest" style={{ color: '#3b82f6' }}>
        harness
      </Link>

      {/* 페이지 메뉴 */}
      <div className="flex items-stretch h-full gap-1">
        <Link
          href="/"
          className="flex items-center px-4 font-mono text-xs transition-all"
          style={{
            borderBottom: isMain ? '2px solid #3b82f6' : '2px solid transparent',
            color: isMain ? '#0f172a' : '#94a3b8',
          }}
        >
          하네스 엔지니어링
        </Link>

        <Link
          href="/guide"
          className="flex items-center px-4 font-mono text-xs transition-all"
          style={{
            borderBottom: pathname === '/guide' ? '2px solid #3b82f6' : '2px solid transparent',
            color: pathname === '/guide' ? '#0f172a' : '#94a3b8',
          }}
        >
          CLAUDE.md 작성법
        </Link>
      </div>

      <div />
    </nav>
  )
}

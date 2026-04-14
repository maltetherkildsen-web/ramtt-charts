'use client'

import { useState } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'

interface DocCodeProps {
  children: string
  language?: string
}

export function DocCode({ children }: DocCodeProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative group">
      <pre className={cn(
        'bg-[var(--n1100)] text-[var(--n50)]',
        'rounded-[8px] p-4',
        FONT.body, 'text-[13px] font-[400] tabular-nums',
        'overflow-x-auto whitespace-pre',
      )}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className={cn(
          'absolute top-2.5 right-2.5',
          'px-2 py-1 rounded-[4px]',
          'text-[11px] font-[450] text-[var(--n600)]',
          'opacity-0 group-hover:opacity-100',
          'transition-opacity duration-150',
          'hover:text-[var(--n400)]',
        )}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}

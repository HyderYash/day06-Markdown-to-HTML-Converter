'use client'

import { useEffect, useRef } from 'react'
import { sanitizeHtml, SanitizeOptions } from '@/lib/sanitize'
import { markdownToHtml } from '@/lib/markdown'

interface PreviewProps {
  markdown: string
  showRawHtml: boolean
  sanitizeOptions: SanitizeOptions
}

export default function Preview({
  markdown,
  showRawHtml,
  sanitizeOptions,
}: PreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const rawHtmlRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (!previewRef.current) return

    const html = markdownToHtml(markdown)
    const sanitized = sanitizeHtml(html, sanitizeOptions)

    if (showRawHtml) {
      if (rawHtmlRef.current) {
        rawHtmlRef.current.textContent = sanitized
      }
    } else {
      previewRef.current.innerHTML = sanitized

      // Apply syntax highlighting to code blocks
      if (typeof window !== 'undefined' && (window as any).hljs) {
        previewRef.current.querySelectorAll('pre code').forEach((block) => {
          ;(window as any).hljs.highlightElement(block)
        })
      }
    }
  }, [markdown, showRawHtml, sanitizeOptions])

  useEffect(() => {
    // Load highlight.js
    if (typeof window !== 'undefined' && !(window as any).hljs) {
      const script = document.createElement('script')
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js'
      script.onload = () => {
        if (previewRef.current) {
          previewRef.current.querySelectorAll('pre code').forEach((block) => {
            ;(window as any).hljs.highlightElement(block)
          })
        }
      }
      document.head.appendChild(script)

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github.min.css'
      document.head.appendChild(link)
    }
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-light-border/30 dark:border-dark-border/30 bg-gradient-to-r from-light-surface/50 to-transparent dark:from-dark-surface/50">
        <div className="flex items-center justify-between gap-3 min-w-0">
          <h2 className="text-xs sm:text-sm font-bold text-light-text dark:text-dark-text whitespace-nowrap truncate">
            {showRawHtml ? 'Raw HTML' : 'Rendered HTML'}
          </h2>
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-500/10 dark:bg-green-500/20 rounded-full border border-green-500/20 flex-shrink-0">
            <span className="text-[10px] sm:text-xs font-medium text-green-600 dark:text-green-400 whitespace-nowrap">Sanitized</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8 bg-gradient-to-br from-light-background/50 to-transparent dark:from-dark-background/50">
        {showRawHtml ? (
          <pre
            ref={rawHtmlRef}
            className="text-xs font-mono text-light-text dark:text-dark-text whitespace-pre-wrap break-words"
          />
        ) : (
          <div
            ref={previewRef}
            className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-p:text-light-text dark:prose-p:text-dark-text prose-a:text-light-accent dark:prose-a:text-dark-accent prose-code:text-light-text dark:prose-code:text-dark-text prose-pre:bg-light-surface dark:prose-pre:bg-dark-surface"
          />
        )}
      </div>
    </div>
  )
}


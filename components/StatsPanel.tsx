'use client'

import { countWords, countCharacters, countLines, estimateReadingTime } from '@/lib/utils'

interface StatsPanelProps {
  markdown: string
  isOpen: boolean
  onClose: () => void
}

export default function StatsPanel({ markdown, isOpen, onClose }: StatsPanelProps) {
  if (!isOpen) return null

  const wordCount = countWords(markdown)
  const charCount = countCharacters(markdown)
  const lineCount = countLines(markdown)
  const readingTime = estimateReadingTime(wordCount)

  const stats = [
    {
      label: 'Words',
      value: wordCount.toLocaleString(),
      icon: '📝',
      color: 'text-blue-500',
    },
    {
      label: 'Characters',
      value: charCount.toLocaleString(),
      icon: '🔤',
      color: 'text-purple-500',
    },
    {
      label: 'Lines',
      value: lineCount.toLocaleString(),
      icon: '📄',
      color: 'text-green-500',
    },
    {
      label: 'Reading Time',
      value: `${readingTime} min`,
      icon: '⏱️',
      color: 'text-orange-500',
    },
  ]

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass-strong rounded-apple-lg premium-shadow-lg border border-light-border/30 dark:border-dark-border/30 m-4"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-1">
                Statistics
              </h2>
              <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                Content analysis and metrics
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-light-background/60 dark:hover:bg-dark-background/60 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text"
              aria-label="Close stats"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-light-background/50 dark:bg-dark-background/50 border border-light-border/30 dark:border-dark-border/30 hover:border-light-border/50 dark:hover:border-dark-border/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className={`text-sm font-semibold ${stat.color}`}>{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-light-text dark:text-dark-text">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@/components/Editor'
import Preview from '@/components/Preview'
import SettingsPanel from '@/components/SettingsPanel'
import ExportModal from '@/components/ExportModal'
import Footer from '@/components/Footer'
import StatsPanel from '@/components/StatsPanel'
import TemplatesPanel from '@/components/TemplatesPanel'
import ShortcutsPanel from '@/components/ShortcutsPanel'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import { useLocalStorage, useConversionHistory } from '@/lib/useLocalStorage'
import { registerServiceWorker } from '@/app/service-worker'
import { SanitizeOptions } from '@/lib/sanitize'
import { TemplateOptions } from '@/lib/templates'
import { markdownToHtml } from '@/lib/markdown'
import { generateTableOfContents, countWords, countCharacters, countLines, estimateReadingTime } from '@/lib/utils'

const defaultMarkdown = `# Welcome to Markdown → HTML Converter

This is a **beautiful** and *secure* Markdown to HTML converter.

## Features

- Live preview
- Safe HTML sanitization
- Export options
- Local storage persistence

## Code Example

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

## Lists

- Item 1
- Item 2
- Item 3

## Links

Visit [the project](https://example.com) for more info.

---

*Enjoy converting your Markdown!*`

export default function Home() {
  const [markdown, setMarkdown] = useLocalStorage('md-to-html-content', defaultMarkdown)
  const [showRawHtml, setShowRawHtml] = useState(false)
  const [isSplitView, setIsSplitView] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const [sanitizeOptions, setSanitizeOptions] = useState<SanitizeOptions>({
    allowIframes: false,
    allowScripts: false,
    allowStyles: false,
  })
  
  const [templateOptions, setTemplateOptions] = useState<TemplateOptions>({
    title: 'Document',
    description: '',
    themeColor: '#007AFF',
    includeSyntaxHighlighting: true,
    syntaxTheme: 'light',
    minify: false,
  })

  const { addToHistory } = useConversionHistory()

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(isDark)
      document.documentElement.classList.toggle('dark', isDark)
      
      // Register service worker for PWA
      registerServiceWorker()
    }
  }, [])

  useEffect(() => {
    // Debounce history updates
    const timer = setTimeout(() => {
      if (markdown && markdown !== defaultMarkdown) {
        const html = markdownToHtml(markdown)
        addToHistory(markdown, html)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [markdown, addToHistory])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  const handleInsertTOC = () => {
    const toc = generateTableOfContents(markdown)
    if (toc) {
      // Insert at the beginning, replacing any existing TOC
      const currentMarkdown = markdown
      // Match TOC that starts at the beginning of the document
      const tocRegex = /^## Table of Contents[\s\S]*?(?=\n---\n\n|\n## |\n# |$)/m
      if (tocRegex.test(currentMarkdown)) {
        // Replace existing TOC
        setMarkdown(currentMarkdown.replace(tocRegex, toc.replace(/\n---\n\n$/, '')))
      } else {
        // Insert new TOC at the beginning
        setMarkdown(toc + currentMarkdown)
      }
    } else {
      // No headings found, show message
      alert('No headings found in your markdown. Add headings (## Heading) to generate a table of contents.')
    }
  }

  const handleSelectTemplate = (content: string) => {
    setMarkdown(content)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Keyboard shortcuts - global shortcuts that work everywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we're in a modal or input field
      const target = e.target as HTMLElement
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
      const isModal = target.closest('[role="dialog"]') || target.closest('.glass-strong')
      
      // Global shortcuts that work everywhere (except in modals)
      if (!isModal) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault()
          setShowShortcuts(true)
          return
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
          e.preventDefault()
          setShowExport(true)
          return
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
          e.preventDefault()
          // Auto-saved - show brief feedback
          const toast = document.createElement('div')
          toast.textContent = '✓ Auto-saved'
          toast.className = 'fixed top-20 right-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg z-50 transition-all font-medium'
          document.body.appendChild(toast)
          setTimeout(() => {
            toast.style.opacity = '0'
            toast.style.transform = 'translateY(-10px)'
            setTimeout(() => toast.remove(), 300)
          }, 2000)
          return
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 't') {
          e.preventDefault()
          setShowTemplates(true)
          return
        }
      }
      
      // F11 for fullscreen (works everywhere)
      if (e.key === 'F11') {
        e.preventDefault()
        if (!isFullscreen) {
          document.documentElement.requestFullscreen?.()
        } else {
          document.exitFullscreen?.()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  // Only calculate stats on client to avoid hydration mismatch
  const wordCount = isMounted ? countWords(markdown) : 0
  const charCount = isMounted ? countCharacters(markdown) : 0
  const readingTime = isMounted ? estimateReadingTime(wordCount) : 0

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-light-background via-light-background to-[#F0F0F2] dark:from-dark-background dark:via-[#0A0A0A] dark:to-[#1A1A1A]">
      <header className="glass border-b border-light-border/50 dark:border-dark-border/50 sticky top-0 z-40 premium-shadow backdrop-blur-xl">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-shrink">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-light-accent via-[#5A57D6] to-[#6A67E6] dark:from-dark-accent dark:via-[#6A67E6] dark:to-[#7A77F6] flex items-center justify-center premium-shadow flex-shrink-0 shadow-lg shadow-light-accent/20 dark:shadow-dark-accent/20">
                  <span className="text-white text-sm sm:text-base font-bold">M</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-light-surface dark:border-dark-surface animate-pulse"></div>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-light-text via-light-accent to-[#5A57D6] dark:from-dark-text dark:via-dark-accent dark:to-[#6A67E6] bg-clip-text text-transparent whitespace-nowrap truncate">
                  Markdown → HTML
                </h1>
                <span className="hidden sm:block text-xs text-light-text/60 dark:text-dark-text/60 font-medium whitespace-nowrap mt-0.5">
                  Clean, safe, and beautiful
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {isMounted && (
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-light-background/50 dark:bg-dark-background/50 border border-light-border/30 dark:border-dark-border/30">
                  <span className="text-xs text-light-text/60 dark:text-dark-text/60 font-medium">
                    {wordCount.toLocaleString()} words
                  </span>
                  <span className="w-1 h-1 rounded-full bg-light-text/30 dark:bg-dark-text/30"></span>
                  <span className="text-xs text-light-text/60 dark:text-dark-text/60 font-medium">
                    {readingTime} min
                  </span>
                </div>
              )}
              <button
                onClick={() => setShowTemplates(true)}
                className="group relative px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-light-text/80 dark:text-dark-text/80 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/70 dark:hover:bg-dark-background/70 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-light-border/30 dark:border-dark-border/30 hover:border-light-border/50 dark:hover:border-dark-border/50 whitespace-nowrap backdrop-blur-sm"
                aria-label="Templates"
                title="Templates (Ctrl+T)"
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">📋</span>
                  <span className="hidden xl:inline text-xs sm:text-sm font-semibold">Templates</span>
                </span>
              </button>
              <button
                onClick={() => setShowStats(true)}
                className="group relative px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-light-text/80 dark:text-dark-text/80 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/70 dark:hover:bg-dark-background/70 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-light-border/30 dark:border-dark-border/30 hover:border-light-border/50 dark:hover:border-dark-border/50 whitespace-nowrap backdrop-blur-sm"
                aria-label="Statistics"
                title="Statistics"
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">📊</span>
                  <span className="hidden xl:inline text-xs sm:text-sm font-semibold">Stats</span>
                </span>
              </button>
              <button
                onClick={() => setShowShortcuts(true)}
                className="group relative px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-light-text/80 dark:text-dark-text/80 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/70 dark:hover:bg-dark-background/70 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-light-border/30 dark:border-dark-border/30 hover:border-light-border/50 dark:hover:border-dark-border/50 whitespace-nowrap backdrop-blur-sm"
                aria-label="Keyboard Shortcuts"
                title="Shortcuts (Ctrl+K)"
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">⌨️</span>
                  <span className="hidden xl:inline text-xs sm:text-sm font-semibold">Shortcuts</span>
                </span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="group relative px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-light-text/80 dark:text-dark-text/80 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/70 dark:hover:bg-dark-background/70 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-light-border/30 dark:border-dark-border/30 hover:border-light-border/50 dark:hover:border-dark-border/50 whitespace-nowrap backdrop-blur-sm"
                aria-label="Settings"
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">⚙️</span>
                  <span className="hidden md:inline text-xs sm:text-sm font-semibold">Settings</span>
                </span>
              </button>
              <button
                onClick={() => setShowExport(true)}
                className="relative px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-bold bg-gradient-to-r from-light-accent via-[#5A57D6] to-[#6A67E6] dark:from-dark-accent dark:via-[#6A67E6] dark:to-[#7A77F6] text-white rounded-xl hover:shadow-xl hover:shadow-light-accent/30 dark:hover:shadow-dark-accent/30 transition-all duration-200 hover:scale-105 active:scale-95 premium-shadow whitespace-nowrap overflow-hidden group"
                aria-label="Export"
                title="Export (Ctrl+E)"
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-base">📤</span>
                  <span className="text-xs sm:text-sm">Export</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              <button
                onClick={toggleDarkMode}
                className="group relative px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-light-text/80 dark:text-dark-text/80 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/70 dark:hover:bg-dark-background/70 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-light-border/30 dark:border-dark-border/30 hover:border-light-border/50 dark:hover:border-dark-border/50 flex-shrink-0 backdrop-blur-sm"
                aria-label="Toggle dark mode"
              >
                <span className="text-lg sm:text-xl transition-transform duration-300 group-hover:rotate-180">
                  {darkMode ? '☀️' : '🌙'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1920px] mx-auto">
          <div className="h-full flex flex-col lg:flex-row gap-6 p-6">
            <AnimatePresence mode="wait">
              {isSplitView ? (
                <motion.div
                  key="split"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="flex-1 h-full min-h-[400px]"
                >
                  <Editor
                    value={markdown}
                    onChange={setMarkdown}
                    darkMode={darkMode}
                    fontSize={fontSize}
                    onInsertTOC={handleInsertTOC}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className={`${isSplitView ? 'flex-1' : 'flex-1'} h-full min-h-[400px]`}
              >
                <div className="h-full glass-strong rounded-apple-lg overflow-hidden premium-shadow-lg border border-light-border/30 dark:border-dark-border/30">
                  <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-light-border/30 dark:border-dark-border/30 bg-gradient-to-r from-light-surface/50 to-transparent dark:from-dark-surface/50 flex items-center justify-between gap-3 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <button
                        onClick={() => setIsSplitView(!isSplitView)}
                        className="group px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/50 dark:hover:bg-dark-background/50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                        aria-label="Toggle split view"
                      >
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          <span className="text-sm sm:text-base transition-transform group-hover:-translate-x-0.5">
                            {isSplitView ? '←' : '→'}
                          </span>
                          <span className="hidden md:inline text-xs">View</span>
                        </span>
                      </button>
                      <button
                        onClick={handleInsertTOC}
                        className="group px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/50 dark:hover:bg-dark-background/50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                        aria-label="Insert Table of Contents"
                        title="Insert TOC"
                      >
                        <span className="flex items-center gap-1 sm:gap-1.5">
                          <span className="text-sm sm:text-base">📑</span>
                          <span className="hidden lg:inline text-xs">TOC</span>
                        </span>
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="group px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/50 dark:hover:bg-dark-background/50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                        aria-label="Toggle Fullscreen"
                        title="Fullscreen (F11)"
                      >
                        <span className="text-sm sm:text-base">{isFullscreen ? '⤓' : '⤢'}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                        className="px-2 py-1 text-xs font-medium text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/50 dark:hover:bg-dark-background/50 rounded transition-all"
                        aria-label="Decrease font size"
                      >
                        A−
                      </button>
                      <span className="text-xs text-light-text/60 dark:text-dark-text/60 min-w-[2rem] text-center">
                        {fontSize}px
                      </span>
                      <button
                        onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                        className="px-2 py-1 text-xs font-medium text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/50 dark:hover:bg-dark-background/50 rounded transition-all"
                        aria-label="Increase font size"
                      >
                        A+
                      </button>
                      <button
                        onClick={() => setShowRawHtml(!showRawHtml)}
                        className="group px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/50 dark:hover:bg-dark-background/50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 sm:gap-2 flex-shrink-0 whitespace-nowrap"
                        aria-label="Toggle raw HTML"
                      >
                        <span className="text-sm sm:text-base">{showRawHtml ? '👁️' : '📄'}</span>
                        <span className="hidden md:inline text-xs">{showRawHtml ? 'Rendered' : 'Raw HTML'}</span>
                      </button>
                    </div>
                  </div>
                  <Preview
                    markdown={markdown}
                    showRawHtml={showRawHtml}
                    sanitizeOptions={sanitizeOptions}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        sanitizeOptions={sanitizeOptions}
        onSanitizeOptionsChange={setSanitizeOptions}
        templateOptions={templateOptions}
        onTemplateOptionsChange={setTemplateOptions}
      />

      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        markdown={markdown}
        templateOptions={templateOptions}
        sanitizeOptions={sanitizeOptions}
      />

      <StatsPanel
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        markdown={markdown}
      />

      <TemplatesPanel
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <ShortcutsPanel
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      <Footer />

      <PWAInstallPrompt />
    </div>
  )
}


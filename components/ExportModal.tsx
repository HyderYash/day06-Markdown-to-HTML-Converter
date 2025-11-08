'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { templates, TemplateOptions, getTemplate } from '@/lib/templates'
import { markdownToHtml } from '@/lib/markdown'
import { sanitizeHtml, minifyHtml, SanitizeOptions } from '@/lib/sanitize'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  markdown: string
  templateOptions: TemplateOptions
  sanitizeOptions?: SanitizeOptions
}

export default function ExportModal({
  isOpen,
  onClose,
  markdown,
  templateOptions,
  sanitizeOptions = { allowIframes: false, allowScripts: false },
}: ExportModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('minimal')
  const [exportOptions, setExportOptions] = useState(templateOptions)

  if (!isOpen) return null

  const handleCopyHtml = () => {
    const html = markdownToHtml(markdown)
    const sanitized = sanitizeHtml(html, sanitizeOptions)
    const template = getTemplate(selectedTemplate)
    const fullHtml = template
      ? template.template(sanitized, exportOptions)
      : sanitized
    const finalHtml = exportOptions.minify ? minifyHtml(fullHtml) : fullHtml

    navigator.clipboard.writeText(finalHtml)
    alert('HTML copied to clipboard!')
  }

  const handleDownloadHtml = () => {
    const html = markdownToHtml(markdown)
    const sanitized = sanitizeHtml(html, sanitizeOptions)
    const template = getTemplate(selectedTemplate)
    const fullHtml = template
      ? template.template(sanitized, exportOptions)
      : sanitized
    const finalHtml = exportOptions.minify ? minifyHtml(fullHtml) : fullHtml

    const blob = new Blob([finalHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportOptions.title || 'document'}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportOptions.title || 'document'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-2xl max-h-[90vh] overflow-auto glass-strong rounded-apple-lg premium-shadow-lg border border-light-border/30 dark:border-dark-border/30 m-4"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-1">
                Export
              </h2>
              <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                Download or copy your converted HTML
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-light-background/60 dark:hover:bg-dark-background/60 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text"
              aria-label="Close export"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full px-4 py-3 border border-light-border/50 dark:border-dark-border/50 rounded-xl bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 focus:border-transparent transition-all"
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Title
              </label>
              <input
                type="text"
                value={exportOptions.title || ''}
                onChange={(e) =>
                  setExportOptions({ ...exportOptions, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-light-border/50 dark:border-dark-border/50 rounded-xl bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 focus:border-transparent transition-all"
                placeholder="Document title"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Description
              </label>
              <input
                type="text"
                value={exportOptions.description || ''}
                onChange={(e) =>
                  setExportOptions({
                    ...exportOptions,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-light-border/50 dark:border-dark-border/50 rounded-xl bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 focus:border-transparent transition-all"
                placeholder="Meta description"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleCopyHtml}
                className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-light-accent to-[#5A57D6] dark:from-dark-accent dark:to-[#6A67E6] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-light-accent/20 dark:hover:shadow-dark-accent/20 transition-all duration-200 hover:scale-105 active:scale-95 premium-shadow flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span className="text-base">📋</span>
                <span>Copy HTML</span>
              </button>
              <button
                onClick={handleDownloadHtml}
                className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 bg-gradient-to-r from-light-accent to-[#5A57D6] dark:from-dark-accent dark:to-[#6A67E6] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-light-accent/20 dark:hover:shadow-dark-accent/20 transition-all duration-200 hover:scale-105 active:scale-95 premium-shadow flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span className="text-base">⬇️</span>
                <span>Download HTML</span>
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 border border-light-border/50 dark:border-dark-border/50 rounded-xl text-light-text dark:text-dark-text text-sm font-semibold hover:bg-light-background/60 dark:hover:bg-dark-background/60 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span className="text-base">📄</span>
                <span>Download MD</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


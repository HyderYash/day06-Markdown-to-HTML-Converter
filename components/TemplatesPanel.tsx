'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { markdownTemplates, MarkdownTemplate } from '@/lib/templates-snippets'

interface TemplatesPanelProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (content: string) => void
}

export default function TemplatesPanel({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplatesPanelProps) {
  if (!isOpen) return null

  const categories = ['blog', 'readme', 'documentation', 'article', 'other'] as const

  const handleSelect = (template: MarkdownTemplate) => {
    onSelectTemplate(template.content)
    onClose()
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
        className="w-full max-w-4xl max-h-[90vh] overflow-auto glass-strong rounded-apple-lg premium-shadow-lg border border-light-border/30 dark:border-dark-border/30 m-4"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-1">
                Markdown Templates
              </h2>
              <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                Choose a template to get started
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-light-background/60 dark:hover:bg-dark-background/60 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text"
              aria-label="Close templates"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          <div className="space-y-6">
            {categories.map((category) => {
              const templates = markdownTemplates.filter((t) => t.category === category)
              if (templates.length === 0) return null

              return (
                <div key={category}>
                  <h3 className="text-sm font-bold text-light-text/80 dark:text-dark-text/80 mb-3 uppercase tracking-wider">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {templates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(template)}
                        className="group p-4 rounded-xl bg-light-background/50 dark:bg-dark-background/50 border border-light-border/30 dark:border-dark-border/30 hover:bg-light-surface/60 dark:hover:bg-dark-surface/60 hover:border-light-border/50 dark:hover:border-dark-border/50 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] premium-shadow hover:premium-shadow-lg"
                      >
                        <h4 className="font-semibold text-light-text dark:text-dark-text mb-1">
                          {template.name}
                        </h4>
                        <p className="text-xs text-light-text/60 dark:text-dark-text/60">
                          {template.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}


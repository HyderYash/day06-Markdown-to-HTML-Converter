'use client'

import { motion } from 'framer-motion'
import { SanitizeOptions } from '@/lib/sanitize'
import { TemplateOptions } from '@/lib/templates'

interface SettingsPanelProps {
  sanitizeOptions: SanitizeOptions
  onSanitizeOptionsChange: (options: SanitizeOptions) => void
  templateOptions: TemplateOptions
  onTemplateOptionsChange: (options: TemplateOptions) => void
  isOpen: boolean
  onClose: () => void
}

export default function SettingsPanel({
  sanitizeOptions,
  onSanitizeOptionsChange,
  templateOptions,
  onTemplateOptionsChange,
  isOpen,
  onClose,
}: SettingsPanelProps) {
  if (!isOpen) return null

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
                Settings
              </h2>
              <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                Customize your conversion experience
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-light-background/60 dark:hover:bg-dark-background/60 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text"
              aria-label="Close settings"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          <div className="space-y-8">
            <section className="p-5 rounded-xl bg-light-background/50 dark:bg-dark-background/50 border border-light-border/30 dark:border-dark-border/30">
              <h3 className="text-base font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                <span className="text-lg">🔒</span>
                Security & Sanitization
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={sanitizeOptions.allowIframes || false}
                    onChange={(e) =>
                      onSanitizeOptionsChange({
                        ...sanitizeOptions,
                        allowIframes: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-2 border-light-border dark:border-dark-border accent-light-accent dark:accent-dark-accent transition-all"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-light-text dark:text-dark-text block">
                      Allow iframes
                    </span>
                    <span className="text-xs text-light-text/50 dark:text-dark-text/50">
                      Not recommended for untrusted content
                    </span>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={sanitizeOptions.allowScripts || false}
                    onChange={(e) =>
                      onSanitizeOptionsChange({
                        ...sanitizeOptions,
                        allowScripts: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-2 border-light-border dark:border-dark-border accent-red-500 transition-all"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-light-text dark:text-dark-text block">
                      Allow scripts
                    </span>
                    <span className="text-xs text-red-500/70 dark:text-red-400/70">
                      Dangerous - may execute malicious code
                    </span>
                  </div>
                </label>
                <div className="mt-4 p-3 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20">
                  <p className="text-xs text-light-text/70 dark:text-dark-text/70 leading-relaxed">
                    <strong className="font-semibold">Security Note:</strong> HTML is sanitized by default to prevent XSS attacks. Only enable these options if you trust the content source.
                  </p>
                </div>
              </div>
            </section>

            <section className="p-5 rounded-xl bg-light-background/50 dark:bg-dark-background/50 border border-light-border/30 dark:border-dark-border/30">
              <h3 className="text-base font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                <span className="text-lg">⚙️</span>
                Export Options
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={templateOptions.title || ''}
                    onChange={(e) =>
                      onTemplateOptionsChange({
                        ...templateOptions,
                        title: e.target.value,
                      })
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
                    value={templateOptions.description || ''}
                    onChange={(e) =>
                      onTemplateOptionsChange({
                        ...templateOptions,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-light-border/50 dark:border-dark-border/50 rounded-xl bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 focus:border-transparent transition-all"
                    placeholder="Meta description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                    Theme Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={templateOptions.themeColor || '#007AFF'}
                      onChange={(e) =>
                        onTemplateOptionsChange({
                          ...templateOptions,
                          themeColor: e.target.value,
                        })
                      }
                      className="w-16 h-12 border-2 border-light-border/50 dark:border-dark-border/50 rounded-xl cursor-pointer transition-all hover:scale-105"
                    />
                    <input
                      type="text"
                      value={templateOptions.themeColor || '#007AFF'}
                      onChange={(e) =>
                        onTemplateOptionsChange({
                          ...templateOptions,
                          themeColor: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-3 border border-light-border/50 dark:border-dark-border/50 rounded-xl bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 focus:border-transparent transition-all font-mono text-sm"
                      placeholder="#007AFF"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={templateOptions.includeSyntaxHighlighting !== false}
                    onChange={(e) =>
                      onTemplateOptionsChange({
                        ...templateOptions,
                        includeSyntaxHighlighting: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-2 border-light-border dark:border-dark-border accent-light-accent dark:accent-dark-accent transition-all"
                  />
                  <span className="text-sm font-medium text-light-text dark:text-dark-text">
                    Include syntax highlighting
                  </span>
                </label>
                {templateOptions.includeSyntaxHighlighting && (
                  <div className="ml-8">
                    <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                      Syntax Theme
                    </label>
                    <select
                      value={templateOptions.syntaxTheme || 'light'}
                      onChange={(e) =>
                        onTemplateOptionsChange({
                          ...templateOptions,
                          syntaxTheme: e.target.value as 'light' | 'dark',
                        })
                      }
                      className="w-full px-4 py-3 border border-light-border/50 dark:border-dark-border/50 rounded-xl bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 focus:border-transparent transition-all"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                )}
                <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 transition-colors">
                  <input
                    type="checkbox"
                    checked={templateOptions.minify || false}
                    onChange={(e) =>
                      onTemplateOptionsChange({
                        ...templateOptions,
                        minify: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-2 border-light-border dark:border-dark-border accent-light-accent dark:accent-dark-accent transition-all"
                  />
                  <span className="text-sm font-medium text-light-text dark:text-dark-text">
                    Minify HTML on export
                  </span>
                </label>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


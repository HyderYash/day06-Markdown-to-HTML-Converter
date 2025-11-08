'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useDrafts, Draft } from '@/lib/useLocalStorage'
import { useState } from 'react'

interface DraftsPanelProps {
  isOpen: boolean
  onClose: () => void
  onLoadDraft: (content: string) => void
  currentContent: string
  onSaveDraft: (name: string, content: string) => void
}

export default function DraftsPanel({
  isOpen,
  onClose,
  onLoadDraft,
  currentContent,
  onSaveDraft,
}: DraftsPanelProps) {
  const { drafts, deleteDraft } = useDrafts()
  const [draftName, setDraftName] = useState('')
  const [showSaveForm, setShowSaveForm] = useState(false)

  if (!isOpen) return null

  const handleSave = () => {
    if (!draftName.trim()) return
    onSaveDraft(draftName.trim(), currentContent)
    setShowSaveForm(false)
    setDraftName('')
  }

  const handleLoad = (draft: Draft) => {
    onLoadDraft(draft.content)
    onClose()
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Delete this draft?')) {
      deleteDraft(id)
    }
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
        className="w-full max-w-md max-h-[90vh] overflow-auto glass-strong rounded-apple-lg premium-shadow-lg border border-light-border/30 dark:border-dark-border/30 m-4"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-1">
                Drafts
              </h2>
              <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                Save and manage your work
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-light-background/60 dark:hover:bg-dark-background/60 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text"
              aria-label="Close drafts"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showSaveForm ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                    Draft Name
                  </label>
                  <input
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSave()
                      } else if (e.key === 'Escape') {
                        setShowSaveForm(false)
                        setDraftName('')
                      }
                    }}
                    className="w-full px-4 py-3 border border-light-border/50 dark:border-dark-border/50 rounded-xl bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 focus:border-transparent transition-all"
                    placeholder="My draft"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-light-accent to-[#5A57D6] dark:from-dark-accent dark:to-[#6A67E6] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-light-accent/20 dark:hover:shadow-dark-accent/20 transition-all duration-200 hover:scale-105 active:scale-95 premium-shadow"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowSaveForm(false)
                      setDraftName('')
                    }}
                    className="px-5 py-3 border border-light-border/50 dark:border-dark-border/50 rounded-xl text-light-text dark:text-dark-text font-medium hover:bg-light-background/60 dark:hover:bg-dark-background/60 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <button
                  onClick={() => setShowSaveForm(true)}
                  className="w-full mb-6 px-5 py-3.5 bg-gradient-to-r from-light-accent to-[#5A57D6] dark:from-dark-accent dark:to-[#6A67E6] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-light-accent/20 dark:hover:shadow-dark-accent/20 transition-all duration-200 hover:scale-105 active:scale-95 premium-shadow flex items-center justify-center gap-2"
                >
                  <span className="text-lg">+</span>
                  <span>New Draft</span>
                </button>

                {drafts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3 opacity-30">📝</div>
                    <p className="text-sm text-light-text/50 dark:text-dark-text/50 font-medium">
                      No drafts saved yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {drafts.map((draft, index) => (
                      <motion.div
                        key={draft.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group p-4 border border-light-border/30 dark:border-dark-border/30 rounded-xl hover:bg-light-surface/60 dark:hover:bg-dark-surface/60 hover:border-light-border/50 dark:hover:border-dark-border/50 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] premium-shadow hover:premium-shadow-lg"
                        onClick={() => handleLoad(draft)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-1">
                              {draft.name}
                            </h3>
                            <p className="text-xs text-light-text/50 dark:text-dark-text/50">
                              {new Date(draft.updatedAt).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => handleDelete(draft.id, e)}
                            className="p-2 text-light-text/30 dark:text-dark-text/30 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                            aria-label="Delete draft"
                          >
                            <span className="text-base">🗑️</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}


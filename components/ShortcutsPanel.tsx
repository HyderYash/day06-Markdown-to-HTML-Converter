'use client'

import { motion } from 'framer-motion'

interface ShortcutsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShortcutsPanel({ isOpen, onClose }: ShortcutsPanelProps) {
  if (!isOpen) return null

  const shortcuts = [
    {
      category: 'Editor',
      items: [
        { keys: ['Ctrl', 'B'], description: 'Bold text' },
        { keys: ['Ctrl', 'I'], description: 'Italic text' },
        { keys: ['Ctrl', 'H'], description: 'Insert heading' },
        { keys: ['Ctrl', 'K'], description: 'Show shortcuts' },
        { keys: ['Ctrl', 'T'], description: 'Open templates' },
      ],
    },
    {
      category: 'Navigation',
      items: [
        { keys: ['Ctrl', 'F'], description: 'Find' },
        { keys: ['Ctrl', 'G'], description: 'Find next' },
        { keys: ['Ctrl', 'Shift', 'G'], description: 'Find previous' },
        { keys: ['Ctrl', 'H'], description: 'Replace' },
      ],
    },
    {
      category: 'Actions',
      items: [
        { keys: ['Ctrl', 'Z'], description: 'Undo' },
        { keys: ['Ctrl', 'Y'], description: 'Redo' },
        { keys: ['Ctrl', 'S'], description: 'Auto-save (shows feedback)' },
        { keys: ['Ctrl', 'E'], description: 'Export' },
        { keys: ['F11'], description: 'Toggle fullscreen' },
      ],
    },
  ]

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
                Keyboard Shortcuts
              </h2>
              <p className="text-sm text-light-text/60 dark:text-dark-text/60">
                Speed up your workflow
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-light-background/60 dark:hover:bg-dark-background/60 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-light-text/60 dark:text-dark-text/60 hover:text-light-text dark:hover:text-dark-text"
              aria-label="Close shortcuts"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          <div className="space-y-6">
            {shortcuts.map((category, catIndex) => (
              <div key={category.category}>
                <h3 className="text-sm font-bold text-light-text/80 dark:text-dark-text/80 mb-3 uppercase tracking-wider">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-light-background/50 dark:bg-dark-background/50 border border-light-border/30 dark:border-dark-border/30"
                    >
                      <span className="text-sm text-light-text dark:text-dark-text">
                        {item.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {item.keys.map((key, keyIndex) => (
                          <span key={keyIndex}>
                            <kbd className="px-2 py-1 text-xs font-semibold text-light-text dark:text-dark-text bg-light-surface dark:bg-dark-surface border border-light-border/50 dark:border-dark-border/50 rounded shadow-sm">
                              {key}
                            </kbd>
                            {keyIndex < item.keys.length - 1 && (
                              <span className="mx-1 text-light-text/40 dark:text-dark-text/40">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}


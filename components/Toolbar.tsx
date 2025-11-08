'use client'

import { EditorView } from '@codemirror/view'
import { useRef } from 'react'

interface ToolbarProps {
  editorView: EditorView | null
  onInsert: (text: string, cursorOffset?: number) => void
  onInsertTOC?: () => void
}

export default function Toolbar({ editorView, onInsert, onInsertTOC }: ToolbarProps) {
  const handleInsert = (before: string, after: string = '', cursorOffset: number = 0) => {
    if (!editorView) return
    
    const { state } = editorView
    const selection = state.selection.main
    const selectedText = state.sliceDoc(selection.from, selection.to)
    
    const insertText = before + selectedText + after
    const newFrom = selection.from + before.length
    const newTo = newFrom + selectedText.length
    
    editorView.dispatch({
      changes: {
        from: selection.from,
        to: selection.to,
        insert: insertText,
      },
      selection: {
        anchor: newTo + cursorOffset,
      },
    })
    
    editorView.focus()
  }

  const buttons = [
    {
      label: 'Bold',
      icon: 'B',
      action: () => handleInsert('**', '**', 0),
      shortcut: '⌘B',
    },
    {
      label: 'Italic',
      icon: 'I',
      action: () => handleInsert('*', '*', 0),
      shortcut: '⌘I',
    },
    {
      label: 'Heading',
      icon: 'H',
      action: () => handleInsert('# ', '', 0),
      shortcut: '⌘H',
    },
    {
      label: 'Link',
      icon: '🔗',
      action: () => handleInsert('[', '](url)', -4),
    },
    {
      label: 'Image',
      icon: '🖼️',
      action: () => handleInsert('![alt', '](url)', -4),
    },
    {
      label: 'Code',
      icon: '</>',
      action: () => handleInsert('`', '`', 0),
    },
    {
      label: 'Code Block',
      icon: '```',
      action: () => handleInsert('```\n', '\n```', -4),
    },
    {
      label: 'List',
      icon: '•',
      action: () => handleInsert('- ', '', 0),
    },
    {
      label: 'Quote',
      icon: '❝',
      action: () => handleInsert('> ', '', 0),
    },
    {
      label: 'Table',
      icon: '⊞',
      action: () => {
        const table = `| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n`
        handleInsert(table, '', 0)
      },
    },
    {
      label: 'Table of Contents',
      icon: '📑',
      action: () => {
        if (onInsertTOC) {
          onInsertTOC()
        } else if (editorView) {
          const { state } = editorView
          const selection = state.selection.main
          const toc = `## Table of Contents\n\n<!-- TOC will be generated here -->\n\n`
          editorView.dispatch({
            changes: {
              from: selection.from,
              to: selection.to,
              insert: toc,
            },
          })
          editorView.focus()
        }
      },
    },
  ]

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gradient-to-r from-light-surface/80 to-transparent dark:from-dark-surface/80 border-b border-light-border/30 dark:border-dark-border/30 rounded-t-apple-lg overflow-x-auto scrollbar-hide">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={btn.action}
          className="group px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm font-medium text-light-text/70 dark:text-dark-text/70 hover:text-light-text dark:hover:text-dark-text hover:bg-light-background/60 dark:hover:bg-dark-background/60 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-transparent hover:border-light-border/30 dark:hover:border-dark-border/30 flex-shrink-0 whitespace-nowrap"
          title={`${btn.label}${btn.shortcut ? ` (${btn.shortcut})` : ''}`}
          aria-label={btn.label}
        >
          <span className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-sm sm:text-base leading-none">{btn.icon}</span>
          </span>
        </button>
      ))}
    </div>
  )
}


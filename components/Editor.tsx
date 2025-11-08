'use client'

import { useEffect, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'
import { keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import Toolbar from './Toolbar'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  darkMode?: boolean
  fontSize?: number
  onInsertTOC?: () => void
}

export default function Editor({ value, onChange, darkMode = false, fontSize = 14, onInsertTOC }: EditorProps) {
  const [editorView, setEditorView] = useState<EditorView | null>(null)
  
  const customKeymap = [
    {
      key: 'Mod-b',
      run: (view: EditorView) => {
        const { state } = view
        const selection = state.selection.main
        const selectedText = state.sliceDoc(selection.from, selection.to)
        const insertText = selectedText ? '**' + selectedText + '**' : '****'
        const cursorPos = selectedText 
          ? selection.from + 2 + selectedText.length 
          : selection.from + 2
        view.dispatch({
          changes: {
            from: selection.from,
            to: selection.to,
            insert: insertText,
          },
          selection: {
            anchor: cursorPos,
          },
        })
        return true
      },
    },
    {
      key: 'Mod-i',
      run: (view: EditorView) => {
        const { state } = view
        const selection = state.selection.main
        const selectedText = state.sliceDoc(selection.from, selection.to)
        const insertText = selectedText ? '*' + selectedText + '*' : '**'
        const cursorPos = selectedText 
          ? selection.from + 1 + selectedText.length 
          : selection.from + 1
        view.dispatch({
          changes: {
            from: selection.from,
            to: selection.to,
            insert: insertText,
          },
          selection: {
            anchor: cursorPos,
          },
        })
        return true
      },
    },
    {
      key: 'Mod-h',
      run: (view: EditorView) => {
        const { state } = view
        const selection = state.selection.main
        view.dispatch({
          changes: {
            from: selection.from,
            to: selection.to,
            insert: '# ',
          },
        })
        return true
      },
    },
  ]

  const extensions = [
    markdown(),
    EditorView.lineWrapping,
    keymap.of([...customKeymap, ...defaultKeymap]),
    EditorView.theme({
      '&': {
        fontSize: `${fontSize}px`,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Inter, system-ui, sans-serif',
      },
      '.cm-content': {
        padding: '16px',
        minHeight: '100%',
      },
      '.cm-editor': {
        height: '100%',
      },
      '.cm-scroller': {
        overflow: 'auto',
      },
    }),
    ...(darkMode ? [oneDark] : []),
  ]

  return (
    <div className="h-full flex flex-col glass-strong rounded-apple-lg overflow-hidden premium-shadow-lg border border-light-border/30 dark:border-dark-border/30">
      <Toolbar
        editorView={editorView}
        onInsert={(text, cursorOffset) => {
          if (!editorView) return
          const { state } = editorView
          const selection = state.selection.main
          editorView.dispatch({
            changes: {
              from: selection.from,
              to: selection.to,
              insert: text,
            },
            selection: {
              anchor: selection.from + text.length + (cursorOffset || 0),
            },
          })
          editorView.focus()
        }}
        onInsertTOC={onInsertTOC}
      />
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={value}
          onChange={onChange}
          extensions={extensions}
          theme={darkMode ? 'dark' : 'light'}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
          }}
          onUpdate={(view) => {
            setEditorView(view.view)
          }}
          placeholder="Write Markdown… (try `# Hello world`)"
          className="h-full"
        />
      </div>
    </div>
  )
}


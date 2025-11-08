'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}

export interface Draft {
  id: string
  name: string
  content: string
  createdAt: number
  updatedAt: number
}

export interface ConversionHistory {
  id: string
  markdown: string
  html: string
  createdAt: number
}

const DRAFTS_KEY = 'md-to-html-drafts'
const HISTORY_KEY = 'md-to-html-history'

export function useDrafts() {
  const [drafts, setDrafts] = useLocalStorage<Draft[]>(DRAFTS_KEY, [])

  const saveDraft = (name: string, content: string) => {
    const draft: Draft = {
      id: Date.now().toString(),
      name,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setDrafts([...drafts, draft])
    return draft
  }

  const updateDraft = (id: string, content: string) => {
    setDrafts(
      drafts.map((draft) =>
        draft.id === id
          ? { ...draft, content, updatedAt: Date.now() }
          : draft
      )
    )
  }

  const deleteDraft = (id: string) => {
    setDrafts(drafts.filter((draft) => draft.id !== id))
  }

  const loadDraft = (id: string): Draft | undefined => {
    return drafts.find((draft) => draft.id === id)
  }

  return {
    drafts,
    saveDraft,
    updateDraft,
    deleteDraft,
    loadDraft,
  }
}

export function useConversionHistory() {
  const [history, setHistory] = useLocalStorage<ConversionHistory[]>(
    HISTORY_KEY,
    []
  )

  const addToHistory = (markdown: string, html: string) => {
    const entry: ConversionHistory = {
      id: Date.now().toString(),
      markdown,
      html,
      createdAt: Date.now(),
    }
    const newHistory = [entry, ...history].slice(0, 10)
    setHistory(newHistory)
  }

  const clearHistory = () => {
    setHistory([])
  }

  return {
    history,
    addToHistory,
    clearHistory,
  }
}


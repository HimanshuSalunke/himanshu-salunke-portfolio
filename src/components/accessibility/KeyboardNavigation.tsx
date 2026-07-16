/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef } from 'react'

export const useKeyboardNavigation = () => {
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const [isNavigating, setIsNavigating] = React.useState(false)

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      setIsNavigating(true)
    }
  }

  const handleMouseDown = () => {
    setIsNavigating(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return {
    focusedIndex,
    setFocusedIndex,
    isNavigating
  }
}

export const useArrowKeyNavigation = <TItem, T extends HTMLElement = HTMLElement>(
  items: TItem[],
  onSelect?: (item: TItem, index: number) => void
) => {
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusedIndex(prev => (prev + 1) % items.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusedIndex(prev => (prev - 1 + items.length) % items.length)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (focusedIndex >= 0 && onSelect) {
            onSelect(items[focusedIndex], focusedIndex)
          }
          break
        case 'Home':
          e.preventDefault()
          setFocusedIndex(0)
          break
        case 'End':
          e.preventDefault()
          setFocusedIndex(items.length - 1)
          break
        case 'Escape':
          setFocusedIndex(-1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [focusedIndex, items, onSelect])

  return {
    focusedIndex,
    setFocusedIndex,
    containerRef
  }
}

export const KeyboardShortcuts: React.FC<{
  shortcuts: Array<{
    key: string
    description: string
    action: () => void
  }>
}> = ({ shortcuts }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcut = shortcuts.find(s => s.key === e.key)
      if (shortcut && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        shortcut.action()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])

  return null
}

export const FocusIndicator: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => {
  return (
    <div className={`focus-indicator ${className}`}>
      {children}
    </div>
  )
}

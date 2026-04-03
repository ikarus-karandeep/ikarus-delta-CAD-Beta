import { useState, useCallback } from 'react'

export const useHistory = (initialState) => {
  const [history, setHistory] = useState([])
  const [historyPtr, setHistoryPtr] = useState(-1)

  const saveToHistory = useCallback((snapshot) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyPtr + 1)
      newHistory.push(snapshot)
      if (newHistory.length > 50) newHistory.shift()
      return newHistory
    })
    setHistoryPtr(prev => Math.min(49, prev + 1))
  }, [historyPtr])

  const undo = useCallback(() => {
    if (historyPtr > 0) {
      setHistoryPtr(historyPtr - 1)
      return history[historyPtr - 1]
    }
    return null
  }, [history, historyPtr])

  const redo = useCallback(() => {
    if (historyPtr < history.length - 1) {
      setHistoryPtr(historyPtr + 1)
      return history[historyPtr + 1]
    }
    return null
  }, [history, historyPtr])

  const canUndo = historyPtr > 0
  const canRedo = historyPtr < history.length - 1

  return {
    history,
    historyPtr,
    saveToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}

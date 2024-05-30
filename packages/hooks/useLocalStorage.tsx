'use client'
import { useCallback, useState } from 'react'

export const useLocalStorage = (
  key: string,
  initialState: string | null,
  parseToJson = false
): [any, any] => {
  const getStoredValue = () => {
    const item = localStorage.getItem(key)
    if (item === null) return initialState
    return parseToJson ? JSON.parse(item) : item
  }
  const [value, setValue] = useState(getStoredValue)
  const updatedSetValue = useCallback(
    (newValue: string) => {
      if (newValue === initialState || typeof newValue === 'undefined') {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, newValue)
      }
      setValue(newValue ?? initialState)
    },
    [initialState, key]
  )
  return [value, updatedSetValue]
}

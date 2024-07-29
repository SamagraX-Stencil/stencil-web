import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const useTransliteration = (config: any, value: any, setValue: any) => {
  const [suggestions, setSuggestions] = useState([])
  const [suggestionClicked, setSuggestionClicked] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [cursorPosition, setCursorPosition] = useState(0)

  useEffect(() => {
    if (
      value.length > 0 &&
      config?.allowTransliteration &&
      localStorage.getItem('locale') === config?.transliterationOutputLanguage
    ) {
      if (suggestionClicked) {
        setSuggestionClicked(false)
        return
      }

      setSuggestions([])

      const words = value.split(' ')
      const wordUnderCursor = words.find(
        (word: any, index: number) =>
          cursorPosition >= value.indexOf(word) &&
          cursorPosition <= value.indexOf(word) + word.length
      )

      if (!wordUnderCursor) return

      const data = JSON.stringify({
        inputLanguage: config?.transliterationInputLanguage,
        outputLanguage: config?.transliterationOutputLanguage,
        input: wordUnderCursor,
        provider: config?.transliterationProvider || 'bhashini',
        numSuggestions: config?.transliterationSuggestions || 3,
      })

      const axiosConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_AI_TOOLS_API}/transliterate`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios
        .request(axiosConfig)
        .then((res) => {
          setSuggestions(res?.data?.suggestions)
          console.log('api suggestions', res?.data?.suggestions)
        })
        .catch(() => toast.error('Transliteration failed'))
    } else {
      setSuggestions([])
    }
  }, [value, cursorPosition])

  const suggestionHandler = (index: number) => {
    setActiveSuggestion(index)
  }

  const handleInputChange = (e: any) => {
    const value = e.target.value
    setValue(value)
    setCursorPosition(e.target.selectionStart)
  }

  const handleKeyDown = useCallback(
    (e: any) => {
      if (suggestions.length > 0) {
        if (e.code === 'ArrowUp') {
          e.preventDefault()
          setActiveSuggestion((prev) => Math.max(prev - 1, 0))
        } else if (e.code === 'ArrowDown') {
          e.preventDefault()
          setActiveSuggestion((prev) =>
            Math.min(prev + 1, suggestions.length - 1)
          )
        } else if (e.key === ' ') {
          e.preventDefault()
          if (activeSuggestion >= 0 && activeSuggestion < suggestions.length) {
            suggestionClickHandler(suggestions[activeSuggestion])
          } else {
            setValue((prev: any) => prev + ' ')
          }
        }
      }
    },
    [suggestions, activeSuggestion]
  )

  useEffect(() => {
    let input = document.getElementById('inputBox')
    input?.addEventListener('textInput', handleKeyDown)

    return () => {
      input?.removeEventListener('textInput', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const suggestionClickHandler = useCallback(
    (suggestion: any) => {
      const words = value.split(' ')
      const cursorPos = cursorPosition
      let currentIndex = 0
      let selectedWord = ''

      for (let word of words) {
        if (
          currentIndex <= cursorPos &&
          cursorPos <= currentIndex + word.length
        ) {
          selectedWord = word
          break
        }
        currentIndex += word.length + 1 // +1 for space
      }

      if (selectedWord !== '') {
        const newValue = value.replace(
          selectedWord,
          cursorPos === value.length ? suggestion + ' ' : suggestion
        )
        setSuggestions([])
        setSuggestionClicked(true)
        setActiveSuggestion(0)
        setValue(newValue)
      }
    },
    [cursorPosition]
  )

  return {
    suggestions,
    activeSuggestion,
    handleInputChange,
    suggestionClickHandler,
    suggestionHandler,
    setActiveSuggestion,
    handleKeyDown,
  }
}

export default useTransliteration

import { fireEvent, render, screen } from '@testing-library/react'
import ComingSoonPage from './index'
import { vi } from 'vitest'
import { useUiConfig } from '../../hook/useConfig'

describe('Coming Soon component', () => {
  const config = useUiConfig('component', 'comingSoon')

  test('renders without crashing', () => {
    render(<ComingSoonPage />)
  })

  test('displays "Coming Soon Title" text', () => {
    const { getByText } = render(<ComingSoonPage />)
    const textElement = getByText(config.title ?? 'Coming Soon')
    expect(textElement).toBeInTheDocument()
  })

  test('displays "Description" text', () => {
    const { getByText } = render(<ComingSoonPage />)
    const textElement = getByText(
      config.description ?? 'Coming Soon Description'
    )
    expect(textElement).toBeInTheDocument()
  })

  test('renders back button correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<ComingSoonPage />)
    const buttonElement = screen.getByText(config.backText ?? 'Back Button')
    fireEvent.click(buttonElement)
    expect(consoleSpy).toHaveBeenCalledWith(config.backText ?? 'Back Button')
  })
})

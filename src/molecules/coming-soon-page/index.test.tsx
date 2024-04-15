import { fireEvent, render, screen } from '@testing-library/react'
import ComingSoonPage from './index'
import { component } from './../../../app.config.json'
import { vi } from 'vitest'
const { comingSoon } = component

describe('Coming Soon component', () => {
  test('renders without crashing', () => {
    render(<ComingSoonPage />)
  })

  test('displays "Coming Soon Title" text', () => {
    const { getByText } = render(<ComingSoonPage />)
    const textElement = getByText(comingSoon.title ?? 'Coming Soon')
    expect(textElement).toBeInTheDocument()
  })

  test('displays "Description" text', () => {
    const { getByText } = render(<ComingSoonPage />)
    const textElement = getByText(
      comingSoon.description ?? 'Coming Soon Description'
    )
    expect(textElement).toBeInTheDocument()
  })

  test('renders back button correctly', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<ComingSoonPage />)
    const buttonElement = screen.getByText(comingSoon.backText ?? 'Back Button')
    fireEvent.click(buttonElement)
    expect(consoleSpy).toHaveBeenCalledWith(
      comingSoon.backText ?? 'Back Button'
    )
  })
})

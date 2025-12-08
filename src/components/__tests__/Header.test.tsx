import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Header } from '../header/Header'
import { ThemeProvider } from '../../context/ThemeContext'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          {component}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

describe('Header Component', () => {
  test('renders logo and navigation links', () => {
    renderWithProviders(<Header />)
    
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Articles')).toBeInTheDocument()
    expect(screen.getByText('Now')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  test('toggles theme when theme button is clicked', () => {
    renderWithProviders(<Header />)
    
    const themeButton = screen.getByLabelText(/Switch to dark mode/i)
    fireEvent.click(themeButton)
    
    // Check if theme toggle button changes
    expect(screen.getByLabelText(/Switch to light mode/i)).toBeInTheDocument()
  })


  test('opens mobile menu when hamburger button is clicked', () => {
    renderWithProviders(<Header />)
    
    const mobileMenuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(mobileMenuButton)
    
    // Check if mobile menu is open
    expect(screen.getByLabelText('Toggle menu')).toHaveAttribute('aria-expanded', 'true')
  })

  test('closes mobile menu when route changes', () => {
    renderWithProviders(<Header />)
    
    const mobileMenuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(mobileMenuButton)
    
    // Navigate to different page - use getAllByText to handle multiple About links
    const aboutLinks = screen.getAllByText('About')
    const mobileAboutLink = aboutLinks.find(link => 
      link.closest('.md\\:hidden') // Find the one in mobile menu
    )
    if (mobileAboutLink) {
      fireEvent.click(mobileAboutLink)
    }
    
    // Check if mobile menu is closed
    expect(screen.getByLabelText('Toggle menu')).toHaveAttribute('aria-expanded', 'false')
  })

  test('has proper accessibility attributes', () => {
    renderWithProviders(<Header />)
    
    // Check for proper ARIA labels
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
    expect(screen.getByLabelText(/Switch to/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
    
    // Check for proper navigation structure
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})

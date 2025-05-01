// src/pages/__tests__/Login.test.jsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, __setNavigateMock } from 'react-router-dom'
import Login from '../Login'
import * as authService from '../../services/auth'
import * as favoritesService from '../../services/favorites'

jest.mock('../../services/auth')
jest.mock('../../services/favorites')

describe('Login page', () => {
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    // wire our navigate spy into the manual mock
    __setNavigateMock(mockNavigate)
  })

  it('renders all form controls and the register link', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    // heading
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    // inputs
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    // submit
    expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument()
    // register link (our stubbed <Link> forwards `to`, not `href`)
    expect(screen.getByText(/register here/i)).toHaveAttribute('to', '/register')
  })

  it('on successful login saves to localStorage, syncs favorites and navigates home', async () => {
    authService.loginUser.mockResolvedValue({ token: 'tok123', name: 'Alice' })
    favoritesService.getFavorites.mockResolvedValue(['USA', 'FRA'])

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'alice@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'supersecret' }
    })
    fireEvent.click(screen.getByRole('button', { name: /^login$/i }))

    await waitFor(() => {
      // did we save correctly?
      expect(localStorage.getItem('token')).toBe('tok123')
      expect(localStorage.getItem('user')).toBe('Alice')
      expect(JSON.parse(localStorage.getItem('favorites'))).toEqual(['USA', 'FRA'])
      // did we navigate home?
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('on failed login shows error and does not persist anything', async () => {
    authService.loginUser.mockRejectedValue(new Error('Invalid credentials'))

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'bob@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrong' }
    })
    fireEvent.click(screen.getByRole('button', { name: /^login$/i }))

    // error message
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
    // nothing saved
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })
})

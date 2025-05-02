// frontend/src/__mocks__/react-router-dom.js
import React from 'react'

// internal store for our navigate spy:
let _navigateMock = () => {}

/**
 * Test helper to inject your own navigate spy.
 */
export function __setNavigateMock(fn) {
  _navigateMock = fn
}

// just render children
export function BrowserRouter({ children }) {
  return <>{children}</>
}
export const MemoryRouter = BrowserRouter

export function Link({ children, ...props }) {
  return <a {...props}>{children}</a>
}

export function Routes({ children }) {
  return <>{children}</>
}
export function Route({ element }) {
  return element
}

// mock useNavigate
export function useNavigate() {
  return _navigateMock
}
export function useParams() {
  return {}
}

// ← **NEW**: mock Navigate so routes compile
export function Navigate({ to, replace }) {
  return null
}

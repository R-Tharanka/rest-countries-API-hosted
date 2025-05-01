// src/__mocks__/react-router-dom.js
import React from 'react'

// internal store for our navigate spy:
let _navigateMock = () => {}

/**
 * Test helper to inject your own navigate spy.
 */
export function __setNavigateMock(fn) {
  _navigateMock = fn
}

// same as BrowserRouter for most tests:
export function BrowserRouter({ children }) {
  return <>{children}</>
}
// alias it so tests importing MemoryRouter work:
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

// when your app calls this hook, it gets our spy:
export function useNavigate() {
  return _navigateMock
}
export function useParams() {
  return {}
}

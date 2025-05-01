import React from 'react';

//
// A minimal stub of the bits of React Router you use in your app/tests
//

// We'll hold onto one single navigate mock function, but allow it to be replaced:
let _navigateMock = () => {};
export function __setNavigateMock(fn) {
  _navigateMock = fn;
}

export function BrowserRouter({ children }) {
  return <>{children}</>;
}
export function Link({ children, ...props }) {
  return <a {...props}>{children}</a>;
}
export function Routes({ children }) {
  return <>{children}</>;
}
export function Route({ element }) {
  return element;
}
// This hook returns whatever _navigateMock currently is:
export function useNavigate() {
  return _navigateMock;
}
export function useParams() {
  return {};
}

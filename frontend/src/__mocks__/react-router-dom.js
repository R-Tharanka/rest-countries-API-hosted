import React from 'react';

// A minimal stub of the bits of React Router you use in your app/tests:
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
export function useNavigate() {
  return () => {};
}
export function useParams() {
  return {};
}

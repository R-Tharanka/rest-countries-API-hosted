export function handleAuthError(navigate, setSessionExpired) {
    // Clean up and redirect
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    setSessionExpired(true); // flag to show session expired banner
    navigate('/login');
  }
  
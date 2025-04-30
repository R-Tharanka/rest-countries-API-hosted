export function handleAuthError(navigate, setSessionExpired) {
  // Remove authentication-related data from local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('favorites');

  // Set session expired flag to display a notification or banner
  setSessionExpired(true);

  // Redirect the user to the login page
  navigate('/login');
}
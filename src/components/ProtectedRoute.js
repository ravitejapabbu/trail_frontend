import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const githubUser = sessionStorage.getItem('githubUser');
  const linkedinUser = sessionStorage.getItem('linkedinUser');

  // if neither GitHub nor LinkedIn user logged in, redirect to home
  if (!githubUser && !linkedinUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

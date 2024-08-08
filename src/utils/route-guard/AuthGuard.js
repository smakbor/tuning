import useAuth from 'hooks/useAuth';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { isLoggedIn, isInitialized } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isLoggedIn && isInitialized) {
      navigate('/auth/login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
      navigate('/auth/login', { replace: true });
    }
  }, [isLoggedIn, isInitialized, location]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;

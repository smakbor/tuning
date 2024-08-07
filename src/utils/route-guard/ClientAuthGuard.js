import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project import
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

const ClientAuthGuard = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/client-auth/login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
      navigate('/client-auth/login', { replace: true });
    }
  }, [isLoggedIn, navigate, location]);
};

ClientAuthGuard.propTypes = {
  children: PropTypes.node
};

export default ClientAuthGuard;

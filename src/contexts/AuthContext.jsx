/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import axios from 'utils/axios';

import jwtDecode from 'jwt-decode';

// reducer - state management
import { userLogin, userLogout } from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import axiosServices from 'utils/axios';
import { enqueueSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router';

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

export const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('accessToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    axiosServices.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
    delete axiosServices.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [dbUserId, setDbUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('accessToken');
        if (
          serviceToken
          // && verifyToken(serviceToken)
        ) {
          setSession(serviceToken);
          const { data } = await axios.get(`${baseUrl}/Dealer/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          });

          if (data.data) {
            setIsLoggedIn(true);
            setUserSession(data.data);
            setDbUserId(data.data.Id);
          }
        } else {
          setSession(null);
          // setIsLoggedIn(false);
        }
      } catch (err) {
        // dispatch(userLogout());
        enqueueSnackbar(err?.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      }

      // const token = window.localStorage.getItem('accessToken');
      // if (token) {
      //   try {
      //     const { data } = await axios.get(`${baseUrl}/Dealer/profile`, {
      //       headers: {
      //         Authorization: `Bearer ${token}`
      //       },
      //       withCredentials: true
      //     });

      //     if (data.data) {
      //       setUserSession(data.data);
      //       setDbUserId(data.data.Id);
      //     }
      //   } catch (error) {
      //     console.log('error', error);
      //   }
      // }
    };

    init();
  }, []);

  const logout = () => {
    dispatch(userLogout());
  };

  const resetPassword = async () => {};

  const updateProfile = () => {};

  // if (auth.isInitialized !== undefined && !auth.isInitialized) {
  //   return <Loader />;
  // }

  return (
    <JWTContext.Provider value={{ ...auth, logout, resetPassword, updateProfile, userSession, dbUserId, setIsLoggedIn }}>
      {children}
    </JWTContext.Provider>
  );
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;

// https://portal.ai-tuningfiles.com/confirm-login?token=a6e0c9258ef6d0cef248fa323d99fb5f22148ea9d5b5ea554b4367f44e7818f8&addr=ZTc2OTkwYmY5MmNjYTc5ZmZlNTRlN2U5MjFkZTliMTQtMTgyLjQ4LjgyLjExNQ&expt=ZTc2OTkwYmY5MmNjYTc5ZmZlNTRlN2U5MjFkZTliMTQtU3VuIEp1bCAyOCAyMDI0IDE1OjU3OjU0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSk

import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// import toastService from '../utils/toastService';

import { useNavigate } from 'react-router-dom';

import { differenceInMinutes } from 'date-fns';
import getIP from 'utils/getIP';
import { baseURL } from 'api/baseURL';
import { setSession } from 'contexts/AuthContext';
import decrypt from 'utils/decrypt';
import useAuth from 'hooks/useAuth';
import { userLogin } from 'store/reducers/auth';

const LoggingIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserSession, setDbUserId, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const confirmLogin = async () => {
      const token = new URLSearchParams(location.search).get('token');

      //catch encryptedIp address
      const addr = new URLSearchParams(location.search).get('addr');

      //token expire time
      const expt = new URLSearchParams(location.search).get('expt');

      if (!addr) {
        return navigate('/login-error?error=invalid-ip');
      }

      if (!token) {
        return navigate('/login-error?error=invalid-token');
      }

      if (!expt) {
        return navigate('/login-error?error=invalid-link');
      }

      //decrypt the ip here
      const ip = decrypt(addr);

      const currentIp = await getIP();
      if (ip !== currentIp.ip) {
        return navigate('/login-error?error=invalid-ip');
      }

      //decrypt the expire time
      const expireTime = decrypt(expt);

      if (differenceInMinutes(new Date(), expireTime) > 1) {
        return navigate('/login-error?error=token-expired');
      }
      try {
        const { data } = await axios.get(`${baseURL}/Dealer/auth/confirm-login/${token}`, {
          withCredentials: true
        });
        if (data.accessToken) {
          setSession(data.accessToken);
        }
        if (data.dealer) {
          setUserSession(data.dealer);
          setDbUserId(data.dealer.Id);
          setSession(token);
          setIsLoggedIn(true);
        }
      } catch (error) {
        // toastService.throwErrorToast(error.response?.data?.message);
        console.log(error);
      }
    };
    confirmLogin();
  }, [location, userLogin, setSession]);

  return (
    <div className="loading-container">
      <div className="loading-content text-center">
        <h2>Please wait you are Logging In...</h2>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoggingIn;

// https://portal.ai-tuningfiles.com/confirm-login?token=8b72cda3d1b87f41c5043c8074b6d9c5f5794b494c0c95c2391f99a136e1cca3&addr=ZTc2OTkwYmY5MmNjYTc5ZmZlNTRlN2U5MjFkZTliMTQtW29iamVjdCBPYmplY3Rd&expt=ZTc2OTkwYmY5MmNjYTc5ZmZlNTRlN2U5MjFkZTliMTQtVHVlIEp1bCAzMCAyMDI0IDEyOjA0OjQ1IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSk

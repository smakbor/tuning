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
import MainCard from 'components/MainCard';
import { Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

const LoggingIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserSession, setDbUserId, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const confirmLogin = async () => {
      const token = new URLSearchParams(location.search).get('token');
      console.log(token);

      //catch encryptedIp address
      const addr = new URLSearchParams(location.search).get('addr');
      console.log(addr);

      //token expire time
      const expt = new URLSearchParams(location.search).get('expt');
      console.log(expt);

      if (!addr) {
        return navigate('/login-error?error=invalid-ip');
      }

      if (!token) {
        return navigate('/login-error?error=invalid-token');
      }

      if (!expt) {
        return navigate('/login-error?error=invalid-link');
      }

      // decrypt the ip here
      const ip = decrypt(addr);

      const currentIp = await getIP();
      console.log(currentIp);

      // if (ip !== currentIp.ip) {
      //   return navigate('/login-error?error=invalid-ip');
      // }

      // decrypt the expire time
      const expireTime = decrypt(expt);

      if (differenceInMinutes(new Date(), expireTime) > 1) {
        return navigate('/login-error?error=token-expired');
      }
      try {
        const { data } = await axios.get(`${baseURL}/Dealer/auth/confirm-login/${token}`, {
          withCredentials: true
        });
        console.log(data);
        if (data.accessToken) {
          setSession(data.accessToken);
        }
        if (data.dealer) {
          setUserSession(data.dealer);
          setDbUserId(data.dealer.Id);
          dispatch(userLogin(data));
        }
      } catch (error) {
        // toastService.throwErrorToast(error.response?.data?.message);
        console.log(error);
      }
    };
    confirmLogin();
  }, [location, setSession, userLogin, setIsLoggedIn, dispatch]);

  return (
    <MainCard sx={{ height: '100vh' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <MainCard sx={{ height: '40vh', width: '40vw', marginTop: '10rem', textAlign: 'center', border: '1px solid white' }}>
            <Typography variant="h3" color="gray">
              Please wait you are Logging In...
            </Typography>
            <Typography variant="h3" color="gray">
              Loading...
            </Typography>
          </MainCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default LoggingIn;

// https://portal.ai-tuningfiles.com/confirm-login?token=8b72cda3d1b87f41c5043c8074b6d9c5f5794b494c0c95c2391f99a136e1cca3&addr=ZTc2OTkwYmY5MmNjYTc5ZmZlNTRlN2U5MjFkZTliMTQtW29iamVjdCBPYmplY3Rd&expt=ZTc2OTkwYmY5MmNjYTc5ZmZlNTRlN2U5MjFkZTliMTQtVHVlIEp1bCAzMCAyMDI0IDEyOjA0OjQ1IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSk

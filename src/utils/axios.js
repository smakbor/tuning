import { baseURL } from 'api/baseURL';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import localStorageService from './localStorageService';
const axiosServices = axios.create({ baseURL });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      enqueueSnackbar('Connection Time out. Please Check Your internet Connection', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' }
      });
    }
    if (error.response?.status === 401 && !window.location.href.includes('/login')) {
      localStorage.removeItem('root-billing-token');
      window.location = '/auth/login';
    }
    if (error.response?.status === 422) {
      enqueueSnackbar(error.response?.data.error, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
    }

    if (error.response?.data.message) {
      enqueueSnackbar(error.response?.data.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
    }

    return Promise.reject((error.response && error.response?.data) || error);
  }
);

axiosServices.interceptors.request.use((config) => {
  const token = localStorageService.getItem('root-billing-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosServices;

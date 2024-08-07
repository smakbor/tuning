import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import { FormHelperText, Grid, Link, InputAdornment, InputLabel, OutlinedInput, Stack, Alert, AlertTitle, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from 'api/service/auth.service';
import LoadingButton from 'components/@extended/LoadingButton';
import { Error } from '@mui/icons-material';
import Transitions from 'components/@extended/Transitions';
import { Box } from '@mui/system';
import axios from 'axios';
import getIP from 'utils/getIP';
// import { baseURL } from 'api/baseURL';
import useAuth from 'hooks/useAuth';

// ============================|| JWT - LOGIN ||============================ //

const loginValidationSchema = Yup.object({
  email: Yup.string()
});

const AuthLogin = () => {
  //extract the login function from the useAuth hook

  const { setIsLoggedIn } = useAuth;

  // rtk login mutation
  const [login, { isLoading, isError, error: errorData }] = useLoginMutation();

  const navigate = useNavigate();

  // react-hook-form hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),

    defaultValues: {
      email: ''
      // password: 'RB-12345'
    }
  });

  // const { login } = useAuth();

  // form submit handler
  const submitHandler = async (formData) => {
    const ip = await getIP();
    try {
      await login({ email: formData.email, ip });
      // const { data } = await login({ email: formData.email, ip });

      // if (data.status == 'success') {
      //   navigate('/confirm');
      // }
    } catch (error) {
      if (error.statusCode === 422) {
        for (let { field, message } of error.data) {
          setError(field, {
            type: 'manual',
            message: message
          });
        }
      }
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form noValidate onSubmit={handleSubmit(submitHandler)}>
      {/* show alert on backend error response  */}
      {isError && (
        <Box>
          <Transitions type="slide" direction="down" in={true}>
            <Alert color="error" sx={{ marginBottom: 2 }} variant="border" icon={<Error />}>
              <AlertTitle sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{errorData?.data?.error || 'Internal Server Error'}</AlertTitle>
              <Typography variant="h6"> {errorData?.data?.message}</Typography>
            </Alert>
          </Transitions>
        </Box>
      )}

      {/* login field  */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login">Email</InputLabel>
            <OutlinedInput
              {...register('email', { required: true })}
              type="text"
              placeholder="Enter Mobile"
              fullWidth
              error={Boolean(errors.email)}
            />
            {errors.email && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.email.message}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        {/* <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              {...register('password', { required: true })}
              fullWidth
              error={Boolean(errors.password)}
              id="password-login"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter password"
            />
            {errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password.message}
              </FormHelperText>
            )}
          </Stack>
        </Grid> */}

        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Link variant="h6" component={RouterLink} to="/auth/forgot-password" color="text.primary">
              Forgot Password?
            </Link>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <AnimateButton>
            <LoadingButton
              disableElevation
              loading={isLoading}
              loadingPosition="start"
              disabled={isSubmitting || isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </LoadingButton>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

AuthLogin.propTypes = {
  isDemo: PropTypes.bool
};

export default AuthLogin;

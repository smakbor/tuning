import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
import { useClientLoginMutation } from 'api/service/auth.service';
import LoadingButton from 'components/@extended/LoadingButton';
import { Error } from '@mui/icons-material';
import Transitions from 'components/@extended/Transitions';
import { Box } from '@mui/system';

// ============================|| JWT - LOGIN ||============================ //

const loginValidationSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^01[3-9]\d{8}$/, 'Mobile number is not valid')
    .min(11)
    .max(15),
  password: Yup.string().max(255).required('Password is required')
});

const ClientAuthLogin = () => {
  //extract the login function from the useAuth hook

  // rtk login mutation
  const [clientLogin, { isLoading, isError, error: errorData }] = useClientLoginMutation();

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
      username: '',
      password: 'RB-12345'
    }
  });

  // const { login } = useAuth();

  // form submit handler
  const submitHandler = async (data) => {
    console.log(data);
    try {
      // clientLogin({ mobile: data.mobile, password: data.password });
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
            <InputLabel htmlFor="email-login">User Name</InputLabel>
            <OutlinedInput
              {...register('username', { required: true })}
              type="text"
              placeholder="Please enter username"
              fullWidth
              error={Boolean(errors.mobile)}
            />
            {errors.userName && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.userName.message}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>

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

ClientAuthLogin.propTypes = {
  isDemo: PropTypes.bool
};

export default ClientAuthLogin;

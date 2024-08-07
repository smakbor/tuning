import { useNavigate } from 'react-router-dom';

// material-ui
import { Box, Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';

// project import
import useAuth from 'hooks/useAuth';
import AnimateButton from 'components/@extended/AnimateButton';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from 'components/@extended/LoadingButton';
import { useEffect } from 'react';
import { useResetForgotPasswordMutation } from 'api/service/auth.service';
import { MarkChatRead, MarkChatReadOutlined, TextsmsOutlined } from '@mui/icons-material';
import { ArrowLeftOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {
  // ===================== validation schema =====================
  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^01[3-9]\d{8}$/, 'Phone number is not valid')
      .min(11, 'Phone number must be at list 11 digit')
      .max(15, 'Phone number must be at most 15 Digit')
      .required('Phone Number is Required')
  });

  // ============================= HOOKS =============================
  // -> AUTH CONTEXT CUSTOM HOOK
  const { isLoggedIn } = useAuth();
  // -> NAVIGATION
  const navigate = useNavigate();

  // ============================= RTK MUTATION =============================
  // @RESET PASSWORD MUTATION
  const [resetForgotPasswordRequest, { data, isLoading, isSuccess }] = useResetForgotPasswordMutation();

  // -> FORM CONTROL CUSTOM HOOK
  const {
    handleSubmit,
    formState: { errors },
    watch,
    register
  } = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      mobile: ''
    }
  });

  // ========================== FUNCTIONS ==========================
  const formSubmit = (data) => {
    console.log(data);
    resetForgotPasswordRequest(data);
  };

  // =================== USE EFFECT ===================
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard/default');
    }
  }, [isLoggedIn]);

  if (isSuccess) {
    return (
      <Stack gap={2} justifyContent="center" alignItems="center">
        <Box sx={{ fontSize: 100 }}>
          <MarkChatReadOutlined fontSize="inherit" color="success" />
        </Box>
        <Typography variant="h6" align="center">
          A new Password Sent to{' '}
          <Typography component="span" variant="h6" color="primary">
            {watch('mobile')}
          </Typography>
          . Please check your phone.
        </Typography>
        <Button startIcon={<ArrowLeftOutlined />} variant="contained" color="primary" fullWidth onClick={() => navigate('/auth/login')}>
          Back To Login
        </Button>
      </Stack>
    );
  } else {
    return (
      <Box component="form" onSubmit={handleSubmit(formSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phone">Phone Number</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(errors?.phone)}
                id="phone"
                type="text"
                name="mobile"
                placeholder="Enter phone Number"
                {...register('mobile')}
              />
              {errors?.phone && (
                <FormHelperText error id="phone">
                  {errors?.phone?.message}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <AnimateButton>
              <LoadingButton loading={isLoading} fullWidth size="large" type="submit" variant="contained" color="primary">
                Send Password
              </LoadingButton>
            </AnimateButton>
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default AuthForgotPassword;

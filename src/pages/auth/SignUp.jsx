import Typography from '@mui/material/Typography';
import AuthWrapper from 'sections/auth/AuthWrapper';
import { Box, Grid, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import _ from 'lodash';
import { useSignUpMutation } from 'api/service/auth.service';
import useFormHook from '../../components/custom/hooks/useFormHook';
import { useEffect } from 'react';
import FormComponent from 'components/custom/form/FormComponent';
import { useGetCountriesQuery } from 'api/service/countries.service';
import getIP from 'utils/getIP';
import AuthCard from 'sections/auth/AuthCard';
import AuthBackground from 'assets/images/auth/AuthBackground';
import logo from '../../assets/images/ai tuning logo1.png';
import car from '../../assets/images/background_car.jpg';

/**
 * DEFAULT VALUE
 * **/
const DEFAULT_VALUE = {
  firstName: '',
  lastName: '',
  address: '',
  country: '',
  phone: '',
  city: '',
  postcode: '',
  evcnumber: ''
};

const SignUp = () => {
  /***
   * RTK HOOKS
   * */
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation({ serializableCheck: false });
  const { data: countries = [] } = useGetCountriesQuery();

  /***
   * VALIDATION SCHEMA
   * **/
  const validationSchema = yup.object({
    firstName: yup.string().required('Please Enter Your First Name'),
    lastName: yup.string().required('Please Enter Your Last Name'),
    email: yup.string().required('Please Enter Your Email'),
    phone: yup.string().required('Please Enter Your Phone'),
    country: yup.string().required('Please Select Your Country'),
    city: yup.string().required('Please Select Your City'),
    address: yup.string().required('Please Enter Your Address'),
    postcode: yup.string().required('Please Enter Your Post Code'),
    evcnumber: yup.string().required('Please Enter Your Evc Number')
  });

  /***
   * REACT HOOK FORM CUSTOM HOOK
   **/
  const { control, formState, reset, setError, handleSubmit, watch } = useFormHook({ validationSchema, defaultValuesProp: DEFAULT_VALUE });

  /***
   * FORM HANDLE SUBMIT
   * **/
  const formSubmit = async (data) => {
    console.log(data);
    try {
      const ipData = await getIP();
      data.ip = ipData.ip;
      signUp(data);
    } catch (error) {
      const formError = error.response?.data?.data;
      enqueueSnackbar('Failed to registration', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });

      // set validation error
      if (Array.isArray(formError)) {
        for (const item of formError) {
          setError(item?.field, { message: item?.message, type: 'manual' });
        }
      }
    }
  };

  /****
   * FORM INPUT DATA
   * **/
  const formData = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'fname'
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'lname'
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Email ',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'email'
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Phone',
      placeholder: 'Phone',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'mobile'
    },

    {
      type: 'single-select',
      name: 'country',
      label: 'Country',
      placeholder: 'Select Country',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'country',
      options: countries
    },

    {
      type: 'text',
      name: 'city',
      label: 'City',
      placeholder: 'Enter City',
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'city'
    },

    {
      type: 'text',
      name: 'address',
      label: 'Address',
      placeholder: 'Enter your Address',
      value: '',
      size: 'large',
      visibility: true,
      disabled: false
    },
    {
      type: 'text',
      name: 'postcode',
      label: 'Post Code',
      placeholder: 'Post Code',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'postcode'
    },
    {
      type: 'number',
      name: 'evcnumber',
      label: 'Evc Number',
      placeholder: 'Enter Evc Number',
      required: true,
      value: '',
      size: 'large',
      visibility: true,
      disabled: false,
      id: 'evc'
    }
  ];

  /**
   * NAVIGATE TO LOGIN
   * **/
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/auth/login');
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      {/* <AuthWrapper> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${car})`,
          height: '100vh'
        }}
      >
        <Box sx={{ marginTop: '-4rem' }}>
          <img width="100%" height="250px" src={logo} alt="AI Tuning logo" />
        </Box>
        <Box sx={{ marginTop: '-2rem' }}>
          <AuthCard>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  sx={{
                    mb: { xs: -0.5, sm: 0.5 },
                    flexDirection: { xs: 'column', sm: 'row' }
                  }}
                >
                  <Typography variant="h3">Sign up</Typography>
                  <Typography component={Link} to={'/auth/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                    Already have an account?
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <FormComponent
                  {...{
                    formId: 'SignUp_id',
                    formSubmit,
                    defaultValuesProp: DEFAULT_VALUE,
                    formData,
                    validationSchema,
                    isUpdate: false,
                    handleSubmit,
                    control,
                    formState,
                    reset,
                    column: { xs: 1, sm: 2, md: 3, lg: 3 },
                    isLoading
                  }}
                />
              </Grid>
            </Grid>
          </AuthCard>
        </Box>
      </Box>
      {/* </AuthWrapper> */}
    </>
  );
};

export default SignUp;

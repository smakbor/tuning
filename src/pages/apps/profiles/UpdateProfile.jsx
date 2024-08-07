import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useGetCountriesQuery } from 'api/service/countries.service';
import useAuth from 'hooks/useAuth';
import { baseURL } from 'api/baseURL';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function ProfileEdit() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [post, setPost] = useState('');
  const [credits, setCredits] = useState('');
  const [userType, setUserType] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [submit, setSubmit] = useState(false);
  const [evcNumber, setEvcNumber] = useState('');

  const { data: countries = [] } = useGetCountriesQuery(undefined, {});
  console.log(countries);

  const { dbUserId } = useAuth();

  async function getRequests(token) {
    try {
      const { data } = await axios.get(`${baseURL}/Dealer/profile?id=${dbUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      setFirstname(data.data.firstname);
      setLastname(data.data.lastname);
      setEmail(data.data.email);
      setPhone(data.data.phone);
      setSelectedCountry(data.data.location);
      setCity(data.data.city);
      setAddress(data.data.address);
      setPost(data.data.postcode);
      setCredits(data.data.credits);
      setUserType(data.data.type);
      setEvcNumber(data.data.evcNumber);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      getRequests(token);
    }
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: 'top-center',
      theme: 'colored'
    });
  };
  const showSuccessMessage = () => {
    toast.success('Your profile has been updated', {
      position: 'top-center'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('location', selectedCountry);
    formData.append('postcode', post);
    formData.append('city', city);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('credits', credits);
    formData.append('type', userType);
    formData.append('id', dbUserId);
    formData.append('evcNumber', evcNumber);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/Admin/updateUser`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': import.meta.env.VITE_APP_API_KEY
        }
      });
      const { data } = response;
      if (data.message === 'updated') {
        showSuccessMessage();
      } else if (data.message === '33333 used') {
        showErrorMessage("You can't use 33333 as evc number");
      }
      setSubmit(false);
    } catch (error) {
      console.error('Error:', error.message);
      setSubmit(false);
    }
  };

  return (
    <Box>
      <MainCard sx={{ height: '58vh' }}>
        <Box sx={{ marginLeft: '1rem' }}>
          <Typography variant="h3">Profile</Typography>
        </Box>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  value={firstname}
                  type="text"
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  type="text"
                />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <TextField label="Credits" variant="outlined" fullWidth type="text" value={credits} disabled />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <TextField
                  label="Evc Number"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={evcNumber}
                  onChange={(e) => {
                    setEvcNumber(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <Form.Group controlId="mySelect">
                  <Form.Select style={{ background: '#201c1c', color: 'white' }} value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.6rem' }}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={address}
                  style={{ color: 'white' }}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box sx={{ padding: '.7rem' }}>
                <TextField
                  label="Postcode"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={post}
                  onChange={(e) => {
                    setPost(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ marginRight: '1rem' }}>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                  {/* <Button disabled={isLoading} variant="outlined" color="secondary" type="reset" onClick={reset}>
              Reset
            </Button> */}

                  <LoadingButton
                    //   loading={isLoading}
                    //   disabled={isLoading}
                    variant="contained"
                    loadingPosition="end"
                    endIcon={<SaveIcon />}
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </MainCard>
    </Box>
  );
}

export default ProfileEdit;

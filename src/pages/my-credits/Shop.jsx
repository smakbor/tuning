import { SaveFilled } from '@ant-design/icons';
import { Box, Button, Chip, CircularProgress, Dialog, Divider, Grid, Stack, styled, TextField, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import LoadingButton from 'components/@extended/LoadingButton';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useAuth from 'hooks/useAuth';
import { useBuyCreditsMutation, useBuyEvcCreditsMutation, useGetPricesQuery, useSubscribeMutation } from 'api/service/subscription.service';
import { useGetProfileQuery } from 'api/service/profile.service copy';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const paypalLogo = 'https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png';

function Shop() {
  //auth
  const { dbUserId } = useAuth();
  //rtk query
  const { data: prices } = useGetPricesQuery();
  const { data: profile } = useGetProfileQuery(dbUserId, {
    skip: !dbUserId
  });

  const [handleSubscribeMutation, { isLoading: subscriptionLoading }] = useSubscribeMutation();
  const [handleBuyCreditsMutation, { isLoading: buyCreditsLoading }] = useBuyCreditsMutation();
  const [handleBuyEvcCreditsMutation, { isLoading: buyEvcCreditsLoading }] = useBuyEvcCreditsMutation();

  // for control only one payment spinner
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [creditsModal, setCreditsModal] = useState(false);
  const [evcModal, setEvcModal] = useState(false);

  // for select payment method modal when buy credit
  const [purchaseCreditPaymentMethodModal, setPurchaseCreditPaymentMethodModal] = useState(false);

  // for select payment method modal when buy credit
  const [purchaseEvcPaymentMethodModal, setPurchaseEvcPaymentMethodModal] = useState(false);

  // for select payment method modal when subscription
  const [subscriptionPaymentMethodModal, setSubscriptionPaymentMethodModal] = useState(false);
  const [credit, setCredit] = useState(1);
  const [evcCredits, setEvcCredits] = useState(10);

  const handleDecrement = (isEvcCredit) => {
    if (isEvcCredit) {
      setEvcCredits((prevState) => prevState - 10);
      return;
    }
    if (credit - 1 > 0) {
      setCredit(credit - 1);
    }
  };

  const handleIncrement = (isEvcCredit) => {
    if (isEvcCredit) {
      setEvcCredits((prevState) => prevState + 10);
      return;
    }
    setCredit(credit + 1);
  };

  const showErrorMessage = (message) => {
    toast.error(message, {
      position: 'top-center',
      theme: 'colored'
    });
  };

  async function subscribe(paymentMethod) {
    setSelectedPaymentMethod(paymentMethod);
    try {
      const { data } = await handleSubscribeMutation({ dbUserId, paymentMethod });
      if (data.message === 'already') {
        showErrorMessage('You Already have a subscription');
      } else {
        window.location.href = data.sessionUrl;
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setSelectedPaymentMethod('');
  }

  async function buyCredits(paymentMethod) {
    setSelectedPaymentMethod(paymentMethod);
    try {
      const { data, error } = await handleBuyCreditsMutation({ dbUserId, paymentMethod, credits: credit });
      if (!error) {
        window.location.href = data.sessionUrl;
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setSelectedPaymentMethod('');
  }

  async function buyEvcCredits(paymentMethod) {
    setSelectedPaymentMethod(paymentMethod);
    try {
      const { data, error } = await handleBuyEvcCreditsMutation({ dbUserId, paymentMethod, evcCredits });
      if (!error) {
        window.location.href = data.sessionUrl;
      } else {
        showErrorMessage(error.data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
    setSelectedPaymentMethod('');
  }

  return (
    <>
      <Box>
        <Box sx={{ marginBottom: '1.3rem' }}>
          <Typography variant="h4">Shop</Typography>
        </Box>
        <MainCard sx={{ height: '78vh' }}>
          <Grid container columnSpacing={2}>
            <Grid item lg={4}>
              <MainCard
                title="Subscription"
                endHeaderContent={<Chip color="success" label="Annual fee: 1,200 €" size="small" variant="light" />}
                sx={{ border: '1px solid white', color: 'gray', height: '43vh' }}
              >
                <Grid container>
                  <Grid
                    container
                    item
                    lg={12}
                    sx={{ border: '1px solid gray', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}
                  >
                    <Grid item lg={7}>
                      <Typography variant="h5">Price per Solution-File: </Typography>
                    </Grid>
                    <Grid item lg={5}>
                      <Typography variant="h5">
                        <Chip color="success" label="10x free per day" size="small" variant="light" />
                      </Typography>
                    </Grid>
                    <Grid item lg={12} sx={{ textAlign: 'center', marginTop: '.5rem' }}>
                      <Typography variant="h5">Remaining quota is not transferable</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    lg={12}
                    sx={{ border: '1px solid gray', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}
                  >
                    <Grid item lg={8}>
                      <Typography variant="h5">Price Per Tuning-File :</Typography>
                    </Grid>
                    <Grid item lg={4}>
                      <Typography variant="h5">
                        {' '}
                        <Chip color="success" label="7 Credits" size="small" variant="light" />
                      </Typography>
                    </Grid>
                    <Grid item lg={12} sx={{ textAlign: 'center', marginTop: '.5rem' }}>
                      <Typography variant="h5">Multiple solutions included</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: '1rem' }}>
                      <LoadingButton
                        // loading={isLoading}
                        // disabled={isLoading}
                        variant="contained"
                        loadingPosition="end"
                        endIcon={<SaveFilled />}
                        type="submit"
                        color="primary"
                        onClick={() => setSubscriptionPaymentMethodModal(true)}
                      >
                        Buy Subscription
                      </LoadingButton>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>

            {/* Credits card here */}
            <Grid item lg={4}>
              <MainCard
                title="Credits"
                endHeaderContent={<Chip color="success" label={`Price Per credit:€ ${prices?.creditPrice}`} size="small" variant="light" />}
                sx={{ border: '1px solid white', color: 'gray', height: '43vh' }}
              >
                <Grid container>
                  <Grid
                    container
                    item
                    lg={12}
                    sx={{ border: '1px solid gray', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}
                  >
                    <Grid item lg={7}>
                      <Typography variant="h5">Price per Solution-File: </Typography>
                    </Grid>
                    <Grid item lg={5}>
                      <Typography variant="h5">
                        <Chip color="success" label="3 credits" size="small" variant="light" />
                      </Typography>
                    </Grid>
                    <Grid item lg={12} sx={{ textAlign: 'center', marginTop: '.5rem' }}>
                      <Typography variant="h5">Remaining quota is not transferable</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    lg={12}
                    sx={{ border: '1px solid gray', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}
                  >
                    <Grid item lg={8}>
                      <Typography variant="h5">Price Per Tuning-File :</Typography>
                    </Grid>
                    <Grid item lg={4}>
                      <Typography variant="h5">
                        {' '}
                        <Chip color="success" label="7 Credits" size="small" variant="light" />
                      </Typography>
                    </Grid>
                    <Grid item lg={12} sx={{ textAlign: 'center', marginTop: '.5rem' }}>
                      <Typography variant="h5">Multiple solutions included</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: '1rem' }}>
                      <LoadingButton
                        // loading={isLoading}
                        // disabled={isLoading}
                        variant="contained"
                        loadingPosition="end"
                        endIcon={<SaveFilled />}
                        type="submit"
                        color="primary"
                        onClick={() => {
                          setCreditsModal(true);
                        }}
                      >
                        Buy Credits
                      </LoadingButton>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>

            {/* EVC Credits here  */}
            {profile?.evcNumber && (
              <Grid item lg={4}>
                <MainCard
                  title="EVC Credit"
                  endHeaderContent={
                    <Chip color="success" label={`Price per EVC credit: €${prices?.evcPrice}`} size="small" variant="light" />
                  }
                  sx={{ border: '1px solid white', color: 'gray', height: '43vh' }}
                >
                  <Grid container>
                    <Grid
                      container
                      item
                      lg={12}
                      sx={{ border: '1px solid gray', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}
                    >
                      <Grid item lg={8}>
                        <Typography variant="h5">Price Per Tuning-File :</Typography>
                      </Grid>
                      <Grid item lg={4}>
                        <Typography variant="h5">
                          {' '}
                          <Chip color="success" label="7 Credits" size="small" variant="light" />
                        </Typography>
                      </Grid>
                      <Grid item lg={12} sx={{ textAlign: 'center', marginTop: '.5rem' }}>
                        <Typography variant="h5">Multiple solutions included</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ marginTop: '1rem' }}>
                        <LoadingButton
                          // loading={isLoading}
                          // disabled={isLoading}
                          variant="contained"
                          loadingPosition="end"
                          endIcon={<SaveFilled />}
                          type="submit"
                          color="primary"
                          onClick={() => {
                            setEvcModal(true);
                          }}
                        >
                          Buy EVC Credit(s)
                        </LoadingButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </Grid>
            )}
          </Grid>
        </MainCard>
      </Box>

      {/* Get Credits modal */}
      <BootstrapDialog size="lg" onClose={() => setCreditsModal(false)} open={creditsModal}>
        <MainCard
          title="Get Credits"
          endHeaderContent={<Chip color="success" label="Price: €10" variant="light" />}
          sx={{ border: '1px solid white', color: 'gray', height: '30vh' }}
        >
          <Grid container>
            <Grid container item lg={12} sx={{ border: '1px solid gray', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <Grid item lg={2}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleIncrement(false)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item lg={8}>
                <Box>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={evcCredits}
                    // onChange={(e) => setEvcCredits(e.target.value)}
                    type="number"
                  />
                </Box>
              </Grid>
              <Grid item lg={2}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleDecrement(false)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ marginTop: '1rem' }}>
                <LoadingButton
                  // loading={isLoading}
                  // disabled={isLoading}
                  variant="contained"
                  loadingPosition="end"
                  endIcon={<SaveFilled />}
                  type="submit"
                  color="error"
                  onClick={() => setPurchaseCreditPaymentMethodModal(true)}
                >
                  Proceed To Payment
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </BootstrapDialog>

      {/* get evc credits modal */}
      <BootstrapDialog size="lg" onClose={() => setEvcModal(false)} open={evcModal}>
        <MainCard
          title="Get Evc Credits"
          endHeaderContent={<Chip color="success" label="Price: €10" variant="light" />}
          sx={{ border: '1px solid white', color: 'gray', height: '30vh' }}
        >
          <Grid container>
            <Grid container item lg={12} sx={{ border: '1px solid gray', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <Grid item lg={2}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleIncrement(true)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item lg={8}>
                <Box>
                  <TextField variant="outlined" fullWidth value={evcCredits} type="number" />
                </Box>
              </Grid>
              <Grid item lg={2}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleDecrement(true)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ marginTop: '1rem' }}>
                <LoadingButton
                  // loading={isLoading}
                  // disabled={isLoading}
                  variant="contained"
                  loadingPosition="end"
                  endIcon={<SaveFilled />}
                  type="submit"
                  color="error"
                  onClick={() => setPurchaseEvcPaymentMethodModal(true)}
                >
                  Proceed To Payment
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </BootstrapDialog>

      {/* Payment for credits paypal modal */}
      <BootstrapDialog onClose={() => setPurchaseCreditPaymentMethodModal(false)} open={purchaseCreditPaymentMethodModal}>
        <MainCard
          title="Select A Payment Method"
          // endHeaderContent={<Chip color="success" label="Price: €10" variant="light" />}
          sx={{ border: '1px solid white', color: 'gray' }}
        >
          <Grid container>
            <Grid item lg={12}>
              <Box sx={{ marginBottom: '1rem' }}>
                <Typography variant="h4">Price :300</Typography>
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ background: 'white', textAlign: 'center', padding: '1rem', borderRadius: '8px' }}>
                <Button variant="outlined" onClick={() => buyCredits('paypal')} disabled={subscriptionLoading || buyCreditsLoading}>
                  {buyCreditsLoading && selectedPaymentMethod === 'paypal' ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <>
                      {' '}
                      <img width="68%" src={paypalLogo} alt="AI Tuning logo" />
                      Pay with PayPal
                    </>
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </BootstrapDialog>
      {/* Payment for evc credits paypal modal */}
      <BootstrapDialog onClose={() => setPurchaseEvcPaymentMethodModal(false)} open={purchaseEvcPaymentMethodModal}>
        <MainCard
          title="Select A Payment Method"
          // endHeaderContent={<Chip color="success" label="Price: €10" variant="light" />}
          sx={{ border: '1px solid white', color: 'gray' }}
        >
          <Grid container>
            <Grid item lg={12}>
              <Box sx={{ marginBottom: '1rem' }}>
                <Typography variant="h4">Price :300</Typography>
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ background: 'white', textAlign: 'center', padding: '1rem', borderRadius: '8px' }}>
                <Button
                  variant="outlined"
                  onClick={() => buyEvcCredits('paypal')}
                  disabled={subscriptionLoading || buyCreditsLoading || buyEvcCreditsLoading}
                >
                  {buyEvcCreditsLoading && selectedPaymentMethod === 'paypal' ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <>
                      {' '}
                      <img width="68%" src={paypalLogo} alt="AI Tuning logo" />
                      Pay with PayPal
                    </>
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </BootstrapDialog>
      {/* Payment for subscription paypal modal */}
      <BootstrapDialog onClose={() => setSubscriptionPaymentMethodModal(false)} open={subscriptionPaymentMethodModal}>
        <MainCard
          title="Select A Payment Method"
          // endHeaderContent={<Chip color="success" label="Price: €10" variant="light" />}
          sx={{ border: '1px solid white', color: 'gray' }}
        >
          <Grid container>
            <Grid item lg={12}>
              <Box sx={{ marginBottom: '1rem' }}>
                <Typography variant="h4">Price :300</Typography>
              </Box>
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ background: 'white', textAlign: 'center', padding: '1rem', borderRadius: '8px' }}>
                <Button variant="outlined" onClick={() => subscribe('paypal')} disabled={subscriptionLoading || buyCreditsLoading}>
                  {subscriptionLoading && selectedPaymentMethod === 'paypal' ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <>
                      {' '}
                      <img width="68%" src={paypalLogo} alt="AI Tuning logo" />
                      Pay with PayPal
                    </>
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MainCard>
      </BootstrapDialog>
    </>
  );
}

export default Shop;

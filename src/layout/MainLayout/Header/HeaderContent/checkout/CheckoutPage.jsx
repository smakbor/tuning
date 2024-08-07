import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  InputLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useGetProductsQuery } from 'api/service/inventory.service';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'components/MainCard';
import { DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import { addToCartByProductId, clearCart, removeToCartByProductId, updateProductQuantity } from 'store/reducers/productCart';
import { ClearAllOutlined } from '@mui/icons-material';
import QuantityIncrementDecrement from './QuantityIncrementDecrement';
import currency from 'currency.js';
import PaymentDetails from './SalePaymentDetails';
import { convertToLabel } from 'utils/form-label-converter';
import { useGetClientOptionQueryQuery } from 'api/service/client.service';

const CheckoutPage = ({ user, handleDrawerClose }) => {
  // ================== PACKAGES HOOKS ==================
  // -> LOCAL STATES
  const [productInput, setProductInput] = useState('');
  const [clientsInput, setClientsInput] = useState('');

  // console.log('productInput', productInput);
  // console.log('clientsInput', clientsInput);

  // -> THEME
  const theme = useTheme();

  // ================== REDUX HOOKS ==================
  // -> GET PRODUCT CART
  const { productCarts } = useSelector(({ productCarts }) => productCarts);

  // -> GET DISPATCH
  const dispatch = useDispatch();

  // @GET PRODUCT
  const { products, productOptions } = useGetProductsQuery(user?.merchant, {
    skip: !user,
    selectFromResult: ({ data }) => {
      const products = productCarts.map(({ id, quantity }) => {
        const product = { ...data?.find(({ _id }) => _id === id), quantity };
        return {
          ...product
        };
      });

      const productOptions = convertToLabel(data, 'name', '_id')?.filter((item) => !products.find((product) => product._id === item.value));

      return { products, productOptions };
    }
  });

  // @GET CLIENTS
  const { data: clients } = useGetClientOptionQueryQuery(user?.merchant, {
    skip: !user
  });

  // ================== FUNCTIONS ==================
  // REMOVE PRODUCT FROM CART
  const updateQuantity = (updateQuantityData) => {
    dispatch(updateProductQuantity(updateQuantityData));
  };

  // REMOVE ALL PRODUCT FROM CART
  const handleClearCart = () => {
    dispatch(clearCart());
    handleDrawerClose();
  };

  // HANDLE PRODUCT CHANGE
  const handleProductChange = (e, { value }) => {
    setProductInput(value);
    dispatch(addToCartByProductId({ id: value, quantity: 1 }));
  };
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {productCarts.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No product in cart
        </Typography>
      ) : (
        <>
          <MainCard>
            <Stack direction="row" alignItems="end" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton variant="light" onClick={handleDrawerClose}>
                  <LeftOutlined />
                </IconButton>
                <Typography variant="subtitle1">Payment Details</Typography>
              </Stack>
              <Box width={200}>
                <InputLabel>Select Client</InputLabel>
                <Autocomplete
                  id="combo-box-demo"
                  onChange={(e, value) => setClientsInput(value?.value)}
                  value={clients?.find((item) => item.value === clientsInput) || null}
                  options={clients}
                  fullWidth
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Client"
                      sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme?.palette?.text.primary } }}
                    />
                  )}
                />
              </Box>
              <Button startIcon={<ClearAllOutlined />} onClick={handleClearCart} variant="outlined" color="error">
                Clear Cart
              </Button>
            </Stack>
          </MainCard>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <MainCard>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MainCard
                  title={
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Typography variant="subtitle1">Product Cart</Typography>
                      <Chip color="primary" size="small" label={products?.length} />
                    </Stack>
                  }
                  endHeaderContent={
                    <Stack direction="row" gap={1}>
                      <Box width={200}>
                        <InputLabel>Select Product</InputLabel>
                        <Autocomplete
                          id="combo-box-demo"
                          onChange={handleProductChange}
                          value={productOptions?.find((item) => item.value === productInput) || null}
                          options={productOptions}
                          fullWidth
                          size="small"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Product"
                              sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme?.palette?.text.primary } }}
                            />
                          )}
                        />
                      </Box>
                      <Box width={200}>
                        <InputLabel>Select Product Item</InputLabel>
                        <Autocomplete
                          id="combo-box-demo"
                          onChange={handleProductChange}
                          value={productOptions?.find((item) => item.value === productInput) || null}
                          options={productOptions}
                          fullWidth
                          size="small"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Product"
                              sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme?.palette?.text.primary } }}
                            />
                          )}
                        />
                      </Box>
                    </Stack>
                  }
                >
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableBody>
                          {products?.map((row, index) => {
                            return (
                              <TableRow key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                      <Stack spacing={0}>
                                        <Typography variant="subtitle1" color="textPrimary" sx={{ textDecoration: 'none' }}>
                                          {row.name}
                                        </Typography>
                                      </Stack>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell align="right">
                                  <Stack alignItems="center">
                                    {row.salePrice && row.quantity && (
                                      <Typography variant="subtitle1">{currency(row.salePrice * row.quantity).format()}</Typography>
                                    )}
                                  </Stack>
                                </TableCell>
                                <TableCell align="right">
                                  <QuantityIncrementDecrement quantity={row.quantity} itemId={row._id} updateQuantity={updateQuantity} />
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    onClick={() => {
                                      if (products.length == 1) {
                                        dispatch(clearCart());
                                        handleDrawerClose();
                                      }
                                      dispatch(removeToCartByProductId(row._id));
                                    }}
                                    size="medium"
                                    sx={{ opacity: 0.5, '&:hover': { bgcolor: 'transparent' } }}
                                  >
                                    <DeleteOutlined style={{ color: 'grey.500' }} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </MainCard>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={3}>
                  <PaymentDetails paymentDetails={products} show />
                </Stack>
              </Grid>
            </Grid>
          </MainCard>

          <Stack>
            <Button variant="contained" sx={{ textTransform: 'none' }} fullWidth>
              Process to Checkout
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};

CheckoutPage.propTypes = {
  user: PropTypes.object,
  handleDrawerClose: PropTypes.func
};

export default CheckoutPage;

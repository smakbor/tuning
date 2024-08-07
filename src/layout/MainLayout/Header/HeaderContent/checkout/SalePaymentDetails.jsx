import PropTypes from 'prop-types';

// material-ui
import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

// third-party
import currency from 'currency.js';

// project imports
import MainCard from 'components/MainCard';

const SalePaymentDetails = ({ paymentDetails }) => {
  return (
    <Stack spacing={3}>
      <MainCard content={false}>
        <TableContainer>
          <Table sx={{ minWidth: 'auto' }} size="small" aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Payment Details</Typography>
                </TableCell>
                <TableCell />
              </TableRow>

              <TableRow>
                <TableCell sx={{ borderBottom: 'none', opacity: 0.5 }}>Memo Number</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {1209812937889}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none', opacity: 0.5 }}>Sub Total</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {paymentDetails.subtotal && <Typography variant="subtitle1">{currency(paymentDetails.subtotal).format()}</Typography>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none', opacity: 0.5 }}>Estimated Delivery</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {paymentDetails.shipping && (
                    <Typography variant="subtitle1">
                      {paymentDetails.shipping <= 0 ? '-' : currency(paymentDetails.shipping).format()}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: 'none', opacity: 0.5 }}>Voucher</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  {paymentDetails.discount && (
                    <Typography variant="subtitle1" sx={{ color: 'success.main' }}>
                      {paymentDetails.discount <= 0 ? '-' : currency(paymentDetails.discount).format()}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
      <MainCard>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Total</Typography>
          {paymentDetails.total && (
            <Typography variant="subtitle1" align="right">
              {currency(paymentDetails.total).format()}
            </Typography>
          )}
        </Stack>
      </MainCard>
    </Stack>
  );
};

SalePaymentDetails.propTypes = {
  paymentDetails: PropTypes.object.isRequired
};

export default SalePaymentDetails;

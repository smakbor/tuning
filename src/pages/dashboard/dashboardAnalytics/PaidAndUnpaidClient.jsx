import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import MoneyOffCsredRoundedIcon from '@mui/icons-material/MoneyOffCsredRounded';

// project import
import MainCard from 'components/MainCard';

// assets
import { FallOutlined, RiseOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const PaidAndUnpaidClient = ({
  color = 'primary',
  id,
  totalDue,
  totalBill,
  totalBalance,
  title,
  count,
  percentage,
  isLoss,
  extra,
  amountColor
}) => (
  <MainCard
    contentSX={{ p: 2.25 }}
    sx={{
      boxShadow: 1
    }}
  >
    <Stack spacing={0.5}>
      <Typography variant="h5" color={amountColor || 'inherit'}>
        <Box sx={{ color: 'white', display: 'inline-block', px: 1, bgcolor: '#f44336', borderRadius: 1 }}>
          <span style={{ textTransform: 'capitalize' }}> {id.toLowerCase()} </span>
          {title} {count}
        </Box>
      </Typography>
      <Grid container alignItems="start" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6">Monthly Bill: {totalBill} TK</Typography>
          <Typography variant="h6">Total Balance : {totalBalance} TK</Typography>

          <Typography variant="h6">Total Due : {totalDue} TK</Typography>
        </Grid>

        <Grid>
          <Box sx={{ mt: -3, p: 1, px: 1.4, bgcolor: '#e3f2fd', borderRadius: 2, color: '#f44336' }}>
            {(id === 'UNPAID' && <MoneyOffCsredRoundedIcon />) || (id !== 'UNPAID' && <PaidIcon />)}
          </Box>
        </Grid>
        {percentage && (
          <Grid item>
            <Chip
              variant="combined"
              color={color}
              icon={
                <>
                  {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                  {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          </Grid>
        )}
      </Grid>
    </Stack>
    {extra && (
      <Box sx={{ pt: 2.25 }}>
        <Typography variant="caption" color="textSecondary">
          You made an extra{' '}
          <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
            {extra}
          </Typography>{' '}
          this year
        </Typography>
      </Box>
    )}
  </MainCard>
);

PaidAndUnpaidClient.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  color: PropTypes.string,
  extra: PropTypes.string
};

export default PaidAndUnpaidClient;

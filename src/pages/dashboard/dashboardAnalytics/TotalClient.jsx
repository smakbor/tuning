import PropTypes from 'prop-types';

// material-ui
import { Avatar, Box, Chip, Grid, Stack, Typography } from '@mui/material';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
// project import
import MainCard from 'components/MainCard';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const TotalClient = ({ color = 'primary', id, totalDue, totalBill, totalBalance, title, count, isLoss, extra, amountColor }) => (
  <MainCard
    contentSX={{ p: 2.25 }}
    sx={{
      boxShadow: 1
    }}
  >
    <Stack spacing={0.5}>
      <Typography variant="h5" color={amountColor || 'inherit'}>
        <Box sx={{ color: 'primary.main', display: 'inline-block', borderRadius: 1 }}>
          {title} {count}
        </Box>
      </Typography>
      <Grid container alignItems="start" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6">Monthly Bill: {totalBill} TK</Typography>
          <Typography variant="h6">Total Balance : {totalBalance} TK</Typography>

          <Typography variant="h6">Total Due : {totalDue} TK</Typography>
        </Grid>

        <Grid item>
          <Box sx={{ mt: -3, p: 1, px: 1.4, bgcolor: '#e1f5fe', borderRadius: 2, color: '#2962ff' }}>
            <PeopleOutlineRoundedIcon />
          </Box>
        </Grid>
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

TotalClient.propTypes = {
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  color: PropTypes.string,
  extra: PropTypes.string
};

export default TotalClient;

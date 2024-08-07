import { Drawer } from '@mui/material';
import CheckoutPage from './CheckoutPage';
import PropTypes from 'prop-types';

const CheckoutCartDrawer = ({ open, user, handleDrawerClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={handleDrawerClose} sx={{ width: { xs: '100%', sm: 200 } }}>
      <CheckoutPage user={user} handleDrawerClose={handleDrawerClose} />
    </Drawer>
  );
};

CheckoutCartDrawer.propTypes = {
  handleDrawerClose: PropTypes.func,
  open: PropTypes.bool,
  user: PropTypes.object
};

export default CheckoutCartDrawer;

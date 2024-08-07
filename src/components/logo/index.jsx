import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { Box, ButtonBase, Typography } from '@mui/material';

// project import
import LogoMain from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';
import logo from '../../assets/images/ai tuning logo1.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ reverse, isIcon, sx, to }) => (
  <ButtonBase disableRipple component={Link} to={!to ? APP_DEFAULT_PATH : to} sx={sx}>
    {isIcon ? <LogoIcon /> : <LogoMain reverse={reverse} />}
    <Typography sx={{ color: 'blue', fontSize: '1.1rem', fontWeight: '600' }}>AI TUNING</Typography>
  </ButtonBase>
);

LogoSection.propTypes = {
  reverse: PropTypes.bool,
  isIcon: PropTypes.bool,
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;

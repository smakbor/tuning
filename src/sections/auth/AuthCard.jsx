import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }) => {
  const theme = useTheme();

  return (
    <MainCard
      sx={{
        // responsive the signUp and login card
        maxWidth: {
          xs: '100%',
          sm: 'calc(100% - 32px)',
          md: 'calc(100% - 30vw)',
          lg: 'calc(100% - 40vw)'
        },
        minWidth: { xs: '30vw' },
        margin: { xs: '1rem auto' },
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%'
        }
      }}
      content={false}
      {...other}
      border={false}
      boxShadow
      shadow={theme.customShadows.z1}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
};

AuthCard.propTypes = {
  children: PropTypes.node
};

export default AuthCard;

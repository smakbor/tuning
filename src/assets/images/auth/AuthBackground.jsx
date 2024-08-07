// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import logo from '../ai tuning logo1.png';

// types
import { ThemeDirection, ThemeMode } from 'config';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',

        zIndex: 1,

        left: '49.5%',
        // transform: theme.direction === ThemeDirection.RTL ? 'rotate(180deg) translateX(-50%)' : 'inherit translateX(-50%)'
        transform: 'translateX(-50%)'
      }}
    >
      <Box sx={{ width: { sx: '100%', md: '70%', lg: '100%' } }}>
        <img width="100%" height="calc(100vh - 175px)" src={logo} alt="AI Tuning logo" />
      </Box>
    </Box>
  );
};

export default AuthBackground;

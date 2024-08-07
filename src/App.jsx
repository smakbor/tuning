import { useState } from 'react';
import './App.css';

// project import
import Routes from 'routes';

import Loader from 'components/Loader';

import Snackbar from 'components/@extended/Snackbar';
import 'rsuite/dist/rsuite.min.css';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/AuthContext';

import { CustomProvider } from 'rsuite';
import { useTheme } from '@mui/material';

const App = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  if (loading) return <Loader />;

  return (
    <AuthProvider>
      <CustomProvider theme={theme.palette.mode}>
        <Routes />
        <Snackbar />
      </CustomProvider>
    </AuthProvider>
  );
};

export default App;

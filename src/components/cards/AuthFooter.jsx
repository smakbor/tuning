// material-ui
import { Container, Link, Stack, Typography, useMediaQuery } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Stack
        direction={matchDownSM ? 'column' : 'row'}
        justifyContent={matchDownSM ? 'center' : 'space-between'}
        spacing={2}
        textAlign={matchDownSM ? 'center' : 'inherit'}
      >
        <Typography variant="subtitle2" color="secondary" component="span"></Typography>

        <Stack direction={matchDownSM ? 'column' : 'row'} spacing={matchDownSM ? 1 : 3} textAlign={matchDownSM ? 'center' : 'inherit'}>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://shunnoit.com"
            target="_blank"
            underline="hover"
          ></Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="https://shunnoit.com"
            target="_blank"
            underline="hover"
          ></Typography>
          <Typography variant="subtitle2" color="secondary" component={Link} href="https://shunnoit.com" target="_blank" underline="hover">
            © All rights reserved Shunno IT
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthFooter;

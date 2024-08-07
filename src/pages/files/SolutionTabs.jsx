import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, Card, Tab, Tabs, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import adblue from './pics/adblue.png';
// assets
import { BookOutlined, FileImageOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';

// ==============================|| TAB PANEL ||============================== //

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  index: PropTypes.number
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| TABS - ICON ||============================== //

export default function SolutionTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title="Choose Your Solution">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            TabIndicatorProps={{ border: '1px solid gray' }}
            sx={{
              // Customize the background color
              '& .MuiTabs-indicator': {
                display: 'none' // Customize the indicator color
              },
              '& .MuiTab-root': {
                textTransform: 'none', // Remove uppercase transformation
                fontWeight: 'bold', // Customize font weight
                fontSize: '16px', // Customize font size
                '&.Mui-selected': {
                  background: '#186cdc',
                  color: 'black' // Customize the color of the selected tab
                }
              }
            }}
          >
            <Tab
              label="Deactivations"
              // icon={<UserOutlined />}
              iconPosition="start"
              {...a11yProps(0)}
              sx={{ fontSize: '1rem' }}
            />
            <Tab
              label="Tuning"
              //  icon={<BookOutlined />}
              iconPosition="start"
              {...a11yProps(1)}
              sx={{ fontSize: '1rem' }}
            />
            <Tab
              label="Miscle"
              //  icon={<UsergroupAddOutlined />}
              iconPosition="start"
              {...a11yProps(2)}
              sx={{ fontSize: '1rem' }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Card sx={{ padding: '.1rem', boxShadow: '20rem', background: 'white', marginBottom: '.7rem' }}>
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Box>
                <img alt="adblue" height="45px" width="45px" src={adblue} style={{ borderRadius: '5px', marginRight: '.5rem' }} />
              </Box>
              <Box sx={{ marginLeft: '-1rem' }}>
                <Typography variant="h6" sx={{ color: 'black', fontWeight: '800' }}>
                  AdbBlue
                </Typography>
              </Box>
            </Box>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h6">
            Suspendisse sed lectus ac nunc rhoncus scelerisque. Integer vitae fringilla leo. Aliquam tincidunt et turpis non mattis. Ut sed
            semper orci, sed facilisis mauris. Suspendisse blandit velit sit amet velit porta aliquet.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="h6">
            Nam egestas sollicitudin nisl, sit amet aliquam risus pharetra ac. Donec ac lacinia orci. Phasellus ut enim eu ligula placerat
            cursus in nec est.
          </Typography>
        </TabPanel>
      </Box>
    </MainCard>
  );
}

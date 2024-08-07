/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import DepositReport from './DepositReport';
import OwnDeposit from './OwnDeposit';

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

const DepositTabs = () => {
  const navigate = useNavigate();

  //Auth User
  const { user } = useAuth();

  // tap value state
  const [value, setValue] = useState(0);

  // tap value change handler
  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {}, []);

  return (
    <MainCard title="Deposit">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {user?.role !== 'MERCHANT' && <Tab label="Deposits" {...a11yProps(0)} />}
            <Tab label="Deposit Report" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {
          <TabPanel value={value} index={0}>
            <OwnDeposit />
          </TabPanel>
        }
        <TabPanel value={value} index={1}>
          <DepositReport />
        </TabPanel>
      </Box>
    </MainCard>
  );
};

export default DepositTabs;

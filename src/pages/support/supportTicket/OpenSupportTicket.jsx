import React, { useState } from 'react';

// custom component
import MainCard from 'components/MainCard';
import Ticket from './ticket/Ticket';
import CustomTab from 'components/custom/tab/CustomTab';
import CustomTabBody from 'components/custom/tab/CustomTabBody';
const OpenSupportTicket = () => {
  //========================||LOCAL STATES||========================//

  //---> Tab Index State
  const [tabIndex, setTabIndex] = useState(0);

  // ================ TAB DATA ================
  const tabsData = [
    {
      menuTitle: 'Ticket',
      component: <Ticket />
    }
  ];

  return (
    <>
      <MainCard title="Open Support Ticket">
        <CustomTab {...{ tabIndex, setTabIndex, tabMenus: tabsData }}>
          {tabsData.map((tab, index) => (
            <CustomTabBody key={index} {...{ tabIndex, index }}>
              {tab.component}
            </CustomTabBody>
          ))}
        </CustomTab>
      </MainCard>
    </>
  );
};

export default OpenSupportTicket;

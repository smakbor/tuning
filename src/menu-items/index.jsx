// project import
import dashboard from './dashboard';
import settings from './settings';
import configuration from './configuration';

import report from './report';

import reseller from './reseller';

import hrm from './hrm';
import invoice from './invoice';

import support from './support';
import makeRequest from './make_request';
import subscriptions from './subscriptions';
import profile from './profile';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    dashboard,
    // configuration,
    makeRequest,
    subscriptions,
    profile

    // reseller,

    // report,

    // hrm,
    // support,
    // expenditure,

    // invoice
    // settings
    // widget,
    // applications,
    // formsTables,
    // chartsMap,
    // pages,
    // other
  ]
};

export default menuItems;

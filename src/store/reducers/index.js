// third-party
import { combineReducers } from 'redux';
// project import
import chat from './chat';
import calendar from './calendar';
import menu from './menu';
import snackbar from './snackbar';

import kanban from './kanban';
import invoice from './invoice';
import { api } from 'api/apiConfig';
import authReducer from './auth';

import selectedRows from './selectedRows';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  chat,
  calendar,
  menu,
  snackbar,
  kanban,
  invoice,
  selectedRows
});

export default reducers;

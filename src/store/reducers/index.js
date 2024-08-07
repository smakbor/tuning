// third-party
import { combineReducers } from 'redux';
// project import
import chat from './chat';
import calendar from './calendar';
import menu from './menu';
import snackbar from './snackbar';
import productReducer from './product';
import cartReducer from './cart';
import kanban from './kanban';
import invoice from './invoice';
import { api } from 'api/apiConfig';
import authReducer from './auth';
import productCart from './productCart';
import selectedRows from './selectedRows';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  chat,
  calendar,
  menu,
  snackbar,
  cart: cartReducer,
  product: productReducer,
  kanban,
  invoice,
  productCarts: productCart,
  selectedRows
});

export default reducers;

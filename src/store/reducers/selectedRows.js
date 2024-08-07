// third-party
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //! MAKE SURE TO PROPERTY NAME SAME AS moduleName/rowHiddenName
  pppoeClient: {},
  pendingPppoeClient: {},
  blacklistedPppoeClient: {},
  frontEndSelectedRows: {}
};

const slice = createSlice({
  name: 'selectedRows',
  initialState,
  reducers: {
    // SET SELECTED ROW
    setReduxSelectedRows(state, { payload }) {
      if (!state[payload.moduleName]) {
        state[payload.moduleName] = {};
      }
      state[payload.moduleName][payload.page] = payload.data;
    },

    // CLEAR SELECTED_ROW
    clearReduxSelectedRows(state, { payload: rowHiddenName }) {
      state[rowHiddenName] = {};
    },

    // SET FRONT END SELECTED ROWS
    setFrontEndSelectedRows(state, { payload }) {
      if (!state.frontEndSelectedRows[payload.rowHiddenName]) {
        state.frontEndSelectedRows[payload.rowHiddenName] = {};
      }

      state.frontEndSelectedRows[payload.rowHiddenName] = payload.data;
    },

    // CLEAR FRONT END SELECTED ROWS
    clearFrontEndSelectedRows(state, { payload: rowHiddenName }) {
      state.frontEndSelectedRows[rowHiddenName] = {};
    }
  }
});

export const { setReduxSelectedRows, clearReduxSelectedRows, setFrontEndSelectedRows, clearFrontEndSelectedRows } = slice.actions;
// Reducer
export default slice.reducer;

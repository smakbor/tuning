// action - state management
import { createSlice } from '@reduxjs/toolkit';
import { setSession } from 'contexts/AuthContext';
import jwtDecode from 'jwt-decode';
import localStorageService from 'utils/localStorageService';

// initial state
export const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  token: null
  // permissions: {},
  // branch: null,
  // settingData: {}
};

//
const setActiveBranch = (state, payload, branchId) => {
  if (Array.isArray(payload)) {
    const activeBranch = payload.find((item) => item._id === branchId);
    state.branch = activeBranch;
  }
};

// ==============================|| AUTH REDUCER ||============================== //

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const data = action.payload;
      console.log(data);
      // const decodedToken = jwtDecode(accessToken);

      if (data) {
        state.isInitialized = true;
        state.isLoggedIn = true;
        state.token = data.accessToken;
      } else {
        console.log('error');
      }
      // state.isInitialized = true;
      // state.userSession = userSession;
      // state.token = accessToken;
      // state.dbUserId = dbUserId;
      // setSession(accessToken);
    },
    // creating a token when change branch
    revalidateToken: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
      setSession(accessToken);
    },

    branchReducer: (state, { payload }) => {
      const decodedToken = jwtDecode(state.token);
      setActiveBranch(state, payload, decodedToken.branch);
    },

    userLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isInitialized = true;
      state.branch = null;
      setSession(null);
    },
    updateAvatar: (state, { payload }) => {
      state.user.avatar = payload;
    },
    userProfileUpdate: (state, { payload }) => {
      state.user = payload;
    },
    updateLogo: (state, { payload }) => {
      state.user.logo = payload;
    },
    userPermission: (state, { payload }) => {
      // state.permission = payload;
    }
  }
});

export const {
  userLogin,
  userLogout,
  userProfile,
  updateAvatar,
  userProfileUpdate,
  updateLogo,
  userPermission,
  branchReducer,
  revalidateToken
} = authSlice.actions;
export default authSlice.reducer;

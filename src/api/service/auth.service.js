import { api } from 'api/apiConfig';
import { userLogin } from 'store/reducers/auth';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => {
        return {
          url: `Dealer/auth/login`,
          method: 'POST',
          body,
          credentials: 'include'
        };
      }
      // async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     // console.log(data);
      //     dispatch(userLogin(data));
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
    }),

    // @RESET FORGOT PASSWORD
    resetForgotPassword: build.mutation({
      query: (body) => {
        return {
          url: '/users/reset',
          method: 'PATCH',
          body
        };
      }
    }),

    getProfile: build.query({
      query: () => {
        return {
          url: '/Dealer/profile',
          method: 'GET'
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = localStorage.getItem('root-billing-token');
          dispatch(userLogin({ user: data.data, accessToken: token }));
        } catch (error) {
          console.log(error);
        }
      }
    }),

    // sign up
    signUp: build.mutation({
      query: (body) => {
        return {
          url: '/Dealer/register',
          method: 'POST',
          body: body
        };
      }
    })
  })
});

export const {
  useLoginMutation,
  useSignUpPackagesQuery,
  useLazyGetProfileQuery,
  useSignUpMutation,
  useClientLoginMutation,
  useResetForgotPasswordMutation
} = authApi;

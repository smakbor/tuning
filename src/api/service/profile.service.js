import { api } from 'api/apiConfig';
import { updateAvatar, userProfileUpdate, updateLogo } from 'store/reducers/auth';

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateAvatar: build.mutation({
      query: ({ body, id }) => {
        return {
          url: `profile/${id}?upload=true`,
          method: 'PATCH',
          body
        };
      },
      async onQueryStarted({ setSelectedImage }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateAvatar(data.data));
          setSelectedImage(null);
        } catch (error) {
          console.log(error);
        }
      }
    }),
    updateProfile: build.mutation({
      query: ({ body, id }) => ({
        url: `profile/${id}?upload=false`,
        method: 'PATCH',
        body
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userProfileUpdate(data.data));
        } catch (error) {
          console.log(error);
        }
      }
    }),

    updatePassword: build.mutation({
      query: ({ body, id }) => {
        return {
          url: `users/reset/${id}`,
          method: 'PATCH',
          body
        };
      }
    }),

    updateMobileNumber: build.mutation({
      query: ({ body, id }) => {
        return {
          url: `profile/${id}?upload=false`,
          method: 'PATCH',
          body
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userProfileUpdate(data.data));
        } catch (error) {
          console.log(error);
        }
      }
    }),

    updateLogo: build.mutation({
      query: ({ body, id }) => {
        return {
          url: `/profile/logo/${id}`,
          method: 'PATCH',
          body
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateLogo(data.data));
        } catch (error) {
          console.log(error);
        }
      }
    })
  })
});

export const {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useUpdateLogoMutation,
  useUpdatePasswordMutation,
  useUpdateMobileNumberMutation
} = profileApi;

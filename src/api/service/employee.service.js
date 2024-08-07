import { api } from 'api/apiConfig';
import dispatcher from 'utils/dispatcher/dispatcher';

export const employeeApi = api.injectEndpoints({
  endpoints: (build) => ({
    // ========================= EMPLOYEE ENDPOINTS ===========================
    // GET EMPLOYEE API
    getEmployee: build.query({
      query: () => {
        return {
          url: `/employees`,
          method: 'GET'
        };
      },
      transformResponse: (response) => {
        return response?.data;
      }
    }),

    // GET EMPLOYEE TRASH
    getEmployeeTrash: build.query({
      query: () => {
        return {
          url: `/trash/employee`,
          method: 'GET'
        };
      },
      transformResponse: (response) => {
        return response?.data;
      }
    }),

    // ADD EMPLOYEE
    addEmployee: build.mutation({
      query: ({ data }) => {
        return {
          url: '/employees',
          method: 'POST',
          body: data
        };
      },
      async onQueryStarted({ data, handleCloseDialog, setError, reset }, { queryFulfilled, dispatch }) {
        dispatcher.create(queryFulfilled, dispatch, handleCloseDialog, 'getEmployee', data.merchant, setError, reset);
      }
    }),

    // UPDATE EMPLOYEE
    updateEmployee: build.mutation({
      query: ({ data, employeeId }) => {
        return {
          url: `/employees/${employeeId}`,
          method: 'PATCH',
          body: data
        };
      },
      async onQueryStarted({ handleCloseDialog, setError }, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getEmployee', data.merchant, (draft) => {
              const index = draft.findIndex((item) => item._id === data._id);
              if (index !== -1) {
                draft[index] = data;
              }
            })
          );
          if (typeof handleCloseDialog === 'function') {
            handleCloseDialog();
          }
        } catch (error) {
          setError(error);
        }
      }
    }),

    // DELETE EMPLOYEE
    deleteOrRestoreEmployee: build.mutation({
      query: ({ employeeId, isTrash }) => {
        return {
          url: `/employees/delete/${employeeId}?isTrash=${isTrash}`,
          method: 'PATCH'
        };
      },
      async onQueryStarted({ handleDeleteSuccess, merchant }, { queryFulfilled, dispatch }) {
        dispatcher.deleteData(queryFulfilled, dispatch, handleDeleteSuccess, 'getEmployee', 'getEmployeeTrash', merchant);
      }
    }),

    // =================== EMPLOYEE ROLE ENDPOINTS ===================
    // GET EMPLOYEE ROLE
    getEmployeeRole: build.query({
      query: () => {
        return {
          url: `/employees/role`,
          method: 'GET'
        };
      },
      transformResponse: (response) => {
        return response?.data;
      }
    }),

    // GET PAY HEAD TRASH
    getEmployeeRoleTrash: build.query({
      query: () => {
        return {
          url: `/trash/pay-head`,
          method: 'GET'
        };
      },
      transformResponse: (response) => {
        return response?.data;
      }
    }),

    // CREATE EMPLOYEE ROLE
    createEmployeeRole: build.mutation({
      query: ({ data }) => {
        return {
          url: '/employees/role',
          method: 'POST',
          body: data
        };
      },
      async onQueryStarted({ data, handleCloseDialog, setError, reset }, { queryFulfilled, dispatch }) {
        dispatcher.create(queryFulfilled, dispatch, handleCloseDialog, 'getEmployeeRole', data.merchant, setError, reset);
      }
    }),

    // UPDATE EMPLOYEE ROLE
    updateEmployeeRole: build.mutation({
      query: ({ data }) => {
        return {
          url: `/employees/role/${data._id}`,
          method: 'PATCH',
          body: data
        };
      },
      async onQueryStarted({ handleCloseDialog, setError, merchant }, { queryFulfilled, dispatch }) {
        dispatcher.update(queryFulfilled, dispatch, handleCloseDialog, 'getEmployeeRole', merchant, setError);
      }
    }),

    // DELETE EMPLOYEE ROLE
    deleteOrRestoreEmployeeRole: build.mutation({
      query: ({ employeeRoleId, isTrash }) => {
        return {
          url: `employees/role/delete/${employeeRoleId}?isTrash=${isTrash}`,
          method: 'PATCH'
        };
      },
      async onQueryStarted({ handleDeleteSuccess, merchant }, { queryFulfilled, dispatch }) {
        dispatcher.deleteData(queryFulfilled, dispatch, handleDeleteSuccess, 'getEmployeeRoleTrash', 'getEmployeeRole', merchant);
      }
    })
  })
});

export const {
  // EMPLOYEE
  useGetEmployeeQuery,
  useLazyGetEmployeeQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteOrRestoreEmployeeMutation,
  useGetEmployeeTrashQuery,

  // EMPLOYEE ROLE
  useGetEmployeeRoleQuery,
  useGetEmployeeRoleTrashQuery,
  useCreateEmployeeRoleMutation,
  useUpdateEmployeeRoleMutation,
  useDeleteOrRestoreEmployeeRoleMutation
} = employeeApi;

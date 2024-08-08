import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const DashboardStatistics = Loadable(lazy(() => import('pages/dashboard/Dashboard')));

const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));

//user profile
const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const UpdateProfilePassword = Loadable(lazy(() => import('pages/apps/profiles/UpdateProfilePassword')));
const UpdateProfilePhone = Loadable(lazy(() => import('pages/apps/profiles/UpdateProfilePhone')));
const UserTabPayment = Loadable(lazy(() => import('sections/apps/profiles/user/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('sections/apps/profiles/user/TabPassword')));
const AccountTabRole = Loadable(lazy(() => import('sections/apps/profiles/account/TabRole')));
const UserTabSettings = Loadable(lazy(() => import('sections/apps/profiles/user/TabSettings')));

//Account profile
const AccountProfile = Loadable(lazy(() => import('pages/apps/profiles/account')));
const AccountTabProfile = Loadable(lazy(() => import('sections/apps/profiles/account/TabProfile')));
const AccountTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/account/TabPersonal')));
const AccountTabAccount = Loadable(lazy(() => import('sections/apps/profiles/account/TabAccount')));
const AccountTabPassword = Loadable(lazy(() => import('sections/apps/profiles/account/TabPassword')));
const AccountTabSettings = Loadable(lazy(() => import('sections/apps/profiles/account/TabSettings')));

const ReactTableBasic = Loadable(lazy(() => import('pages/tables/react-table/basic')));
const ReactTableSorting = Loadable(lazy(() => import('pages/tables/react-table/sorting')));
const ReactTableFiltering = Loadable(lazy(() => import('pages/tables/react-table/filtering')));
const ReactTableGrouping = Loadable(lazy(() => import('pages/tables/react-table/grouping')));
const ReactTablePagination = Loadable(lazy(() => import('pages/tables/react-table/pagination')));
const ReactTableRowSelection = Loadable(lazy(() => import('pages/tables/react-table/row-selection')));
const ReactTableExpanding = Loadable(lazy(() => import('pages/tables/react-table/expanding')));
const ReactTableEditable = Loadable(lazy(() => import('pages/tables/react-table/editable')));
const ReactTableDragDrop = Loadable(lazy(() => import('pages/tables/react-table/drag-drop')));
const ReactTableColumnHiding = Loadable(lazy(() => import('pages/tables/react-table/column-hiding')));
const ReactTableColumnResizing = Loadable(lazy(() => import('pages/tables/react-table/column-resizing')));
const ReactTableStickyTable = Loadable(lazy(() => import('pages/tables/react-table/sticky')));
const ReactTableUmbrella = Loadable(lazy(() => import('pages/tables/react-table/umbrella')));
const ReactTableEmpty = Loadable(lazy(() => import('pages/tables/react-table/empty')));
const ReactTableVirtualized = Loadable(lazy(() => import('pages/tables/react-table/virtualized')));

// render - charts & map
const ChartApexchart = Loadable(lazy(() => import('pages/charts/apexchart')));
const ChartOrganization = Loadable(lazy(() => import('pages/charts/org-chart')));

// table routing
const MuiTableBasic = Loadable(lazy(() => import('pages/tables/mui-table/basic')));
const MuiTableDense = Loadable(lazy(() => import('pages/tables/mui-table/dense')));
const MuiTableEnhanced = Loadable(lazy(() => import('pages/tables/mui-table/enhanced')));
const MuiTableDatatable = Loadable(lazy(() => import('pages/tables/mui-table/datatable')));
const MuiTableCustom = Loadable(lazy(() => import('pages/tables/mui-table/custom')));
const MuiTableFixedHeader = Loadable(lazy(() => import('pages/tables/mui-table/fixed-header')));
const MuiTableCollapse = Loadable(lazy(() => import('pages/tables/mui-table/collapse')));

// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
// const PricingPage = Loadable(lazy(() => import('pages/extra-pages/pricing')));

// Employee
// const Employee = Loadable(lazy(() => import('pages/staff/employee/Employee')));
// const EmployeeRole = Loadable(lazy(() => import('pages/staff/employee/role/EmployeeRole')));
// const EmployeeSalary = Loadable(lazy(() => import('pages/staff/employee/employee-salary/EmployeeSalary')));

// //  Employee Profile
// const EmployeeProfile = Loadable(lazy(() => import('pages/staff/employee/employee-profile/EmployeeProfile')));
// const Permission = Loadable(lazy(() => import('pages/staff/employee/employee-profile/Permission')));
// const EmployeeInformation = Loadable(lazy(() => import('pages/staff/employee/employee-profile/EmployeInformation')));

import { routeRoles } from 'utils/constant/roles';

// payment page
// const Payment = Loadable(lazy(() => import('pages/payment/Payment')));
// const Success = Loadable(lazy(() => import('pages/payment/Success')));
// const Failed = Loadable(lazy(() => import('pages/payment/Failed')));
// const Execute = Loadable(lazy(() => import('pages/payment/Execute')));
// const Error = Loadable(lazy(() => import('pages/payment/Error')));

// -> ACCOUNT
// income
const IncomeType = Loadable(lazy(() => import('pages/income/incomeType/IncomeType')));

// // =========|| invoice import ||======== //
// const InvoiceList = Loadable(lazy(() => import('pages/invoice/invoiceList/InvoiceList')));
// const InvoiceDetails = Loadable(lazy(() => import('pages/invoice/invoice-details/InvoiceDetails')));

// ==============================|| MAIN ROUTING ||============================== //

//profile

const ProfileView = Loadable(lazy(() => import('pages/apps/profiles/ViewProfile')));
const MediaUpload = Loadable(lazy(() => import('pages/apps/profiles/UploadFile')));

// branch
// const Branch = Loadable(lazy(() => import('pages/branch/Branch')));

import MyRequest from 'pages/my-request/MyRequest';
import MyCredits from 'pages/my-credits/MyCredits';
import Shop from 'pages/my-credits/Shop';
import BasicModal from 'pages/Modal';
import MyFiles from 'pages/files/MyFiles';
import ProfileEdit from 'pages/apps/profiles/UpdateProfile';
// import MerchantInvoice from 'pages/admin-panel/merchant/merchant-invoice/MerchantInvoice';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        // <AuthGuard>
        <MainLayout />
        // </AuthGuard>
      ),

      // ====================== ADMIN PANEL ======================

      children: [
        // ====================== DASHBOARD ======================
        {
          path: 'dashboard',
          element: <DashboardStatistics />
        },
        {
          path: 'test',
          element: <BasicModal />
        },
        {
          path: 'get-solutions',
          element: <MyFiles />
        },

        // =========================|| Admin Routes end here ||==========================//
        // =======================|| Merchant Routes start here ||======================//

        {
          path: 'profiles',
          children: [
            {
              path: 'view',
              element: <ProfileView />,
              roles: routeRoles.profile.viewProfile
            },
            // {
            //   path: 'branch',
            //   element: <Branch />,
            //   roles: routeRoles.profile.branch
            // },
            {
              path: 'account',
              element: <AccountProfile />,
              children: [
                {
                  path: 'basic',
                  element: <AccountTabProfile />
                },
                {
                  path: 'personal',
                  element: <AccountTabPersonal />
                },
                {
                  path: 'my-account',
                  element: <AccountTabAccount />
                },
                {
                  path: 'password',
                  element: <AccountTabPassword />
                },
                {
                  path: 'role',
                  element: <AccountTabRole />
                },
                {
                  path: 'settings',
                  element: <AccountTabSettings />
                }
              ]
            },
            {
              path: 'user',
              element: <UserProfile />,
              children: [
                {
                  path: 'update',
                  children: [
                    {
                      path: 'personal-info',
                      element: <ProfileEdit />
                    },
                    {
                      path: 'password',
                      element: <UpdateProfilePassword />
                    },
                    {
                      path: 'phone',
                      element: <UpdateProfilePhone />
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: 'settings',
          children: [
            {
              path: 'logo',
              element: <MediaUpload />,
              roles: routeRoles.settings.logo
            }
          ]
        },

        ///===================== CONFIGURATION ============================
        {
          path: '',
          children: [
            {
              path: 'my-request',
              element: <MyRequest />
            }
          ]
        },
        {
          path: '',
          children: [
            {
              path: 'credits',
              element: <MyCredits />
            },
            {
              path: 'subscriptions',
              element: <Shop />
            }
          ]
        },

        // =============|| Invoice ||=============== //
        // {
        //   path: 'invoice',
        //   children: [
        //     {
        //       path: 'list',
        //       element: <InvoiceList />,
        //       roles: [roles.MERCHANT, roles.ADMIN, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE]
        //     },
        //     {
        //       path: 'details/:invoiceId',
        //       element: <InvoiceDetails />,
        //       roles: [roles.MERCHANT, roles.ADMIN, roles.RESELLER, roles.SUB_RESELLER, roles.EMPLOYEE]
        //     }
        //   ]
        // },

        // {
        //   path: 'payment',
        //   children: [
        //     {
        //       path: 'merchant',
        //       element: <Payment />
        //     },
        //     {
        //       path: 'execute',
        //       element: <Execute />
        //     },
        //     {
        //       path: 'success',
        //       element: <Success />
        //     },
        //     {
        //       path: 'failed',
        //       element: <Failed />
        //     },
        //     {
        //       path: 'error',
        //       element: <Error />
        //     }
        //   ]
        // },

        //================ REPORT =====================
        // {
        //   path: 'report',
        //   roles: routeRoles.report.report,
        //   permissionKey: 'report',
        //   children: [
        //     {
        //       path: 'reseller-collection',
        //       element: <ResellerCollection />,
        //       permissionKey: 'report',
        //       roles: routeRoles.report.resellerCollection
        //     },
        //     {
        //       path: 'bill-report',
        //       element: <BillReport />,
        //       permissionKey: 'report',
        //       roles: routeRoles.report.billReport
        //     },
        //     {
        //       path: 'commission',
        //       element: <Commission />,
        //       permissionKey: 'report',
        //       roles: routeRoles.report.commission
        //     }
        //   ]
        // },

        //================================ EMPLOYEE ==============================
        // {
        //   path: 'employee',
        //   children: [
        //     {
        //       path: '',
        //       element: <Employee />,
        //       permissionKey: 'employee',
        //       roles: routeRoles.employee.employee
        //     },
        //     {
        //       path: 'role',
        //       element: <EmployeeRole />,
        //       permissionKey: 'employee',
        //       roles: routeRoles.employee.employeeRole
        //     },
        //     {
        //       path: 'salary',
        //       element: <EmployeeSalary />,
        //       permissionKey: 'employee',
        //       roles: routeRoles.employee.employeeSalary
        //     },

        //     {
        //       path: 'profile/:profileId',
        //       element: <EmployeeProfile />,
        //       permissionKey: 'employee',
        //       roles: routeRoles.employee.profile,
        //       children: [
        //         {
        //           path: 'employee-information',
        //           element: <EmployeeInformation />,
        //           permissionKey: 'employee',
        //           roles: routeRoles.employee.information
        //         },
        //         {
        //           path: 'permission',
        //           element: <Permission />,
        //           permissionKey: 'employee',
        //           roles: routeRoles.employee.permission
        //         }
        //       ]
        //     }
        //   ]
        // },

        {
          path: 'tables',
          children: [
            {
              path: 'react-table',
              children: [
                // {
                //   path: 'custom',
                //   element: <RenderTable />
                // },
                {
                  path: 'basic',
                  element: <ReactTableBasic />
                },
                {
                  path: 'sorting',
                  element: <ReactTableSorting />
                },
                {
                  path: 'filtering',
                  element: <ReactTableFiltering />
                },
                {
                  path: 'grouping',
                  element: <ReactTableGrouping />
                },
                {
                  path: 'pagination',
                  element: <ReactTablePagination />
                },
                {
                  path: 'row-selection',
                  element: <ReactTableRowSelection />
                },
                {
                  path: 'expanding',
                  element: <ReactTableExpanding />
                },
                {
                  path: 'editable',
                  element: <ReactTableEditable />
                },
                {
                  path: 'drag-drop',
                  element: <ReactTableDragDrop />
                },
                {
                  path: 'column-hiding',
                  element: <ReactTableColumnHiding />
                },
                {
                  path: 'column-resizing',
                  element: <ReactTableColumnResizing />
                },
                {
                  path: 'sticky-table',
                  element: <ReactTableStickyTable />
                },
                {
                  path: 'umbrella',
                  element: <ReactTableUmbrella />
                },
                {
                  path: 'empty',
                  element: <ReactTableEmpty />
                },
                {
                  path: 'virtualized',
                  element: <ReactTableVirtualized />
                }
              ]
            },
            {
              path: 'mui-table',
              children: [
                {
                  path: 'basic',
                  element: <MuiTableBasic />
                },
                {
                  path: 'dense',
                  element: <MuiTableDense />
                },
                {
                  path: 'enhanced',
                  element: <MuiTableEnhanced />
                },
                {
                  path: 'datatable',
                  element: <MuiTableDatatable />
                },
                {
                  path: 'custom',
                  element: <MuiTableCustom />
                },
                {
                  path: 'fixed-header',
                  element: <MuiTableFixedHeader />
                },
                {
                  path: 'collapse',
                  element: <MuiTableCollapse />
                }
              ]
            }
          ]
        },
        {
          path: 'charts',
          children: [
            {
              path: 'apexchart',
              element: <ChartApexchart />
            },
            {
              path: 'org-chart',
              element: <ChartOrganization />
            }
          ]
        }
        // {
        //   path: 'sample-page',
        //   element: <SamplePage />
        // },
        // {
        //   path: 'pricing',
        //   element: <PricingPage />
        // }
      ]
    }
  ]
};

export default MainRoutes;

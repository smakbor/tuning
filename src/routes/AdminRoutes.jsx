// import { lazy } from 'react';
// import MainLayout from 'layout/MainLayout';
// import DashboardAnalytics from 'pages/dashboard/analytics';
// import DashboardDefault from 'pages/dashboard/default';
// import { roles, routeRoles } from 'utils/constant/roles';
// import AuthGuard from 'utils/route-guard/AuthGuard';
// import Merchant from 'pages/admin-panel/merchant/Merchant';
// import PaymentGateway from 'pages/admin-panel/dashboard/payment-gateway/PaymentGateway';
// import ProfileInfoTabs from 'pages/admin-panel/merchant/merchant-profileInfo/ProfileTabs';
// import MerchantProfileInfo from 'pages/admin-panel/merchant/merchant-profileInfo/MerchantProfileInfo';
// import MerchantPermissions from 'pages/admin-panel/merchant/merchant-profileInfo/MerchantPermission';
// import MerchantBranch from 'pages/admin-panel/merchant/merchant-branch/MerchantBranch';
// import SupportNumber from 'pages/admin-panel/support-number/SupportNumber';
// import Admin from 'pages/admin-panel/admin/Admin';
// import MerchantInvoice from 'pages/admin-panel/merchant/merchant-invoice/MerchantInvoice';
// import MerchantPaymentGateway from 'pages/apps/profiles/MerchantPaymentGateway';

// // import MerchantPermissions =Loadable(lazy(()=>import('pages/admin-panel/merchant/merchant-profileInfo/MerchantPermission')))

// const AdminRoutes = {
//   path: '/',
//   children: [
//     {
//       path: '/',
//       element: (
//         <AuthGuard>
//           <MainLayout />
//         </AuthGuard>
//       ),
//       children: [
//         {
//           path: 'dashboard',
//           children: [
//             {
//               path: 'default',
//               element: <DashboardDefault />,
//               roles: routeRoles.admin.merchant
//             },
//             {
//               path: 'analytics',
//               element: <DashboardAnalytics />,
//               roles: routeRoles.admin.merchant
//             }
//           ]
//         },

//         ///===================== ADMIN ============================
//         {
//           path: 'admin',
//           children: [
//             {
//               path: 'merchant',
//               element: <Merchant />,
//               permissionKey: 'merchant',
//               roles: routeRoles.admin.merchant
//             },
//             {
//               path: 'payment-gateway',
//               element: <PaymentGateway />,
//               permissionKey: 'paymentGateway',
//               roles: routeRoles.admin.merchant
//             },
//             {
//               path: 'merchant/profile/:merchantId',
//               element: <ProfileInfoTabs />,
//               children: [
//                 {
//                   path: 'merchant-information',
//                   element: <MerchantProfileInfo />,
//                   roles: routeRoles.admin.merchant
//                 },
//                 {
//                   path: 'permission',
//                   element: <MerchantPermissions />,
//                   roles: routeRoles.admin.merchant
//                 }
//               ]
//             },
//             {
//               path: 'merchant/payment-gateway/:merchantId',
//               element: <MerchantPaymentGateway />
//             },
//             {
//               path: 'merchant/:merchantId',
//               element: <MerchantBranch />
//             },
//             {
//               path: 'merchant/invoice/:merchantId',
//               element: <MerchantInvoice />
//             },
//             {
//               path: 'support-number',
//               element: <SupportNumber />
//             }
//           ]
//         },
//         {
//           path: 'super-admin',
//           children: [
//             {
//               path: 'admin',
//               element: <Admin />
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };

// export default AdminRoutes;

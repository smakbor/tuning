// // -> DEVELOPMENT URL
// const NAHID_VAI_DEV_URL = 'http://10.0.0.11:9090/api/v1';
// const SHAKIL_VAI_DEV_URL = 'http://10.0.0.91:9090/api/v1';
// const RUMON_VAI_DEV_URL = 'http://10.0.0.224:9090/api/v1';

// // -> PRODUCTION URL
// const LIVE_PRODUCTION_URL = 'https://shunnoit.top/rootbilling/api/v1';

// // ================= SELECT DEVELOPMENT URL =================
// // const DEV_URL = NAHID_VAI_DEV_URL;
// // const DEV_URL = SHAKIL_VAI_DEV_URL;
// // const DEV_URL = RUMON_VAI_DEV_URL;

// // ================= FORCE LIVE PRODUCTION URL =================
// const DEV_URL = LIVE_PRODUCTION_URL;

// // ================= EXPORTING BASE URL =================
// export const baseURL = process.env.NODE_ENV == 'development' ? DEV_URL : LIVE_PRODUCTION_URL;

const baseUrl = import.meta.env.VITE_APP_BACKEND_URL;
const developmentUrl = 'http://localhost:4000';

export const baseURL = process.env.NODE_ENV === 'development' ? baseUrl : baseUrl;

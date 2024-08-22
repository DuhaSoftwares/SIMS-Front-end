import { environment } from '../environments/environment';

// TODO: MOVE ALL CONSTANTS HERE
export const AppConstants = {
  API_ENDPOINTS: {
    TEST_URL: 'test/test',
    LOG_URL: 'log',
    ACCOUNT_URL: 'api/v1',
    DUMMY_TEACHER_URL: 'api/v1/DummyTeacher',
    DUMMY_STUDENT_URL: 'api/token',
    AUTH_URL: 'api/Token/',
    SQL_REPORT: 'api/v1/SqlReport',
    CROP_URL: 'api/v1/Crop',
    FARM_URL: 'api/v1/Farm',
    WAREHOUSE: 'api/Warehouse/my',
  },
  DATABASE_KEYS: {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    LOGIN_USER: 'LOGIN_USER',
    API_RESP_CACHE: 'API_RESP_CACHE',
    PLATFORM: 'PLATFORM',
    REMEMBER_PWD: 'REMEMBER_PWD',
    COMPANY_CODE: 'COMPANY_CODE',
  },
  DATABASE_DEFAULT_VALUES: {},
  ERROR_PROMPTS: {
    App_StartError: 'Error occured. Please restart the application.',
    Load_Data_Error: 'Error in loading data. Please try again.',
    Invalid_Input_Data: 'Invalid data.Please try again.',
    Unknown_Error: 'Error occured. Please try again.',
    Network_Error: 'Please check network and try again.',
    Save_Data_Error: 'Error in saving. Please try again.',
    Delete_Data_Error: 'Error in delete. Please try again.',
    Permission_Error: 'Permission denied.',
    Unauthorized_User: 'User not authorized. Please relogin.',
  },
  HEADER_NAMES: {
    ApiType: 'targetapitype',
    DevApk: 'isdeveloperapk',
    AppVersion: 'appversion',
    // CORS_ALLOW_ORIGIN: "Access-Control-Allow-Origin",
    // CORS_ALLOW_METHODS: "Access-Control-Allow-Methods",
    // CORS_ALLOW_CREDENTIALS: "Access-Control-Allow-Credentials",
  },
  HEADER_VALUES: {
    ApiType: 'abcd',
    DevApk: (!environment.production).toString(),
    AppVersion: environment.applicationVersion,
    // CORS_ALLOW_ORIGIN: "http://localhost:4200",
    // CORS_ALLOW_METHODS: "GET, POST, OPTIONS, DELETE, PUT",
    // CORS_ALLOW_CREDENTIALS: "true",
  },
  DefaultMessages: {
    farmDeleteAlert: 'Are you Sure! You Want to Delete Farm',
  },
  WEB_ROUTES: {
    ENDUSER: {
      SAMPLE: 'sample',
      TEACHERS: 'teachers',
      UNAUTHORIZED: '',
      LOGIN: 'login',
      HOME: 'home',
    },
    SUPERADMIN: {
      LOGIN: 'superadmin/login',
      DASHBOARD: 'superadmin/dashboard',
    },
    NOTFOUND: '**',
  },
  TOKEN_KEY_NAMES: {
    Role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    Expiry: 'exp',
    CompanyCode: 'clCd',
    Audience: 'aud',
    CompanyId: 'clId',
    RecordId: 'dbRId',
    EmailAddress:
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    UserName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    GivenName:
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
    Issuer: 'iss',
    TokenStart: 'nbf',
  },
};

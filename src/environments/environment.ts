// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appVersion: '0.0.0',
  production: false,
  apiResponseCacheTimeoutInMinutes: 5,
  enableResponseCacheProcessing: true,
  applicationVersion: '0.0.1',
  // apiBaseUrl: 'http://thelightapi.com/',
  apiBaseUrl: 'https://localhost:44360/',
  apiDefaultTimeout: 10,
  LoggingInfo: {
    cacheLogs: true,
    logToConsole: true,
    logToFile: false,
    logToApi: false,
    logToElasticCluster: false,
    exceptionToConsole: true,
    exceptionToFile: false,
    exceptionToApi: false,
    exceptionToElasticCluster: false,
    localLogFilePath: 'Sample.log',
  },
  encryptionKey: '12345678',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

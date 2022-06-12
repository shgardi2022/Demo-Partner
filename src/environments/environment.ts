var baseURL = "https://api-dev.shgardi.app";
export const environment = {
  production: false,
  appConfig: {
    identityServiceBaseUrl: baseURL + '/identity',
    logisticsServiceBaseUrl:baseURL+'/logistics'
  },
  appCDNConfig: {
    identityCDNServiceBaseUrl: 'https://dev.cdn.shgardi.app/identity',
    logisticCDNServiceBaseUrl: 'https://dev.cdn.shgardi.app/logistics'
  },
  mapKey: 'AIzaSyDt-3iS_kTNAHFiFi32b2dSRU8NzlaWR8g',
  driverDetailsDashboardPageUrl: 'https://dashboard-dev.shgardi.app/admin/identity/custmerDetails/'
};
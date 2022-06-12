var baseURL = "https://api.shgardi.app";
export const environment = {
  production: true,
  appConfig: {
    identityServiceBaseUrl: baseURL + '/identity',
    logisticsServiceBaseUrl: baseURL + '/logistics'
  },
  appCDNConfig: {
    identityCDNServiceBaseUrl: 'https://identity.cdn.shgardi.app',
    logisticCDNServiceBaseUrl: 'https://dev.cdn.shgardi.app/logistics'
  },
  mapKey: 'AIzaSyDaF1O_iLtQJNNzpt3ygJfR_Ikd_n22Cws',
  driverDetailsDashboardPageUrl: 'https://dashboard.shgardi.app/admin/identity/custmerDetails/'
};



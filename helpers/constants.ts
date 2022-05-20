enum Environments {
  Dev,
  Testing,
  Production,
}

const warehouseEnvironment = Environments.Testing;
const ssoEnvironment = Environments.Dev;
const warehouseWebEnvironment = Environments.Dev;

const warehouseApi = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "https://localhost:5001/";
    case Environments.Testing:
      return "https://warehouse-magnus-testing.azurewebsites.net/";
    case Environments.Production:
      return "https://warehouse-magnus.azurewebsites.net/";
  }
};

const ssoApi = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "https://localhost:7206/api";
    case Environments.Testing:
      return "";
    case Environments.Production:
      return "";
  }
};

const warehouseWebAddress = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "http://192.168.0.129:19006";
    case Environments.Testing:
      return "";
    case Environments.Production:
      return "";
  }
};

export const API_PATH = warehouseApi(warehouseEnvironment);
export const SSO_API_PATH = ssoApi(ssoEnvironment);
export const WAREHOUSE_WEB_ADDRESS = warehouseWebAddress(
  warehouseWebEnvironment
);

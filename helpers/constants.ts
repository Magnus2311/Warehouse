enum Environments {
  Dev,
  Testing,
  Production,
}

const environment = Environments.Testing;

const getEnvironment = (environment: Environments) => {
  switch (environment) {
    case Environments.Dev:
      return "https://localhost:5001/";
    case Environments.Testing:
      return "https://warehouse-magnus-testing.azurewebsites.net/";
    case Environments.Production:
      return "https://warehouse-magnus.azurewebsites.net/";
  }
};

export const API_PATH = getEnvironment(environment);

export const SSO_API_PATH = "https://localhost:7206/";

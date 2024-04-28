export const isEnableGTM = true;

export const ROLES = {
  BUSINESS_SERVICES: "Business Services",
  VENDOR_SERVICES: "Vendor Services",
  PAYROLL_SERVICES: "Payroll Services",
  NON_ASSOCIATE: "Non-Associate",
  ADMIN: "Administrator",
  IMPERSONATE: "mboportal-impersonate",
  SITE_ADMIN: "Site Administrator",
  BUYER: "Buyer",
  MBOPORTAL_BUYER: "mboportal-buyer",
  MBOPORTAL_ADMIN: "mboportal-admin",
  MBOPORTAL_MAYOR: "mboportal-mayor",
  MBOPORTAL_PROVIDER: "mboportal-provider",
  MBOPORTAL_SITEADMIN: "mboportal-siteadmin",
  MBOPORTAL_IMPERSONATE: "mboportal-impersonate",
  MBOPORTAL_CONTENCREATOR: "mboportal-contentcreator",
};

export const ENV: { [k: string]: string } = {
  LOCAL: "LOCAL",
  DEV: "DEV",
  QA: "QA",
  PREPROD: "PREPROD",
  PRD: "PRD",
};

export const BASE_API_URL = {
  [ENV.DEV]: process.env.REACT_APP_DEV_API_BASEURL,
  [ENV.PREPROD]: process.env.REACT_APP_STAGING_API_BASEURL,
  [ENV.QA]: process.env.REACT_APP_QA_API_BASEURL,
  [ENV.PRD]: process.env.REACT_APP_PROD_API_BASEURL,
};

export const URLS: { [k: string]: string } = {
  "https://admin.mbopartners.com": ENV.PRD,
  "https://platform.mbopartners.com": ENV.PRD,
  "https://admin-dev.mbopartners.com": ENV.DEV,
  "https://platform-dev.mbopartners.com": ENV.DEV,
  "https://admin-qa.mbopartners.com": ENV.QA,
  "https://platform-qa.mbopartners.com": ENV.QA,
  "https://admin-preprod.mbopartners.com": ENV.PREPROD,
  "https://platform-preprod.mbopartners.com": ENV.PREPROD,
  "http://localhost:3007": ENV.LOCAL,
};

export const OKTA_API_URL = {
  [ENV.LOCAL]: process.env.REACT_APP_LOCAL_ISSUER,
  [ENV.DEV]: process.env.REACT_APP_DEV_ISSUER,
  [ENV.QA]: process.env.REACT_APP_QA_ISSUER,
  [ENV.PREPROD]: process.env.REACT_APP_STAGING_ISSUER,
  [ENV.PRD]: process.env.REACT_APP_PROD_ISSUER,
};

export const adminFeatures = {
  isErrorMessagesEnabled: {
    LOCAL: true,
    [ENV.DEV]: true,
    [ENV.QA]: true,
    [ENV.PREPROD]: true,
    [ENV.PRD]: true,
  },
  isMobileUpdateEnabled: {
    LOCAL: true,
    [ENV.DEV]: true,
    [ENV.QA]: true,
    [ENV.PREPROD]: true,
    [ENV.PRD]: false,
  },
};
export const API_DOWN = "API DOWN";

import OktaAuth, { OktaAuthOptions } from "@okta/okta-auth-js";

export const getAuth = (): OktaAuth => {
  const { host, protocol } = window.location;

  const config = (): OktaAuthOptions => {
    let issuer = process.env.REACT_APP_LOCAL_ISSUER;
    let clientId = process.env.REACT_APP_LOCAL_CLIENT_ID;

    const callback = process.env.REACT_APP_CALLBACK_PATH || "login/callback";
    const domain = `${protocol}//${host}/`;
    const redirectUri = `${domain}${callback}`;

    console.log(
      domain,
      process.env.REACT_APP_DEV_HOST,
      process.env.REACT_APP_PROD_HOST,
      process.env.REACT_APP_QA_HOST,
      process.env.REACT_APP_STAGING_HOST,
      "bla "
    );

    // return;

    if (domain === process.env.REACT_APP_PROD_HOST) {
      issuer = process.env.REACT_APP_PROD_ISSUER;
      clientId = process.env.REACT_APP_PROD_CLIENT_ID;
    }

    if (domain === process.env.REACT_APP_QA_HOST) {
      issuer = process.env.REACT_APP_QA_ISSUER;
      clientId = process.env.REACT_APP_QA_CLIENT_ID;
    }

    if (domain === process.env.REACT_APP_STAGING_HOST) {
      issuer = process.env.REACT_APP_STAGING_ISSUER;
      clientId = process.env.REACT_APP_STAGING_CLIENT_ID;
    }

    if (domain === process.env.REACT_APP_DEV_HOST) {
      issuer = process.env.REACT_APP_DEV_ISSUER;
      clientId = process.env.REACT_APP_DEV_CLIENT_ID;
    }

    return {
      issuer,
      clientId,
      redirectUri,
      responseMode: "query",
      pkce: true,
    };
  };

  const initOkta = new OktaAuth(config());

  return initOkta;
};

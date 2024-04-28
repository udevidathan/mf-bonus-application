import { HTTP } from "mf-core-library-v2";
import qs from "qs";

import { OKTA_API_URL, URLS } from "../utils/constant";

import { performRequestProps } from ".";

const OKTA_API =
  OKTA_API_URL[URLS[window.location.origin]] ||
  process.env.REACT_APP_LOCAL_ISSUER;

export default {
  oktaIntrospect(payload: {
    token: string;
    token_type_hint: string;
  }): performRequestProps {
    const body = qs.stringify(payload);

    const oktaTokenStorage =
      JSON.parse(localStorage.getItem("okta-token-storage") ?? "{}") || "";

    return {
      url: `${OKTA_API || ""}/v1/introspect?client_id=${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        oktaTokenStorage?.idToken?.clientId || ""
      }`,
      options: {
        method: HTTP.POST,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: body,
        isOkta: true,
      },
    };
  },
};

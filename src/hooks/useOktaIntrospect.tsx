import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { analytics } from "mf-core-library-v2";

import API from "../API";
import Okta from "../API/Okta";

const useOktaIntrospect = (payload: {
  token: string;
  token_type_hint: string;
}): UseQueryResult<oktaIntrospect> => {
  const request = Okta.oktaIntrospect(payload);
  const response = API.performRequest(request);

  return useQuery(["okta-introspect"], response, {
    cacheTime: 1000 * 60 * 60,
    staleTime: Infinity,
    enabled: !!payload.token,
    select(data) {
      return data.data;
    },
    onError(e: { message: string }) {
      analytics.onAPIError({ url: request.url, message: e.message });
    },
  });
};

export default useOktaIntrospect;

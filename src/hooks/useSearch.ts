import { useQuery, UseQueryResult } from "@tanstack/react-query";

import Api from "../API";
import BonusApplication from "../API/BonusApplication";
import { useErrorStore } from "../stores/useErrorStore";

import config from "./config";

const useSearch = (
  data: searchPayload
): UseQueryResult<searchResultResponse> => {
  const request = BonusApplication.search(data);
  const response = Api.performRequest(request);
  const { updateErrorResults } = useErrorStore();

  return useQuery(["searchDetails"], () => response(), {
    cacheTime: config.cacheTime,
    staleTime: config.staleTime,
    select(data) {
      return data.data;
    },
    onSuccess(data) {
      if (data?.errors) {
        updateErrorResults(data?.errors);
      }
    },
    onError(e: { message: string }) {
      console.log(e);
    },
  });
};

export default useSearch;

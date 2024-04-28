import axios from "axios";

import { setupInterceptorsTo } from "./axiosInterceptor";

setupInterceptorsTo(axios);
interface optionsProps {
  method?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
  data?: unknown;
  isOkta?: boolean;
  mutate?: boolean;
}

export const HTTP = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export interface performRequestProps {
  url: string;
  options?: optionsProps;
}

const getOktaToken = (): string => {
  const token =
    JSON.parse(localStorage.getItem("okta-token-storage") ?? "{}") || "";

  const accessToken = token?.accessToken?.accessToken;

  return accessToken;
};

export default {
  performRequest({ url, options }: performRequestProps) {
    const data = options?.data || {};
    const method = options?.method || HTTP.GET;

    let headers: { [key: string]: string } | {} = {
      ...(options?.headers || {}),
    };

    if (getOktaToken() && !options?.isOkta) {
      headers = { ...headers, Authorization: `Bearer ${getOktaToken()}` };
    }

    headers = {
      ...headers,
      "Content-Type": "application/json",
      Accept: "*/*",
    };

    return () =>
      axios(url, {
        method,
        headers,
        data,
      });
  },
  performRequestMutate({ url, options }: performRequestProps) {
    const data = options?.data || {};
    const method = options?.method || HTTP.GET;

    let headers: { [key: string]: string } | {} = {
      ...(options?.headers || {}),
    };

    if (getOktaToken() && !options?.isOkta) {
      headers = { ...headers, Authorization: `Bearer ${getOktaToken()}` };
    }

    headers = {
      ...headers,
      "Content-Type": "application/json",
      Accept: "*/*",
    };

    return axios(url, {
      method,
      headers,
      data,
    });
  },
};

import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import moment from "moment";

interface ReqConfig extends AxiosRequestConfig {
  meta?: { [k: string]: string | number };
}

const onRequest = (config: ReqConfig): AxiosRequestConfig => {
  const startTime = moment().valueOf();

  config.meta = config.meta || {};
  config.meta.requestStartedAt = startTime;

  return config;
};

interface ResError extends AxiosError {
  config: ReqConfig;
}

const onRequestError = (error: ResError): Promise<AxiosError> => {
  const endTime = moment().valueOf();

  const latency = moment(endTime)
    .subtract(error?.config?.meta?.requestStartedAt || new Date().getTime())
    .valueOf();

  console.warn(
    `${String(error?.config?.url)} error response time: ${latency} milliseconds`
  );

  return Promise.reject(error);
};

interface ResConfig extends AxiosResponse {
  config: ReqConfig;
}

const onResponse = (response: ResConfig): AxiosResponse => {
  const endTime = moment().valueOf();

  const latency = moment(endTime)
    .subtract(response?.config?.meta?.requestStartedAt || new Date().getTime())
    .valueOf();

  if (latency > 5000) {
    console.warn(
      `${String(response.config.url)} response time: ${latency} milliseconds`
    );
    const url = window.location.host;

    // TODO: add new relic monitoring for API latency here. Trigger an alert

    if (url !== "https://platform.mbopartners.com")
      console.warn(`${String(response.config.url)} is super slow`);
  }

  return response;
};

const onResponseError = (error: ResError): Promise<AxiosError> => {
  const endTime = moment().valueOf();

  const latency = moment(endTime)
    .subtract(error?.config?.meta?.requestStartedAt || new Date().getTime())
    .valueOf();

  console.warn(
    `${String(error?.config?.url)} error response time: ${latency} milliseconds`
  );

  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
}

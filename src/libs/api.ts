import axios, { type AxiosError, type AxiosResponse } from "axios";

import { ApiErrorSchema, ApiException } from "@/libs/exceptions";

const instance = axios.create();

const interceptorResponseRejected = (error: AxiosError<ApiErrorSchema>) => {
  if (error.response?.data?.message) {
    return Promise.reject(
      new ApiException(error.response.data, error.response.status),
    );
  }

  return Promise.reject(error);
};

instance.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  interceptorResponseRejected,
);

export const get = <T>(...args: Parameters<typeof instance.get>) => {
  return instance.get<T, T>(...args);
};

export const post = <T>(...args: Parameters<typeof instance.post>) => {
  return instance.post<T, T>(...args);
};

export const put = <T>(...args: Parameters<typeof instance.put>) => {
  return instance.put<T, T>(...args);
};

export const patch = <T>(...args: Parameters<typeof instance.patch>) => {
  return instance.patch<T, T>(...args);
};

export const del = <T>(...args: Parameters<typeof instance.delete>) => {
  return instance.delete<T, T>(...args);
};

import axios, { type AxiosError, type AxiosResponse } from "axios";

import { errorMessages } from "@/libs/constants";
import {
  type ApiErrorSchema,
  ApiException,
  CustomException,
} from "@/libs/exceptions";

const instance = axios.create({
  timeout: 20000,
});

const interceptorResponseRejected = (error: AxiosError<ApiErrorSchema>) => {
  if (error.response?.data?.message) {
    return Promise.reject(
      new ApiException(error.response.data, error.response.status),
    );
  } else if (error.code === "ECONNABORTED") {
    // 타임아웃 에러 코드 확인
    return Promise.reject(
      new CustomException(errorMessages.TIMEOUT, "NETWORK_TIMEOUT"),
    );
  } else if (error.message === "Network Error") {
    return Promise.reject(
      new CustomException(errorMessages.NETWORK, "NETWORK_ERROR"),
    );
  } else {
    return Promise.reject(
      new CustomException(errorMessages.UNKNOWN, "UNKNOWN_ERROR"),
    );
  }
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

/**
 * fetch API 래퍼 함수: HTTP 에러 시 ApiException throw
 */
export const fetchWithApiException = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  const response = await fetch(input, init);

  if (!response.ok) {
    let errorData: ApiErrorSchema = {
      message: `API 요청 실패: ${response.status} ${response.statusText}`,
    };
    try {
      const responseBody = await response.json();
      if (responseBody && typeof responseBody.message === "string") {
        errorData = responseBody as ApiErrorSchema;
      }
    } catch (e) {
      console.error("Failed to parse error response body:", e);
    }
    throw new ApiException(errorData, response.status);
  }

  return response;
};

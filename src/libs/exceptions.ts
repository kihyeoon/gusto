export interface ApiErrorSchema {
  message: string;
  description?: string;
}

export class ApiException<ErrorCode = number> extends Error {
  code: ErrorCode;
  description?: string;

  constructor({ message, description }: ApiErrorSchema, code: ErrorCode) {
    super(message);
    this.name = "ApiException";
    this.code = code;
    this.description = description;
  }
}

type CustomErrorCode = "UNKNOWN_ERROR" | "NETWORK_TIMEOUT" | "NETWORK_ERROR";

export class CustomException extends Error {
  code: CustomErrorCode;

  constructor(message: string, code: CustomErrorCode) {
    super(message);
    this.name = "CustomException";
    this.code = code;
  }
}

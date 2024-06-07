export interface ApiErrorSchema {
  message: string;
  description?: string;
}

export class ApiException<ErrorCode = number> extends Error {
  declare code: ErrorCode;
  declare description?: string;

  constructor({ message, description }: ApiErrorSchema, code: ErrorCode) {
    super(message);
    this.name = "ApiException";
    this.code = code;
    this.description = description;
  }
}

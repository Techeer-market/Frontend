export type ApiResponseType = {
  code: string;
  errorMessage: string;
  httpStatus: string;
};

export type ApiResponseWithDataType<T> = ApiResponseType & {
  data: T;
};

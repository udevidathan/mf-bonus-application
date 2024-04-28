interface SuccessResponse<T> {
  data: {
    errors: errorObj[] | [];
    correlationId: string;
    data: T;
  };
}
interface ErrorResponse {
  response: {
    status: number;
    statusText: string;
  };
}

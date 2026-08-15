export type ApiResponse<TData> = {
  data: TData;
  message: string;
  success: boolean;
};

export type ApiError = {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
};

export interface RegisterLoginUserRequestDTO {
  mobile: string;
}

export interface RegisterLoginUserResponseDTO {
  status: number;
  message?: string;
  error?: Error;
  data?: {
    otp: string;
  };
}

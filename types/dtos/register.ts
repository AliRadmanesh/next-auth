export interface RegisterRequestDTO {
  mobile: string;
}

export interface RegisterResponseDTO {
  status: number;
  message?: string;
  error?: Error;
  data?: {
    otp: string;
  };
}

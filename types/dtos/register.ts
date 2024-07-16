interface BaseResponse {
  status: number;
  message?: string;
  error?: Error;
}

export interface RegisterLoginUserRequestDTO {
  mobile: string;
}

export interface RegisterLoginUserResponseDTO extends BaseResponse {
  data?: {
    otp: string;
  };
}

export interface SendOtpCodeRequestDTO {
  mobile: string;
  otpCode: string;
}

export interface SendOtpCodeResponseDTO extends BaseResponse {
  data: {
    accessToken: string;
  };
}

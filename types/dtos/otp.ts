export interface SendOtpViaSmsRequestDTO {
  mobile: string;
  otpCode: string;
}

export interface SendOtpViaSmsResponseDTO {
  status: string;
  code: number;
  error_message: string;
  data?: { message_id: number };
}

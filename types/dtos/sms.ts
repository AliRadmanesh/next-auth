interface BaseResponseDTO {
  status: string;
  code: number;
  error_message?: string;
}
export interface SendSingleSmsRequestDTO {
  recipient: string[];
  sender: string;
  time: string;
  message: string;
}

export interface SendSingleSmsResponseDTO extends BaseResponseDTO {
  data: { message_id: number };
}

export interface ShowCreditResponseDTO extends BaseResponseDTO {
  data: { credit: number; gift?: number };
}

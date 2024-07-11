export interface RegisterRequestDTO {
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  status: number;
  message?: string;
  result?: {
    id: number;
    email: string;
  }
}

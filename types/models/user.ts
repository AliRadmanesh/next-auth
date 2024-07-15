export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  mobile: string;
  otp_code: string;
  otp_expiry: Date;
}

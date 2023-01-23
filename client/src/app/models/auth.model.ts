export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  password: string;
  business_name: string;
  business_type: string;
  trial: number;
  created_at?: string;
  access_token?: string;
}

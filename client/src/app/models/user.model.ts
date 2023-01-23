import { Role } from './role.model';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  alias_name: string;
  email: string;
  telephone: string;
  bio: string;
  password: string;
  created_at?: string;
  is_active: number;
  terms: number;
  avatar?: string;
  role: Role;
  // access_token?: string;
}

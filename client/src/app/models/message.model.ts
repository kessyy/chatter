export interface Message {
  id: number;
  user_id: number;
  message_body: string;
  created_at?: string;
  updated_at?: string;
}

export interface Room {
  id: number;
  room_name: string;
  users: string[];
  messages: string[];
  created_at?: string;
  updated_at?: string;
}

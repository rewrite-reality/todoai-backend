export interface InitDataUser {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
  language_code?: string;
  allows_write_to_pm?: boolean;
}

export interface InitDataPayload {
  auth_date: number;
  hash: string;
  query_id?: string;
  start_param?: string;
  chat_type?: string;
  chat_instance?: string;
  user: InitDataUser;
  raw: string;
  dataCheckString: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type CountryCodeType = {
  callingCode: string;
  code: string;
  flag: string;
  name: string;
};

export type FileType = {
  name: string;
  format: string;
  url: string;
};

export type CreateAccountT = {
  phone_number: string;
  country_code: string;
  referral_code: string;
  referred: boolean;
};

export type TransactionT = {
  id: string;
  amount: string;
  point_type: 'standard';
  created_at: string;
  receipt_id: string;
  count: string;
  items: ItemT[];
};

export type ItemT = {
  item: string;
  quantity: string;
  amount: string;
};

export type TransactionStatusT = 'received' | 'pending' | 'failed';

export type CreateBusinessT = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  add_terms_cond: boolean;
};

export type LoginT = {
  email: string;
  password: string;
};

export type ResetPasswordT = {
  token: string;
  password: string;
};

export type UserT = {
  member_id: string;
  business_id: string;
  phone_number: string;
  verified: boolean;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

export type ApiStatusT = {
  loading: boolean;
  success: boolean;
  error: boolean;
};

export type ApiResponseT = {
  message: string;
  status: string;
  statusCode: number;
  data: any;
};

export type UpdateBusinessT = {
  account: UpdateBusinessDetailsT | null;
  directors: UpdateDirectorDetailsT[];
  personal_detail: UpdatePersonalDetailsT | null;
};

export type UpdatePersonalDetailsT = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
};

export type UpdateBusinessDetailsT = {
  logo: string | null;
  state: string;
  channel: string;
  address: string;
  country: string;
  facebook: string | null;
  industry: string;
  instagram: string | null;
  rc_number: string;
  website_link: string | null;
  phone_number: string;
  name: string;
  online_channel: string[];
};

export type UpdateDirectorDetailsT = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: string;
};

export type BusinessT = {
  id: string;
  name: string;
  country: string | null;
  business_email: string;
  phone_number: string;
  rc_number: string | null;
  industry: string | null;
  channel: string | null;
  online_channel: string[];
  website_link: string | null;
  instagram: string | null;
  facebook: string | null;
  address: string | null;
  type: string | null;
  state: string | null;
  logo: string | null;
  profile_completed: boolean;
  director_phone_verified: boolean;
  add_terms_cond: boolean;
};

export type TotalPatronageT = {
  date: string;
  amount_spent: string;
  total_points: string;
  total_receipts: string;
  cumulative_spent: string;
  cumulative_points: string;
  cumulative_receipts: string;
  month: string;
};

export type MelonReceiptT = {
  melon_id?: string;
  store_name?: string;
  reference: string;
  items: ReceiptItemT[];
  date: string;
  total_amount: number;
};

export type ReceiptItemT = {
  item: string;
  amount: number;
  quantity: number;
};

export type PointTypeT = 'standard' | 'offer' | 'referral';

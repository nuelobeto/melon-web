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
  point_type: PointTypeT;
  created_at: string;
  receipt_id: string;
  melon_id: string | null;
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

export type BusinessT = {
  id: string;
  profile_completed: boolean;
  plain_key: string;
  type: 'registered' | 'unregistered';
  details?: {
    logo: string | null;
    rc_number?: string | null;
    name: string | null;
    business_email: string | null;
    phone_number: string | null;
    industry: string | null;
    channel: string | null;
    website_link: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    street: string | null;
  };
  socials?: {
    instagram: string | null;
    facebook: string | null;
    twitter: string | null;
    linkedIn: string | null;
  };
  directors?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone_number: string | null;
    address: string | null;
  };
  personal_details?: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone_number: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    street: string | null;
  };
};

export type UpdateBusinessDetailsT = {
  details: {
    logo: string | null;
    rc_number?: string | null;
    name: string | null;
    phone_number: string | null;
    industry: string | null;
    channel: string | null;
    website_link?: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    street: string | null;
    type: 'registered' | 'unregistered';
  };
  business_id: string;
};

export type UpdateSocialsT = {
  instagram?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  linkedIn?: string | null;
};

export type UpdateDirectorT = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: string;
};

export type UpdatePersonalDetailsT = {
  details: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    state: string;
    country: string;
    city: string;
    street: string;
  };
  member_id: string;
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

export type PointTypeT = 'standard' | 'offer';

export type RegistrationStageT =
  | 'identity_verification'
  | 'business_details'
  | 'business_socials'
  | 'directors_details';

export type SendRewardT = {
  receipt: MelonReceiptT;
  api_key: string;
};

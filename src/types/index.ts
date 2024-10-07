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
  transaction_id: string;
  name: string;
  amount: string;
  date: string;
  status: TransactionStatusT;
  items: ItemT[];
};

export type ItemT = {
  item: string;
  quantity: string;
  amount: string;
};

export type TransactionStatusT = 'received' | 'pending' | 'failed';

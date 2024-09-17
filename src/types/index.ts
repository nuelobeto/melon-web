export type CountryCodeType = {
  callingCode: string;
  code: string;
  flag: string;
  name: string;
};

export type CreateAccountT = {
  phone_number: string;
  country_code: string;
  referral_code: string;
  referred: boolean;
};

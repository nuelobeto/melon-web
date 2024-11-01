export type business = {
  id: string;
  profile_completed: boolean;
  business_type: 'registered' | 'unregistered';
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
  director?: {
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

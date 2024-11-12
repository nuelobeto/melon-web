import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import {BusinessT} from '@/types';
import {UnregisteredProfile} from './unregistered/profile';
import {RegisteredProfile} from './registered/profile';

export const PersonalSettings = () => {
  const {user} = useAuth();
  const {data: business} = useFetchBusiness({
    businessId: user?.business_id as string,
  });
  const BUSINESS: BusinessT = business?.data;

  return (
    <div>
      {BUSINESS?.type === 'unregistered' && <UnregisteredProfile />}
      {BUSINESS?.type === 'registered' && <RegisteredProfile />}
    </div>
  );
};

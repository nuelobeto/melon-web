import {Detail, ProfileDetails} from '@/components/ui/profile-details';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import {BusinessT} from '@/types';
import {EditProfile} from './edit-profile';
import {Loader} from 'lucide-react';

export const RegisteredProfile = () => {
  const {user} = useAuth();
  const {data: business, status} = useFetchBusiness({
    businessId: user?.business_id as string,
  });
  const BUSINESS: BusinessT = business?.data;

  const details: Detail[] = [
    {
      label: 'First Name',
      value: BUSINESS?.directors?.first_name ?? null,
    },
    {
      label: 'Last Name',
      value: BUSINESS?.directors?.last_name ?? null,
    },
    {
      label: 'Email Address',
      value: BUSINESS?.directors?.email ?? null,
    },
    {
      label: 'Phone Number',
      value: BUSINESS?.directors?.phone_number ?? null,
    },
    {
      label: 'Address',
      value: BUSINESS?.directors?.street ?? null,
    },
  ];

  return (
    <>
      {status === 'pending' ? (
        <Loader className="w-6 h-6 animate-spin text-pashBlack-4" />
      ) : (
        <ProfileDetails
          title="Profile Information"
          details={details}
          edit={<EditProfile />}
        />
      )}
    </>
  );
};

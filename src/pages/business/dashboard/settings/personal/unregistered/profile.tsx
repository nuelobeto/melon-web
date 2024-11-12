import {Detail, ProfileDetails} from '@/components/ui/profile-details';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import {BusinessT} from '@/types';
import {EditProfile} from './edit-profile';
import {Loader} from 'lucide-react';

export const UnregisteredProfile = () => {
  const {user} = useAuth();
  const {data: business, status} = useFetchBusiness({
    businessId: user?.business_id as string,
  });
  const BUSINESS: BusinessT = business?.data;

  const details: Detail[] = [
    {
      label: 'First Name',
      value: BUSINESS.personal_details?.first_name ?? null,
    },
    {
      label: 'Last Name',
      value: BUSINESS.personal_details?.last_name ?? null,
    },
    {
      label: 'Email Address',
      value: BUSINESS.personal_details?.email ?? null,
    },
    {
      label: 'Phone Number',
      value: BUSINESS.personal_details?.phone_number ?? null,
    },
    {
      label: 'Street',
      value: BUSINESS.personal_details?.street ?? null,
    },
    {
      label: 'City',
      value: BUSINESS.personal_details?.city ?? null,
    },
    {
      label: 'State',
      value: BUSINESS.personal_details?.state ?? null,
    },
    {
      label: 'Country',
      value: BUSINESS.personal_details?.country ?? null,
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

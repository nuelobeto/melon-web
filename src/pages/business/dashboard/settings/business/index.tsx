import {Detail, ProfileDetails} from '@/components/ui/profile-details';
import {useFetchBusiness} from '@/hooks/useQueries';
import {useAuth} from '@/store/useAuth';
import {BusinessT} from '@/types';
import {Loader} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {EditProfile} from './edit-profile';
import {EditSocials} from './edit-socials';

export const BusinessSettings = () => {
  const {user} = useAuth();
  const {data: business, status} = useFetchBusiness({
    businessId: user?.business_id as string,
  });
  const BUSINESS: BusinessT = business?.data;

  const regBusinessDetails: Detail[] = [
    {
      label: 'Business Name',
      value: BUSINESS?.details?.name ?? null,
    },
    {
      label: 'RC Number',
      value: BUSINESS?.details?.rc_number ?? null,
    },
    {
      label: 'Email Address',
      value: BUSINESS?.details?.business_email ?? null,
    },
    {
      label: 'Phone Number',
      value: BUSINESS?.details?.phone_number ?? null,
    },
    {
      label: 'Channel',
      value: BUSINESS?.details?.channel ?? null,
    },
    {
      label: 'Website',
      value: BUSINESS?.details?.website_link ?? null,
    },
    {
      label: 'Industry',
      value: BUSINESS?.details?.industry ?? null,
    },
    {
      label: 'Street',
      value: BUSINESS?.details?.street ?? null,
    },
    {
      label: 'City',
      value: BUSINESS?.details?.city ?? null,
    },
    {
      label: 'State',
      value: BUSINESS?.details?.state ?? null,
    },
    {
      label: 'Country',
      value: BUSINESS?.details?.country ?? null,
    },
  ];

  const unRegBusinessDetails: Detail[] = [
    {
      label: 'Business Name',
      value: BUSINESS?.details?.name ?? null,
    },
    {
      label: 'Email Address',
      value: BUSINESS?.details?.business_email ?? null,
    },
    {
      label: 'Phone Number',
      value: BUSINESS?.details?.phone_number ?? null,
    },
    {
      label: 'Channel',
      value: BUSINESS?.details?.channel ?? null,
    },
    {
      label: 'Website',
      value: BUSINESS?.details?.website_link ?? null,
    },
    {
      label: 'Industry',
      value: BUSINESS?.details?.industry ?? null,
    },
    {
      label: 'Street',
      value: BUSINESS?.details?.street ?? null,
    },
    {
      label: 'City',
      value: BUSINESS?.details?.city ?? null,
    },
    {
      label: 'State',
      value: BUSINESS?.details?.state ?? null,
    },
    {
      label: 'Country',
      value: BUSINESS?.details?.country ?? null,
    },
  ];

  const socials: Detail[] = [
    {
      label: 'Facebook',
      value: BUSINESS?.socials?.facebook ?? null,
    },
    {
      label: 'Instagram',
      value: BUSINESS?.socials?.instagram ?? null,
    },
    {
      label: 'Twitter',
      value: BUSINESS?.socials?.twitter ?? null,
    },
    {
      label: 'LinkedIn',
      value: BUSINESS?.socials?.linkedIn ?? null,
    },
  ];

  return (
    <div>
      {status === 'pending' ? (
        <Loader className="w-6 h-6 animate-spin text-pashBlack-4" />
      ) : (
        <div className="space-y-6">
          <Avatar className="w-[150px] h-[150px] p-2.5 bg-mountainAsh-7 border border-dashed border-mountainAsh-1">
            <AvatarImage src={BUSINESS?.details?.logo ?? undefined} />
            <AvatarFallback className="text-3xl text-pashBlack-4">
              {BUSINESS?.details?.name?.charAt(0) ?? ''}
            </AvatarFallback>
          </Avatar>

          <ProfileDetails
            title="Business Information"
            details={
              BUSINESS?.type === 'registered'
                ? regBusinessDetails
                : unRegBusinessDetails
            }
            edit={<EditProfile />}
          />

          <ProfileDetails
            title="Socials"
            details={socials}
            edit={<EditSocials />}
          />
        </div>
      )}
    </div>
  );
};

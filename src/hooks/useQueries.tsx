import businessServices from '@/services/business';
import {useQuery} from '@tanstack/react-query';

export const useFetchBusiness = ({businessId = ''}: {businessId: string}) => {
  return useQuery({
    queryKey: ['business'],
    queryFn: () => businessServices.getBusiness(businessId),
    enabled: !!businessId,
  });
};

export const useFetchOverview = () => {
  return useQuery({
    queryKey: ['overview'],
    queryFn: () => businessServices.getOverview(),
  });
};

export const useFetchActivities = () => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => businessServices.getActivities(),
  });
};

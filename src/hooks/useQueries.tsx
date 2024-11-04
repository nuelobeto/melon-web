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

export const useFetchActivities = ({
  start_date,
  end_date,
  page,
}: {
  start_date?: string;
  end_date?: string;
  page?: number;
}) => {
  return useQuery({
    queryKey: ['activities', page, start_date, end_date],
    queryFn: () => businessServices.getActivities(start_date, end_date, page),
  });
};

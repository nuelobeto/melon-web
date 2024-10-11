/* eslint-disable @typescript-eslint/no-explicit-any */
import businessServices from '@/services/business';
import {useAuth} from '@/store/useAuth';
import {useBusiness} from '@/store/useBusiness';
import {ApiResponseT} from '@/types';
import {useCallback, useEffect} from 'react';

export const useFetchBusiness = () => {
  const {user} = useAuth();
  const {setBusiness} = useBusiness();

  const getBusiness = useCallback(
    async (business_id: string) => {
      try {
        const res: ApiResponseT = await businessServices.getBusiness(
          business_id,
        );
        if (res.status === 'success') {
          setBusiness(res.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    [setBusiness],
  );

  useEffect(() => {
    if (user) {
      getBusiness(user.business_id);
    }
  }, [getBusiness, user]);
};

export const useFetchPersonalDetails = () => {
  const {user} = useAuth();
  const {setPersonalDetails} = useBusiness();

  const getPersonalDetails = useCallback(
    async (member_id: string) => {
      try {
        const res: ApiResponseT = await businessServices.getPersonalDetails(
          member_id,
        );
        if (res.status === 'success') {
          setPersonalDetails(res.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    [setPersonalDetails],
  );

  useEffect(() => {
    if (user) {
      getPersonalDetails(user.member_id);
    }
  }, [getPersonalDetails, user]);
};

export const useFetchDirectorsDetails = () => {
  const {user} = useAuth();
  const {setDirectorDetails} = useBusiness();

  const getDirectorDetails = useCallback(
    async (business_id: string) => {
      try {
        const res: ApiResponseT = await businessServices.getDirectorDetails(
          business_id,
        );
        if (res.status === 'success') {
          setDirectorDetails(res.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    },
    [setDirectorDetails],
  );

  useEffect(() => {
    if (user) {
      getDirectorDetails(user.business_id);
    }
  }, [getDirectorDetails, user]);
};

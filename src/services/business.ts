/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '@/config/axiosInstance';
import {
  SendRewardT,
  UpdateBusinessDetailsT,
  UpdatePersonalDetailsT,
  UpdateSocialsT,
} from '@/types';

const getBusiness = async (business_id: string) => {
  const res = await apiClient.get(`/businesses/${business_id}`);
  return res.data;
};

const updateBusinessDetails = async (payload: UpdateBusinessDetailsT) => {
  const res = await apiClient.put(
    `/businesses/${payload.business_id}`,
    payload.details,
  );
  return res.data;
};

const updateSocials = async (payload: UpdateSocialsT) => {
  const res = await apiClient.put(`/businesses/socials`, payload);
  return res.data;
};

const updatePersonalDetails = async (payload: UpdatePersonalDetailsT) => {
  const res = await apiClient.put(
    `/businesses/personal/${payload.member_id}`,
    payload.details,
  );
  return res.data;
};

const updateDirectorDetails = async (payload: any) => {
  const res = await apiClient.put(`/businesses/director`, payload);
  return res.data;
};

const verifyDirectorPhone = async (otp: string) => {
  const res = await apiClient.get(`businesses/verify-phone/${otp}`);
  return res.data;
};

const resendOtp = async (phone_number: string) => {
  const res = await apiClient.get(`/businesses/resend-otp/${phone_number}`);
  return res.data;
};

const getOverview = async () => {
  const res = await apiClient.get(`/businesses/overview`);
  return res.data;
};

const getActivities = async () => {
  const res = await apiClient.get(`/businesses/recent-engagements`);
  return res.data;
};

const sendReceipt = async (payload: SendRewardT) => {
  const headers = {
    'x-api-key': payload.api_key,
    withCredentials: true,
  };
  const res = await apiClient.post(`/widget`, payload.receipt, {headers});
  return res.data;
};

const businessServices = {
  getBusiness,
  updateBusinessDetails,
  updateSocials,
  verifyDirectorPhone,
  resendOtp,
  getOverview,
  getActivities,
  updatePersonalDetails,
  updateDirectorDetails,
  sendReceipt,
};

export default businessServices;

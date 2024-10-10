import apiClient from '@/config/axiosInstance';
import {
  UpdateBusinessDetailsT,
  UpdateDirectorDetailsT,
  UpdatePersonalDetailsT,
} from '@/types';

const getBusiness = async (business_id: string) => {
  const res = await apiClient.get(`/businesses/${business_id}`);
  localStorage.setItem('business', JSON.stringify(res.data.data));
  return res.data;
};

const updateBusinessDetails = async (
  payload: UpdateBusinessDetailsT,
  business_id: string,
) => {
  const res = await apiClient.put(`/businesses/${business_id}`, payload);
  return res.data;
};

const getPersonalDetails = async (member_id: string) => {
  const res = await apiClient.get(`/businesses/personal/${member_id}`);
  return res.data;
};

const updatePersonalDetails = async (
  payload: UpdatePersonalDetailsT,
  member_id: string,
) => {
  const res = await apiClient.put(`/businesses/personal/${member_id}`, payload);
  return res.data;
};

const getDirectorDetails = async (business_id: string) => {
  const res = await apiClient.get(`businesses/director/${business_id}`);
  return res.data;
};

const updateDirectorDetails = async (payload: UpdateDirectorDetailsT) => {
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

const getTotalPatronage = async (filter: string) => {
  const res = await apiClient.get(
    `/businesses/receipt-analysis?filter=${filter}`,
  );
  return res.data;
};

const getRecentEngagement = async () => {
  const res = await apiClient.get(`/businesses/recent-engagements`);
  return res.data;
};

const businessServices = {
  getBusiness,
  updateBusinessDetails,
  verifyDirectorPhone,
  resendOtp,
  getTotalPatronage,
  getRecentEngagement,
  getPersonalDetails,
  updatePersonalDetails,
  getDirectorDetails,
  updateDirectorDetails,
};

export default businessServices;

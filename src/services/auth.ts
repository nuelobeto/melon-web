import apiClient from '@/config/axiosInstance';
import {CreateAccountT} from '@/types';

const verifyEmail = async (token: string) => {
  const res = await apiClient.get(`/users/email-verified/${token}`);
  return res.data;
};

const resendEmailOtp = async (email: string) => {
  const res = await apiClient.get(`/users/resend-email/${email}`);
  return res.data;
};

const getReferralDetails = async (code: string) => {
  const res = await apiClient.get(`/referral/${code}`);
  return res.data;
};

const createAccount = async (payload: CreateAccountT) => {
  const res = await apiClient.post('/users', payload);
  return res.data;
};

const verifyPhone = async (otp: string) => {
  const res = await apiClient.put(`/verify/referred/${otp}`);
  return res.data;
};

const resendOtp = async (phone_number: string) => {
  const res = await apiClient.get(`/resend/otp/${phone_number}`);
  return res.data;
};

const authServices = {
  verifyEmail,
  resendEmailOtp,
  createAccount,
  verifyPhone,
  getReferralDetails,
  resendOtp,
};

export default authServices;

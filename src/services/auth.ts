import apiClient from '@/config/axiosInstance';
import {
  CreateAccountT,
  CreateBusinessT,
  CreatePasswordT,
  LoginT,
  ResetPasswordT,
} from '@/types';

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

const createBusinessAccount = async (payload: CreateBusinessT) => {
  const res = await apiClient.post('/businesses', payload);
  return res.data;
};

const login = async (payload: LoginT) => {
  const res = await apiClient.post('/auth/login-member', payload);
  localStorage.setItem('user', JSON.stringify(res.data.data.member));
  localStorage.setItem('token', JSON.stringify(res.data.data.token));

  return res.data;
};

const resendBusinessEmailOtp = async (email: string) => {
  const res = await apiClient.get(`/businesses/resend-verification/${email}`);
  return res.data;
};

const verifyBusinessEmail = async (token: string) => {
  const res = await apiClient.get(`/businesses/verify-email/${token}`);
  return res.data;
};

const forgotPassword = async (email: string) => {
  const res = await apiClient.get(`/businesses/forget-password/${email}`);
  return res.data;
};

const resetPassword = async (payload: ResetPasswordT) => {
  const res = await apiClient.post(`/businesses/reset-password/`, payload);
  return res.data;
};

const createPassword = async (payload: CreatePasswordT) => {
  const res = await apiClient.patch(`/admin/partners/password`, payload);
  return res.data;
};

const authServices = {
  verifyEmail,
  resendEmailOtp,
  createAccount,
  verifyPhone,
  getReferralDetails,
  resendOtp,
  createBusinessAccount,
  login,
  resendBusinessEmailOtp,
  verifyBusinessEmail,
  forgotPassword,
  resetPassword,
  createPassword,
};

export default authServices;

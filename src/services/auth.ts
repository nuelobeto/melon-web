import apiClient from '@/config/axiosInstance';

const verifyEmail = async (token: string) => {
  const res = await apiClient.get(`/users/email-verified/${token}`);
  return res.data;
};

const resendEmailOtp = async (email: string) => {
  const res = await apiClient.get(`/users/resend-email/${email}`);
  return res.data;
};

const authServices = {
  verifyEmail,
  resendEmailOtp,
};

export default authServices;

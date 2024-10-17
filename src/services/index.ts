import apiClient from '@/config/axiosInstance';
import {MelonReceiptT} from '@/types';

const sendReceipt = async (payload: MelonReceiptT, api_key: string) => {
  const headers = {
    'x-api-key': api_key,
    withCredentials: true,
  };
  const res = await apiClient.post(`/widget`, payload, {headers});
  return res.data;
};

const api = {
  sendReceipt,
};

export default api;

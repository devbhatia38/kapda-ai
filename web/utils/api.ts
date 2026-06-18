import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001',
});

export const runTryOn = async (data: {
  retailer_id: string;
  garment_id: string;
  person_image_url: string;
}) => {
  const response = await api.post('/tryon', data);
  return response.data;
};

export default api;

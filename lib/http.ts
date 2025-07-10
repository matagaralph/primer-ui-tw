import xior from 'xior';
import { getCurrentUser } from './session';

const smoastersApi = xior.create({
  baseURL: 'https://smoasters.coffeeannan.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

smoastersApi.interceptors.request.use(async (config) => {
  const user = await getCurrentUser();
  config.headers.Authorization = `Bearer ${user?.accessToken}`;
  return config;
});

export default smoastersApi;

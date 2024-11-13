import customAxios from '../utils/customAxios';

export const userInfo = async () => {
  const res = await customAxios.get('/api/user/me');
  return res.data;
};

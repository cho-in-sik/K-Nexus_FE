import customAxios from '../utils/customAxios';

export const userInfo = async () => {
  try {
    const res = await customAxios.get('/api/user/me');
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

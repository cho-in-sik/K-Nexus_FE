import customAxios from '../utils/customAxios';

export const postOnboarding = async (steps: any) => {
  console.log(steps);
  const res = await customAxios.post('/api/user/start', {
    level: steps[0],
    purpose: steps[1],
    age: steps[2],
  });
  return res;
};

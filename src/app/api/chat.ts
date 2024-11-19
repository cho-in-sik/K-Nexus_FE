import customAxios from '../utils/customAxios';

export const stt = async (audioBlob: any, categoryId: any, chat_id: any) => {
  try {
    const res = await customAxios.post(
      '/api/ai/stc',
      { file: audioBlob, situation: categoryId.toString(), chat_id },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
};

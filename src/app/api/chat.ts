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

export const chatList = async () => {
  try {
    const res = await customAxios.get('/api/chatlist');

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const chatDetails = async (chatId: string) => {
  try {
    const res = await customAxios.get(`api/chatlist/detail/${chatId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const postChat = async ({ situation, message, chatId }: any) => {
  try {
    const res = await customAxios.post('/api/ai/chat', {
      situation,
      message,
      chat_id: chatId,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

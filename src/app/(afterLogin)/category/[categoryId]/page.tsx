'use client';

import BackButton from '../../_components/BackButton';

import { stt } from '@/app/api/chat';

import { useState, useRef, useEffect } from 'react';
import mic from '@/../public/svgs/play/mic.svg';
import Image from 'next/image';

import { getSpeech } from '@/app/utils/getSpeech';

type Params = {
  params: {
    categoryId: string;
  };
};

type Message = {
  chat_id: string;
  message: string;
  response: string;
  situation: string;
  user_id: string;
};

export default function Page({ params }: Params) {
  const { categoryId } = params;
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [response, setResponse] = useState<Message>();
  const [hasSpoken, setHasSpoken] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      if (audioChunksRef.current.length > 0) {
        setIsLoading(true);
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/mp4',
        });

        console.log(audioBlob);

        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        const chat_id = null;

        const res = await stt(audioBlob, categoryId, chat_id);
        if (res?.status === 200) {
          console.log('STT Response:', res.data);
          setResponse(res?.data);
          setHasSpoken(false); // 음성이 재생되도록 플래그 초기화
        } else {
          alert('다시 시도해주세요');
          console.error('STT Failed:', res);
        }
        setIsLoading(false);
      }
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  console.log(MediaRecorder.isTypeSupported('audio/webm')); // false일 가능성 높음
  console.log(MediaRecorder.isTypeSupported('audio/mp4')); // true일 가능성 높음
  console.log(MediaRecorder.isTypeSupported('audio/ogg')); // true일 가능성 있음

  console.log(response);

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  useEffect(() => {
    console.log('useEffect triggered:', { response, hasSpoken }); // 상태 디버깅
    if (response && !hasSpoken) {
      console.log('Calling getSpeech:', response.response); // 호출 디버깅
      getSpeech(response.response);
      setHasSpoken(true);
    }
  }, [response, hasSpoken]);

  return (
    <div className="h-screen flex flex-col">
      <BackButton marginTop="12" />
      <div className="text-lg font-medium text-center mt-12 mb-24">
        {categoryId}
      </div>
      <div className="w-full flex justify-center items-center mb-8">
        <div className="h-48 w-48 bg-[#D9D9D9] rounded-full flex justify-center items-center ">
          {isRecording && (
            <span className="loading loading-dots loading-lg"></span>
          )}
        </div>
      </div>
      <div className="text-center text-sm font-normal">
        {response ? (
          <h6>{response?.message}</h6>
        ) : (
          <div>
            <h6>안녕하세요</h6>
            <h6>무엇을 도와드릴까요?</h6>
          </div>
        )}
      </div>
      <div className="mt-auto mb-28">
        <div className="flex flex-col justify-center items-center px-3">
          <button
            className="btn bg-blue-600 text-white w-full"
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <div className="flex justify-center items-center">Done</div>
            ) : isLoading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <Image src={mic} alt="mic" />
                Speak
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

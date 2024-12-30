'use client';

import BackButton from '../../_components/BackButton';

import VoiceAnimation from '../_components/VoiceAnimation';
import { stt } from '@/app/api/chat';

import { useState, useRef } from 'react';
import mic from '@/../public/svgs/play/mic.svg';
import Image from 'next/image';
import { Span } from 'next/dist/trace';
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
  const [transcription, setTranscription] = useState('');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [response, setResponse] = useState<Message>();

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
          type: 'audio/webm',
        });

        console.log(audioBlob);

        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        const chat_id = null;

        const res = await stt(audioBlob, categoryId, chat_id);
        if (res?.status === 200) {
          setResponse(res?.data);
        }
        setIsLoading(false);
      }
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  console.log(response);

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <BackButton />
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
          {/* {audioURL && (
        <div>
          <h2>Recorded Audio:</h2>
          <audio controls src={audioURL}></audio>
        </div>
      )} */}
          {/* {transcription && (
            <div>
              <h2>Transcription:</h2>
              <p>{transcription}</p>
            </div>
          )} */}
        </div>
        <div>{response ? getSpeech(response.response) : null}</div>
      </div>

      {/* daf 테스트 안에서 텍스트 전부 보여주기 테스트는 통신 컴포넌트 & 결과 확인 컴포넌트가 같이 있는 방향으로  */}
    </div>
  );
}

// 'use client';

// import BackButton from '../../_components/BackButton';
// import { stt } from '@/app/api/chat';
// import { useState, useRef, useEffect } from 'react';
// import mic from '@/../public/svgs/play/mic.svg';
// import Image from 'next/image';
// import { getSpeech } from '@/app/utils/getSpeech';

// type Params = {
//   params: {
//     categoryId: string;
//   };
// };

// type Message = {
//   chat_id: string;
//   message: string;
//   response: string;
//   situation: string;
//   user_id: string;
// };

// export default function Page({ params }: Params) {
//   const { categoryId } = params;
//   const [isRecording, setIsRecording] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chatId, setChatId] = useState<string | null>(null);
//   const [response, setResponse] = useState<Message>();
//   const [hasSpoken, setHasSpoken] = useState(false);

//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);

//   // 시작 시 MIME 타입을 동적으로 선택
//   const getSupportedMimeType = (): string | undefined => {
//     if (typeof MediaRecorder === 'undefined') return undefined;

//     if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
//       return 'audio/webm;codecs=opus';
//     } else if (MediaRecorder.isTypeSupported('audio/webm')) {
//       return 'audio/webm';
//     } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
//       return 'audio/ogg;codecs=opus';
//     } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
//       return 'audio/ogg';
//     } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
//       return 'audio/mp4';
//     }
//     // 지원되는 MIME 타입이 없으면 undefined 반환
//     return undefined;
//   };

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mimeType = getSupportedMimeType();
//       if (!mimeType) {
//         alert('현재 브라우저에서는 지원되는 오디오 포맷이 없습니다.');
//         return;
//       }

//       // MediaRecorder 생성 시 지원되는 MIME 타입 사용
//       mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
//       audioChunksRef.current = [];

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunksRef.current.push(event.data);
//       };

//       mediaRecorderRef.current.onstop = async () => {
//         if (audioChunksRef.current.length > 0) {
//           setIsLoading(true);
//           // Blob 생성 시에도 같은 MIME 타입 사용
//           const audioBlob = new Blob(audioChunksRef.current, {
//             type: mimeType,
//           });
//           const res = await stt(audioBlob, categoryId, chatId);
//           if (res?.status === 200) {
//             console.log('STT Response:', res.data);
//             setChatId(res.data.chat_id);
//             setResponse(res.data);
//             setHasSpoken(false); // 음성이 재생되도록 플래그 초기화
//           } else {
//             // alert('다시 시도해주세요');
//             alert(res);
//             console.error('STT Failed:', res);
//           }
//           setIsLoading(false);
//         }
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error('녹음 시작 에러:', error);
//       alert('이 기기에서는 음성 녹음이 지원되지 않습니다.');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//     }
//     setIsRecording(false);
//   };

//   useEffect(() => {
//     if (response && !hasSpoken) {
//       getSpeech(response.response);
//       setHasSpoken(true);
//     }
//   }, [response, hasSpoken]);

//   return (
//     <div className="h-screen flex flex-col">
//       <BackButton marginTop="12" />
//       <div className="text-lg font-medium text-center mt-12 mb-24">
//         {categoryId}
//       </div>
//       <div className="w-full flex justify-center items-center mb-8">
//         <div className="h-48 w-48 bg-[#D9D9D9] rounded-full flex justify-center items-center ">
//           {isRecording && (
//             <span className="loading loading-dots loading-lg"></span>
//           )}
//         </div>
//       </div>
//       <div className="text-center text-sm font-normal">
//         {response ? (
//           <h6>{response.message}</h6>
//         ) : (
//           <div>
//             <h6>안녕하세요</h6>
//             <h6>무엇을 도와드릴까요?</h6>
//           </div>
//         )}
//       </div>
//       <div className="mt-auto mb-28">
//         <div className="flex flex-col justify-center items-center px-3">
//           <button
//             className="btn bg-blue-600 text-white w-full"
//             onClick={isRecording ? stopRecording : startRecording}
//           >
//             {isRecording ? (
//               <div className="flex justify-center items-center">Done</div>
//             ) : isLoading ? (
//               <span className="loading loading-dots loading-lg"></span>
//             ) : (
//               <div className="flex justify-center items-center gap-2">
//                 <Image src={mic} alt="mic" />
//                 Speak
//               </div>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import BackButton from '../../_components/BackButton';
import { stt } from '@/app/api/chat';
import { useState, useRef, useEffect } from 'react';
import mic from '@/../public/svgs/play/mic.svg';
import Image from 'next/image';
import { getSpeech } from '@/app/utils/getSpeech';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';

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
  const [chatId, setChatId] = useState<string | null>(null);
  const [response, setResponse] = useState<Message>();
  const [hasSpoken, setHasSpoken] = useState(false);

  // recorderRef는 native MediaRecorder 또는 RecordRTC 인스턴스를 담습니다.
  const recorderRef = useRef<any>(null);
  // native MediaRecorder의 경우 데이터를 저장할 배열
  const audioChunksRef = useRef<Blob[]>([]);

  // 동적 MIME 타입 선택 (native MediaRecorder용)
  const getSupportedMimeType = (): string | undefined => {
    if (typeof MediaRecorder === 'undefined') return undefined;
    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      return 'audio/webm;codecs=opus';
    } else if (MediaRecorder.isTypeSupported('audio/webm')) {
      return 'audio/webm';
    } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
      return 'audio/ogg;codecs=opus';
    } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
      return 'audio/ogg';
    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
      return 'audio/mp4';
    }
    return undefined;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 먼저 native MediaRecorder의 존재 여부 확인
      if (typeof MediaRecorder !== 'undefined') {
        const mimeType = getSupportedMimeType();
        if (mimeType) {
          // native MediaRecorder 사용
          recorderRef.current = new MediaRecorder(stream, { mimeType });
          audioChunksRef.current = [];

          recorderRef.current.ondataavailable = (event: BlobEvent) => {
            audioChunksRef.current.push(event.data);
          };

          recorderRef.current.onstop = async () => {
            if (audioChunksRef.current.length > 0) {
              setIsLoading(true);
              const audioBlob = new Blob(audioChunksRef.current, {
                type: mimeType,
              });
              const res = await stt(audioBlob, categoryId, chatId);
              if (res?.status === 200) {
                console.log('STT Response:', res.data);
                setChatId(res.data.chat_id);
                setResponse(res.data);
                setHasSpoken(false);
              } else {
                alert('다시 시도해주세요');
                console.error('STT Failed:', res);
              }
              setIsLoading(false);
            }
          };

          recorderRef.current.start();
        } else {
          // native MediaRecorder는 있으나 지원하는 MIME 타입이 없는 경우 -> RecordRTC 사용
          recorderRef.current = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/wav', // 대부분의 모바일에서 안정적입니다.
            recorderType: StereoAudioRecorder,
          });
          recorderRef.current.startRecording();
        }
      } else {
        // MediaRecorder 자체가 없으면 RecordRTC 사용
        recorderRef.current = new RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/wav',
          recorderType: StereoAudioRecorder,
        });
        recorderRef.current.startRecording();
      }
      setIsRecording(true);
    } catch (error) {
      console.error('녹음 시작 에러:', error);
      alert('이 기기에서는 음성 녹음이 지원되지 않습니다.');
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;

    // RecordRTC(Polyfill) 인스턴스인 경우
    if (typeof recorderRef.current.stopRecording === 'function') {
      recorderRef.current.stopRecording(async () => {
        setIsLoading(true);
        const blob: Blob = recorderRef.current.getBlob();
        const res = await stt(blob, categoryId, chatId);
        if (res?.status === 200) {
          console.log('STT Response:', res.data);
          setChatId(res.data.chat_id);
          setResponse(res.data);
          setHasSpoken(false);
        } else {
          alert('다시 시도해주세요');
          console.error('STT Failed:', res);
        }
        setIsLoading(false);
      });
    } else if (typeof recorderRef.current.stop === 'function') {
      // native MediaRecorder의 경우 onstop 이벤트가 처리합니다.
      recorderRef.current.stop();
    }
    setIsRecording(false);
  };

  useEffect(() => {
    if (response && !hasSpoken) {
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
        <div className="h-48 w-48 bg-[#D9D9D9] rounded-full flex justify-center items-center">
          {isRecording && (
            <span className="loading loading-dots loading-lg"></span>
          )}
        </div>
      </div>
      <div className="text-center text-sm font-normal">
        {response ? (
          <h6>{response.message}</h6>
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

'use client';
import { useState, useRef } from 'react';

export function Test() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      if (audioChunksRef.current.length > 0) {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/webm',
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        //AI 통신 서버 구축되면 여기로직으로 통신해보기 blob형태로 주고받기
        //FAST API
        //받으면 바로 음성으로 출력해줘야하는데 util에 만들어 놓은 함수로 송출 ? (tts)

        // const formData = new FormData();
        // formData.append('audio', audioBlob);

        // console.log(audioBlob);

        // const response = await fetch('http://localhost:3000/upload', {
        //   method: 'POST',
        //   body: formData,
        // });

        // const result = await response.json();
        // setTranscription(result.transcription);
      }
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="btn bg-blue-600 text-white"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <div>
          <h2>Recorded Audio:</h2>
          <audio controls src={audioURL}></audio>
        </div>
      )}
      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}

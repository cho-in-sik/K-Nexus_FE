export const getSpeech = async (text: string) => {
  const lang = 'ko-KR';

  const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();

      if (voices.length) {
        resolve(voices);
      } else {
        // onvoiceschanged 이벤트로 음성 로드 대기
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          resolve(voices);
        };
      }
    });
  };

  const voices = await loadVoices();

  const speech = (txt: string | undefined) => {
    const utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.lang = lang;

    // 한국어 목소리 찾기
    const korVoice = voices.find(
      (voice) => voice.lang === lang || voice.lang === lang.replace('-', '_'),
    );

    if (korVoice) {
      utterThis.voice = korVoice;
    } else {
      console.error('No Korean voice found on this device.');
      return;
    }

    // 음성 재생
    window.speechSynthesis.speak(utterThis);
  };

  speech(text);
};

export const getSpeech = async (text: string) => {
  const lang = 'ko-KR';

  const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();

      if (voices.length) {
        resolve(voices);
      } else {
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

    const korVoice = voices.find(
      (voice) => voice.lang === lang || voice.lang === lang.replace('-', '_'),
    );

    if (korVoice) {
      utterThis.voice = korVoice;
    } else {
      console.error('No Korean voice found on this device.');
      return;
    }

    window.speechSynthesis.speak(utterThis);
  };

  speech(text);
};

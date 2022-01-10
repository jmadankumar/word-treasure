export const pronounceWord = (text: string) => {
  if ("SpeechSynthesisUtterance" in window && "speechSynthesis" in window) {
    const ssu = new SpeechSynthesisUtterance();
    ssu.text = text;
    window.speechSynthesis.speak(ssu);
  }
};

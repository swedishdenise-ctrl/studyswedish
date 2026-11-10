"use client";

import { useEffect, useState } from "react";

function swedishVoice(): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !window.speechSynthesis) return undefined;
  return window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("sv"));
}

/**
 * Say a Swedish phrase. Plays a recorded file when one is given (Denise's own
 * voice), otherwise falls back to the device's built-in Swedish voice.
 */
export function speakSwedish(text: string, audioSrc?: string) {
  if (audioSrc) {
    new Audio(audioSrc).play().catch(() => {});
    return;
  }
  const voice = swedishVoice();
  if (!voice) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = 0.85;
  synth.speak(u);
}

/** True once we know this device can pronounce Swedish (or a recording exists). */
export function useCanSpeakSwedish(hasRecording = false) {
  const [can, setCan] = useState(hasRecording);

  useEffect(() => {
    if (hasRecording || typeof window === "undefined" || !window.speechSynthesis) return;
    const check = () => setCan(!!swedishVoice());
    check();
    window.speechSynthesis.addEventListener("voiceschanged", check);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", check);
  }, [hasRecording]);

  return can;
}

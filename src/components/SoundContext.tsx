'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextType {
  isPlaying: boolean;
  isAvailable: boolean;
  toggleSound: () => void;
  playUiClick: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isPlaying: false,
  isAvailable: false,
  toggleSound: () => {},
  playUiClick: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if audio file exists on mount
  useEffect(() => {
    const audioUrl = '/audio/lobby-ambience.mp3';
    fetch(audioUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          setIsAvailable(true);
          const audio = new Audio(audioUrl);
          audio.loop = true;
          audio.volume = 0;
          audioRef.current = audio;
        } else {
          setIsAvailable(false);
        }
      })
      .catch(() => {
        setIsAvailable(false);
      });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Pause audio when browser tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        if (isPlaying) {
          audioRef.current.pause();
        }
      } else {
        if (isPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying]);

  const fadeIn = (targetVol = 0.25, duration = 1500) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});

    const stepMs = 50;
    const steps = duration / stepMs;
    const volStep = targetVol / steps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume + volStep >= targetVol) {
        audioRef.current.volume = targetVol;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audioRef.current.volume += volStep;
      }
    }, stepMs);
  };

  const fadeOut = (duration = 1000) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const stepMs = 50;
    const currentVol = audioRef.current.volume;
    const steps = duration / stepMs;
    const volStep = currentVol / steps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume - volStep <= 0.01) {
        audioRef.current.volume = 0;
        audioRef.current.pause();
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audioRef.current.volume -= volStep;
      }
    }, stepMs);
  };

  const toggleSound = () => {
    if (!isAvailable || !audioRef.current) return;

    if (isPlaying) {
      fadeOut(1000);
      setIsPlaying(false);
      localStorage.setItem('dosha_sound_pref', 'off');
    } else {
      fadeIn(0.25, 1500);
      setIsPlaying(true);
      localStorage.setItem('dosha_sound_pref', 'on');
    }
  };

  // Soft subtle click sound for booking steps
  const playUiClick = () => {
    if (!isPlaying) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext not supported
    }
  };

  return (
    <SoundContext.Provider value={{ isPlaying, isAvailable, toggleSound, playUiClick }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);

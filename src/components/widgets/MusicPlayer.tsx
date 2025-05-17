'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
} from '@heroicons/react/24/solid';

interface MusicPlayerProps {
  widgetId: string;
}

export default function MusicPlayer({ widgetId }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { theme } = useAppStore();
  const currentTheme = themes[theme];

  const tracks = [
    {
      name: 'Chill Lo-Fi',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      name: 'Relaxing Beat',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, currentTrack]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };
  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium" style={{ color: currentTheme.text }}>
        {tracks[currentTrack].name}
      </p>
      <audio ref={audioRef} src={tracks[currentTrack].url} />
      <div className="flex justify-center space-x-3">
        <Button
          size="sm"
          onClick={prevTrack}
          style={{
            backgroundColor: currentTheme.secondary,
            color: currentTheme.text,
          }}
          className="rounded-full p-2 hover:opacity-90 transition-opacity"
        >
          <BackwardIcon className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          onClick={togglePlay}
          style={{
            backgroundColor: currentTheme.primary,
            color: currentTheme.text,
          }}
          className="rounded-full p-2 hover:opacity-90 transition-opacity"
        >
          {isPlaying ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </Button>
        <Button
          size="sm"
          onClick={nextTrack}
          style={{
            backgroundColor: currentTheme.secondary,
            color: currentTheme.text,
          }}
          className="rounded-full p-2 hover:opacity-90 transition-opacity"
        >
          <ForwardIcon className="h-5 w-5" />
        </Button>
      </div>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={(value) => setVolume(value[0])}
        className="w-full"
        style={
          {
            '--thumb-color': currentTheme.accent,
            '--track-color': currentTheme.secondary,
            '--track-background': 'rgba(255, 255, 255, 0.2)',
          } as React.CSSProperties
        }
      />
    </div>
  );
}

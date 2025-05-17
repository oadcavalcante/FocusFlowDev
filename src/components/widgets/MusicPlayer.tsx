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
    {
      name: 'Lo-Fi Dreams',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      name: 'Calm Study',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
      name: 'Soft Lo-Fi',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
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
  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  // Bloqueia a propagação do evento de arrastar no Slider
  const stopDragPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
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
      <div
        onMouseDown={stopDragPropagation}
        onTouchStart={stopDragPropagation}
        className="w-full"
      >
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
          className="w-full h-2"
          style={
            {
              '--radix-slider-track-background': 'rgba(255, 255, 255, 0.2)',
              '--radix-slider-range-background': currentTheme.secondary,
              '--radix-slider-thumb-background': currentTheme.accent,
              '--radix-slider-thumb-border': `2px solid ${currentTheme.text}`,
              '--radix-slider-thumb-focus-ring': currentTheme.accent,
            } as React.CSSProperties
          }
        />
      </div>
      <style jsx>{`
        .w-full {
          height: 8px;
        }
        .w-full [data-radix-slider-track] {
          background: var(--radix-slider-track-background);
          height: 4px;
          border-radius: 4px;
        }
        .w-full [data-radix-slider-range] {
          background: var(--radix-slider-range-background);
          height: 4px;
          border-radius: 4px;
        }
        .w-full [data-radix-slider-thumb] {
          background: var(--radix-slider-thumb-background);
          border: var(--radix-slider-thumb-border);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
        }
        .w-full [data-radix-slider-thumb]:focus {
          outline: none;
          box-shadow: 0 0 0 2px var(--radix-slider-thumb-focus-ring);
          box-shadow-opacity: 0.5;
        }
        .w-full [data-radix-slider-thumb]:hover {
          opacity: 0.9;
        }
      `}</style>
      <div className="max-h-24 overflow-y-auto">
        <ul className="space-y-1">
          {tracks.map((track, index) => (
            <li
              key={index}
              className={`text-sm cursor-pointer p-2 rounded hover:bg-opacity-20 transition-colors ${
                currentTrack === index ? 'selected-track' : ''
              }`}
              style={{
                color: currentTheme.text,
                backgroundColor:
                  currentTrack === index
                    ? `${currentTheme.accent}30`
                    : 'transparent',
              }}
              onClick={() => selectTrack(index)}
            >
              {track.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

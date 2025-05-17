'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface MusicPlayerProps {
  widgetId: string;
}

export default function MusicPlayer({ widgetId }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    <div>
      <p className="text-sm">{tracks[currentTrack].name}</p>
      <audio ref={audioRef} src={tracks[currentTrack].url} />
      <div className="flex space-x-2 my-2">
        <Button size="sm" onClick={prevTrack}>
          ⏮
        </Button>
        <Button size="sm" onClick={togglePlay}>
          {isPlaying ? '⏸' : '▶️'}
        </Button>
        <Button size="sm" onClick={nextTrack}>
          ⏭
        </Button>
      </div>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        onValueChange={(value) => setVolume(value[0])}
      />
    </div>
  );
}

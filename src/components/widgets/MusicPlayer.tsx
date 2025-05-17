'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function MusicPlayer() {
  return (
    <div>
      <p className="text-sm">Playlist Lo-Fi</p>
      <div className="flex space-x-2 my-2">
        <Button size="sm">⏮</Button>
        <Button size="sm">▶️</Button>
        <Button size="sm">⏭</Button>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}

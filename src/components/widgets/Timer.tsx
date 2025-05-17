'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';

interface TimerProps {
  widgetId: string;
}

export default function Timer({ widgetId }: TimerProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { theme } = useAppStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const toggleTimer = () => setIsRunning((prev) => !prev);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="text-center space-y-4">
      <p
        className="text-3xl font-semibold"
        style={{ color: currentTheme.text }}
      >
        {new Date(time * 1000).toISOString().substr(14, 5)}
      </p>
      <div className="flex justify-center space-x-3">
        <Button
          onClick={toggleTimer}
          style={{
            backgroundColor: currentTheme.primary,
            color: currentTheme.text,
          }}
          className="rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </Button>
        <Button
          variant="outline"
          onClick={resetTimer}
          style={{
            borderColor: currentTheme.accent,
            color: currentTheme.accent,
          }}
          className="rounded-lg px-4 py-2 hover:bg-opacity-10 hover:bg-white transition-colors"
        >
          Resetar
        </Button>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface TimerProps {
  widgetId: string;
}

export default function Timer({ widgetId }: TimerProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

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
    <div className="text-center">
      <p className="text-2xl">
        {new Date(time * 1000).toISOString().substr(14, 5)}
      </p>
      <div className="space-x-2 mt-2">
        <Button onClick={toggleTimer}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </Button>
        <Button variant="outline" onClick={resetTimer}>
          Resetar
        </Button>
      </div>
    </div>
  );
}

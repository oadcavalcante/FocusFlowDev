'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';

interface PomodoroProps {
  widgetId: string;
}

export default function Pomodoro({ widgetId }: PomodoroProps) {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [phase, setPhase] = useState<'focus' | 'shortBreak' | 'longBreak'>(
    'focus'
  );
  const { theme } = useAppStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
      audio.play();
      if (phase === 'focus') {
        if (cycle % 4 === 0) {
          setPhase('longBreak');
          setTime(15 * 60);
        } else {
          setPhase('shortBreak');
          setTime(5 * 60);
        }
        setCycle((prev) => prev + 1);
      } else {
        setPhase('focus');
        setTime(25 * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, phase, cycle]);

  const togglePomodoro = () => setIsRunning((prev) => !prev);
  const resetPomodoro = () => {
    setIsRunning(false);
    setTime(25 * 60);
    setCycle(1);
    setPhase('focus');
  };
  const skipPhase = () => {
    setIsRunning(false);
    if (phase === 'focus') {
      if (cycle % 4 === 0) {
        setPhase('longBreak');
        setTime(15 * 60);
      } else {
        setPhase('shortBreak');
        setTime(5 * 60);
      }
      setCycle((prev) => prev + 1);
    } else {
      setPhase('focus');
      setTime(25 * 60);
    }
  };

  return (
    <div className="text-center space-y-4">
      <p className="text-sm font-medium" style={{ color: currentTheme.text }}>
        {phase === 'focus'
          ? 'Foco'
          : phase === 'shortBreak'
          ? 'Pausa Curta'
          : 'Pausa Longa'}
      </p>
      <p
        className="text-3xl font-semibold"
        style={{ color: currentTheme.text }}
      >
        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
      </p>
      <div className="flex justify-center space-x-3">
        <Button
          onClick={togglePomodoro}
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
          onClick={resetPomodoro}
          style={{
            borderColor: currentTheme.accent,
            color: currentTheme.accent,
          }}
          className="rounded-lg px-4 py-2 hover:bg-opacity-10 hover:bg-white transition-colors"
        >
          Resetar
        </Button>
        <Button
          onClick={skipPhase}
          style={{
            backgroundColor: currentTheme.secondary,
            color: currentTheme.text,
          }}
          className="rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
        >
          Pular
        </Button>
      </div>
      <p className="text-sm" style={{ color: currentTheme.text }}>
        Ciclo {cycle}
      </p>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface PomodoroProps {
  widgetId: string;
}

export default function Pomodoro({ widgetId }: PomodoroProps) {
  const [time, setTime] = useState(25 * 60); // 25 minutos iniciais
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [phase, setPhase] = useState<'focus' | 'shortBreak' | 'longBreak'>(
    'focus'
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      // Fim do ciclo
      setIsRunning(false);
      const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');
      audio.play();
      if (phase === 'focus') {
        if (cycle % 4 === 0) {
          setPhase('longBreak');
          setTime(15 * 60); // 15 minutos de pausa longa
        } else {
          setPhase('shortBreak');
          setTime(5 * 60); // 5 minutos de pausa curta
        }
        setCycle((prev) => prev + 1);
      } else {
        setPhase('focus');
        setTime(25 * 60); // Volta para 25 minutos de foco
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
    <div className="text-center">
      <p className="text-sm">
        {phase === 'focus'
          ? 'Foco'
          : phase === 'shortBreak'
          ? 'Pausa Curta'
          : 'Pausa Longa'}
      </p>
      <p className="text-2xl">
        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
      </p>
      <div className="space-x-2 mt-2">
        <Button className="bg-red-500" onClick={togglePomodoro}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </Button>
        <Button variant="outline" onClick={resetPomodoro}>
          Resetar
        </Button>
        <Button className="bg-blue-500" onClick={skipPhase}>
          Pular
        </Button>
      </div>
      <p className="text-sm mt-2">Ciclo {cycle}</p>
    </div>
  );
}

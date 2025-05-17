'use client';

import { Button } from '@/components/ui/button';

export default function Pomodoro() {
  return (
    <div className="text-center">
      <p className="text-2xl">25:00</p>
      <div className="space-x-2 mt-2">
        <Button className="bg-red-500">Iniciar</Button>
        <Button variant="outline">Resetar</Button>
        <Button className="bg-blue-500">Pular</Button>
      </div>
      <p className="text-sm mt-2">Ciclo 1/4</p>
    </div>
  );
}

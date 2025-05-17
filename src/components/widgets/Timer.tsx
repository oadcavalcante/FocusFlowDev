'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Timer() {
  const [time, setTime] = useState(0);

  return (
    <div className="text-center">
      <p className="text-2xl">
        {new Date(time * 1000).toISOString().substr(14, 5)}
      </p>
      <div className="space-x-2 mt-2">
        <Button onClick={() => setTime((prev) => prev + 1)}>Iniciar</Button>
        <Button variant="outline" onClick={() => setTime(0)}>
          Resetar
        </Button>
      </div>
    </div>
  );
}

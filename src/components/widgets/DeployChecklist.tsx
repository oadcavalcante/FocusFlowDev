'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

export default function DeployChecklist() {
  const [checklist, setChecklist] = useState([
    { id: '1', label: 'Testar localmente', checked: false },
    { id: '2', label: 'Fazer build do projeto', checked: false },
    { id: '3', label: 'Verificar variáveis de ambiente', checked: false },
    { id: '4', label: 'Realizar deploy', checked: false },
  ]);

  const toggleItem = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="space-y-2">
      {checklist.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            checked={item.checked}
            onCheckedChange={() => toggleItem(item.id)}
          />
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

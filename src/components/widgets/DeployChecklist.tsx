'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface DeployChecklistProps {
  widgetId: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export default function DeployChecklist({ widgetId }: DeployChecklistProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', label: 'Testar localmente', checked: false },
    { id: '2', label: 'Fazer build do projeto', checked: false },
    { id: '3', label: 'Verificar variáveis de ambiente', checked: false },
    { id: '4', label: 'Realizar deploy', checked: false },
  ]);

  useEffect(() => {
    const savedChecklist = localStorage.getItem(`checklist-${widgetId}`);
    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist));
    }
  }, [widgetId]);

  useEffect(() => {
    localStorage.setItem(`checklist-${widgetId}`, JSON.stringify(checklist));
  }, [checklist]);

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

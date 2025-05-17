'use client';

import { useAppStore } from '@/store/store';
import { Button } from '@/components/ui/button';
import { PaintBrushIcon } from '@heroicons/react/24/outline';

export default function ThemeSelector() {
  const { theme, setTheme } = useAppStore();
  const themeOptions = [
    {
      name: 'blue',
      label: 'Azul',
      primary: '#3B82F6',
      text: '#FFFFFF',
      accent: '#60A5FA',
    },
    {
      name: 'red',
      label: 'Vermelho',
      primary: '#EF4444',
      text: '#FFFFFF',
      accent: '#F87171',
    },
    {
      name: 'green',
      label: 'Verde',
      primary: '#10B981',
      text: '#FFFFFF',
      accent: '#34D399',
    },
    {
      name: 'pink',
      label: 'Rosa',
      primary: '#EC4899',
      text: '#FFFFFF',
      accent: '#F472B6',
    },
    {
      name: 'yellow',
      label: 'Amarelo',
      primary: '#F59E0B',
      text: '#FFFFFF',
      accent: '#FBBF24',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {themeOptions.map((option) => (
        <Button
          key={option.name}
          onClick={() =>
            setTheme(
              option.name as 'blue' | 'red' | 'green' | 'pink' | 'yellow'
            )
          }
          style={{
            backgroundColor: option.primary,
            color: option.text,
            border:
              theme === option.name ? `2px solid ${option.accent}` : 'none',
          }}
          className="rounded-lg px-3 py-1 hover:opacity-90 transition-opacity"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

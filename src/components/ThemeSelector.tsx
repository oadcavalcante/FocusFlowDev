'use client';

import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';
import { Button } from '@/components/ui/button';

export default function ThemeSelector() {
  const { theme, setTheme } = useAppStore();
  const themeOptions = [
    { name: 'blue', label: 'Azul' },
    { name: 'red', label: 'Vermelho' },
    { name: 'green', label: 'Verde' },
    { name: 'pink', label: 'Rosa' },
    { name: 'yellow', label: 'Amarelo' },
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
            backgroundColor: themes[option.name as keyof typeof themes].primary,
            color: themes[option.name as keyof typeof themes].text,
            border:
              theme === option.name
                ? `2px solid ${
                    themes[option.name as keyof typeof themes].accent
                  }`
                : 'none',
          }}
          className="rounded-lg px-3 py-1 hover:opacity-90 transition-opacity"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

'use client';

import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';

export default function GoogleSearch() {
  const { theme } = useAppStore();
  const currentTheme = themes[theme];

  return (
    <Input
      placeholder="Pesquisar no Google"
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          window.open(
            `https://www.google.com/search?q=${e.currentTarget.value}`,
            '_blank'
          );
        }
      }}
      className="rounded-lg border"
      style={{ borderColor: currentTheme.accent, color: currentTheme.text }}
    />
  );
}

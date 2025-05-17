'use client';

import { Input } from '@/components/ui/input';

export default function GoogleSearch() {
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
    />
  );
}

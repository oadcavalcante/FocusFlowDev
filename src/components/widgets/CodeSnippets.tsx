'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CodeSnippets() {
  const [snippets, setSnippets] = useState<
    { language: string; code: string }[]
  >([]);
  const [newSnippet, setNewSnippet] = useState('');
  const [language, setLanguage] = useState('javascript');

  const addSnippet = () => {
    if (newSnippet) {
      setSnippets([...snippets, { language, code: newSnippet }]);
      setNewSnippet('');
    }
  };

  return (
    <div className="space-y-2">
      <Select onValueChange={setLanguage} defaultValue="javascript">
        <SelectTrigger>
          <SelectValue placeholder="Selecione a linguagem" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="css">CSS</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Digite seu código"
        value={newSnippet}
        onChange={(e) => setNewSnippet(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addSnippet()}
      />
      <Button onClick={addSnippet}>Adicionar Snippet</Button>
      <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
        {snippets.map((snippet, index) => (
          <li key={index} className="text-sm p-2 bg-gray-800 rounded">
            <strong>{snippet.language}</strong>: {snippet.code}
          </li>
        ))}
      </ul>
    </div>
  );
}

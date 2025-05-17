'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CodeSnippetsProps {
  widgetId: string;
}

interface Snippet {
  id: string;
  language: string;
  code: string;
}

export default function CodeSnippets({ widgetId }: CodeSnippetsProps) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [newSnippet, setNewSnippet] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const savedSnippets = localStorage.getItem(`snippets-${widgetId}`);
    if (savedSnippets) {
      setSnippets(JSON.parse(savedSnippets));
    }
  }, [widgetId]);

  useEffect(() => {
    localStorage.setItem(`snippets-${widgetId}`, JSON.stringify(snippets));
  }, [snippets]);

  const addOrUpdateSnippet = () => {
    if (newSnippet) {
      if (editingId) {
        setSnippets(
          snippets.map((snippet) =>
            snippet.id === editingId
              ? { ...snippet, language, code: newSnippet }
              : snippet
          )
        );
        setEditingId(null);
      } else {
        setSnippets([
          ...snippets,
          { id: Date.now().toString(), language, code: newSnippet },
        ]);
      }
      setNewSnippet('');
    }
  };

  const editSnippet = (snippet: Snippet) => {
    setNewSnippet(snippet.code);
    setLanguage(snippet.language);
    setEditingId(snippet.id);
  };

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
  };

  return (
    <div className="space-y-2">
      <Select onValueChange={setLanguage} value={language}>
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
        onKeyPress={(e) => e.key === 'Enter' && addOrUpdateSnippet()}
      />
      <Button onClick={addOrUpdateSnippet}>
        {editingId ? 'Atualizar' : 'Adicionar'} Snippet
      </Button>
      <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
        {snippets.map((snippet) => (
          <li
            key={snippet.id}
            className="flex items-center space-x-2 text-sm p-2 bg-gray-800 rounded"
          >
            <span>
              <strong>{snippet.language}</strong>: {snippet.code}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editSnippet(snippet)}
            >
              ✏️
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteSnippet(snippet.id)}
            >
              🗑️
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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
  const { theme } = useAppStore();
  const currentTheme = themes[theme];

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
    <div className="space-y-4">
      <div className="space-y-2">
        <Select onValueChange={setLanguage} value={language}>
          <SelectTrigger
            className="rounded-lg border"
            style={{
              borderColor: currentTheme.accent,
              color: currentTheme.text,
            }}
          >
            <SelectValue placeholder="Selecione a linguagem" />
          </SelectTrigger>
          <SelectContent
            style={{
              backgroundColor: currentTheme.cardBg,
              color: currentTheme.text,
            }}
          >
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
          className="rounded-lg border"
          style={{ borderColor: currentTheme.accent, color: currentTheme.text }}
        />
        <Button
          onClick={addOrUpdateSnippet}
          style={{
            backgroundColor: currentTheme.primary,
            color: currentTheme.text,
          }}
          className="w-full rounded-lg py-2 hover:opacity-90 transition-opacity"
        >
          {editingId ? 'Atualizar' : 'Adicionar'} Snippet
        </Button>
      </div>
      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {snippets.map((snippet) => (
          <li
            key={snippet.id}
            className="flex items-center space-x-2 text-sm p-3 rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: currentTheme.text,
            }}
          >
            <span className="flex-1">
              <strong>{snippet.language}</strong>: {snippet.code}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editSnippet(snippet)}
              className="hover:bg-opacity-20 hover:bg-white rounded-full"
            >
              <PencilIcon
                className="h-4 w-4"
                style={{ color: currentTheme.accent }}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteSnippet(snippet.id)}
              className="hover:bg-opacity-20 hover:bg-white rounded-full"
            >
              <TrashIcon
                className="h-4 w-4"
                style={{ color: currentTheme.accent }}
              />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

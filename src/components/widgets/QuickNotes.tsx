'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';
import { TrashIcon } from '@heroicons/react/24/outline';

interface QuickNotesProps {
  widgetId: string;
}

export default function QuickNotes({ widgetId }: QuickNotesProps) {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const { theme } = useAppStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    const savedNotes = localStorage.getItem(`quickNotes-${widgetId}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [widgetId]);

  useEffect(() => {
    localStorage.setItem(`quickNotes-${widgetId}`, JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Escreva uma nota"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addNote()}
        className="rounded-lg border"
        style={{ borderColor: currentTheme.accent, color: currentTheme.text }}
      />
      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {notes.map((note, index) => (
          <li
            key={index}
            className="flex items-center space-x-2 text-sm"
            style={{ color: currentTheme.text }}
          >
            <span className="flex-1">{note}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteNote(index)}
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

'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface QuickNotesProps {
  widgetId: string;
}

export default function QuickNotes({ widgetId }: QuickNotesProps) {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');

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
    <div>
      <Input
        placeholder="Escreva uma nota"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addNote()}
      />
      <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto">
        {notes.map((note, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm">
            <span>{note}</span>
            <Button variant="ghost" size="sm" onClick={() => deleteNote(index)}>
              🗑️
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

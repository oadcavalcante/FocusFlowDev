'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

export default function QuickNotes() {
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('quickNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quickNotes', JSON.stringify(notes));
  }, [notes]);

  const [newNote, setNewNote] = useState('');

  return (
    <div>
      <Input
        placeholder="Escreva uma nota"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && newNote) {
            setNotes([...notes, newNote]);
            setNewNote('');
          }
        }}
      />
      <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto">
        {notes.map((note, index) => (
          <li key={index} className="text-sm">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

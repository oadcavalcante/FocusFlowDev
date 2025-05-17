'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

export default function ToDoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  return (
    <div>
      <Input
        placeholder="Adicionar uma tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && newTask) {
            setTasks([...tasks, newTask]);
            setNewTask('');
          }
        }}
      />
      <ul className="mt-2 space-y-1">
        {tasks.map((task, index) => (
          <li key={index} className="text-sm">
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface ToDoListProps {
  widgetId: string;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function ToDoList({ widgetId }: ToDoListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks-${widgetId}`);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, [widgetId]);

  useEffect(() => {
    localStorage.setItem(`tasks-${widgetId}`, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <Input
        placeholder="Adicionar uma tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
      />
      <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <span
              className={`text-sm ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.text}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTask(task.id)}
            >
              🗑️
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

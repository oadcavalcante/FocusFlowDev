'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';
import { TrashIcon } from '@heroicons/react/24/outline';

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
  const { theme } = useAppStore();
  const currentTheme = themes[theme];

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
    <div className="space-y-4">
      <Input
        placeholder="Adicionar uma tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
        className="rounded-lg border"
        style={{ borderColor: currentTheme.accent, color: currentTheme.text }}
      />
      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              style={{ borderColor: currentTheme.accent }}
            />
            <span
              className={`text-sm flex-1 ${
                task.completed ? 'line-through opacity-60' : ''
              }`}
              style={{ color: currentTheme.text }}
            >
              {task.text}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTask(task.id)}
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

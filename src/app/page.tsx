'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/store';
import WidgetContent from '@/components/widgets/WidgetContent';
import ThemeSelector from '@/components/ThemeSelector';
import {
  ClockIcon,
  MusicalNoteIcon,
  ListBulletIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  CodeBracketIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  const { activeWidgets, theme, widgetPositions, addWidget, removeWidget } =
    useAppStore();

  useEffect(() => {
    const savedPositions = localStorage.getItem('widgetPositions');
    if (savedPositions) {
      useAppStore.setState({ widgetPositions: JSON.parse(savedPositions) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('widgetPositions', JSON.stringify(widgetPositions));
  }, [widgetPositions]);

  const widgets = [
    { name: 'Timer', icon: <ClockIcon className="h-6 w-6" /> },
    { name: 'MusicPlayer', icon: <MusicalNoteIcon className="h-6 w-6" /> },
    { name: 'ToDoList', icon: <ListBulletIcon className="h-6 w-6" /> },
    { name: 'Documentation', icon: <DocumentTextIcon className="h-6 w-6" /> },
    { name: 'QuickNotes', icon: <PencilSquareIcon className="h-6 w-6" /> },
    { name: 'CodeSnippets', icon: <CodeBracketIcon className="h-6 w-6" /> },
    {
      name: 'DeployChecklist',
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6" />,
    },
    { name: 'Pomodoro', icon: <ClockIcon className="h-6 w-6" /> },
    { name: 'GoogleSearch', icon: <MagnifyingGlassIcon className="h-6 w-6" /> },
    { name: 'ThemeManager', icon: <PaintBrushIcon className="h-6 w-6" /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col theme-${theme}`}>
      {/* Cabeçalho */}
      <header className="p-6 text-center">
        <h1 className="font-bold text-3xl">FocusFlowDev</h1>
        <p className="text-sm opacity-75">Seu Companheiro de Produtividade</p>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex items-center justify-center relative">
        <AnimatePresence>
          {activeWidgets.map((widget, index) => (
            <WidgetContent
              key={widget.id}
              widgetId={widget.id}
              widgetType={widget.type}
              onClose={() => removeWidget(widget.id)}
              initialPosition={{ x: 0, y: index * 10 }}
            />
          ))}
        </AnimatePresence>
      </main>

      {/* Barra Inferior */}
      <footer
        className="p-4 flex justify-center gap-3 rounded-t-2xl shadow-lg"
        style={{
          background: 'var(--theme-card-bg)',
          borderTop: '1px solid var(--theme-card-border)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {widgets.map((widget) => (
          <Button
            key={widget.name}
            variant="ghost"
            className="p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              color: 'var(--theme-text)',
              backgroundColor: activeWidgets.some((w) => w.type === widget.name)
                ? 'var(--theme-accent)'
                : 'transparent',
            }}
            onClick={() => {
              if (widget.name === 'ThemeManager') {
                addWidget(widget.name);
              } else {
                addWidget(widget.name);
              }
            }}
          >
            {widget.icon}
          </Button>
        ))}
      </footer>
    </div>
  );
}

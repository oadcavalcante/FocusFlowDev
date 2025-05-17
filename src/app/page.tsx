'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sun,
  Moon,
  Clock,
  Music,
  List,
  FileText,
  StickyNote,
  Code,
  CheckSquare,
  Search,
  Palette,
} from 'lucide-react';
import { useAppStore } from '@/store/store';
import WidgetContent from '@/components/widgets/WidgetContent';

export default function Home() {
  const {
    activeWidgets,
    theme,
    widgetPositions,
    addWidget,
    removeWidget,
    toggleTheme,
  } = useAppStore();

  // Carregar posições dos widgets do localStorage ao iniciar
  useEffect(() => {
    const savedPositions = localStorage.getItem('widgetPositions');
    if (savedPositions) {
      useAppStore.setState({ widgetPositions: JSON.parse(savedPositions) });
    }
  }, []);

  // Salvar posições dos widgets no localStorage ao atualizar
  useEffect(() => {
    localStorage.setItem('widgetPositions', JSON.stringify(widgetPositions));
  }, [widgetPositions]);

  const widgets = [
    { name: 'Timer', icon: <Clock className="h-6 w-6" /> },
    { name: 'MusicPlayer', icon: <Music className="h-6 w-6" /> },
    { name: 'ToDoList', icon: <List className="h-6 w-6" /> },
    { name: 'Documentation', icon: <FileText className="h-6 w-6" /> },
    { name: 'QuickNotes', icon: <StickyNote className="h-6 w-6" /> },
    { name: 'CodeSnippets', icon: <Code className="h-6 w-6" /> },
    { name: 'DeployChecklist', icon: <CheckSquare className="h-6 w-6" /> },
    { name: 'Pomodoro', icon: <Clock className="h-6 w-6" /> },
    { name: 'GoogleSearch', icon: <Search className="h-6 w-6" /> },
    {
      name: 'ThemeManager',
      icon:
        theme === 'dark' ? (
          <Sun className="h-6 w-6" />
        ) : (
          <Moon className="h-6 w-6" />
        ),
    },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900'
      } transition-colors duration-300`}
    >
      {/* Cabeçalho */}
      <header className="p-4 text-center">
        <h1 className="text-3xl font-bold">FocusFlowDev</h1>
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
      <footer className="p-4 flex justify-center space-x-4 bg-opacity-50 backdrop-blur-lg border-t border-gray-700">
        {widgets.map((widget) => (
          <Button
            key={widget.name}
            variant="ghost"
            className={`p-2 rounded-full hover:bg-gray-700`}
            onClick={() => {
              if (widget.name === 'ThemeManager') {
                toggleTheme();
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

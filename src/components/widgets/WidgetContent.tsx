'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';
import Timer from './Timer';
import MusicPlayer from './MusicPlayer';
import ToDoList from './ToDoList';
import Documentation from './Documentation';
import QuickNotes from './QuickNotes';
import CodeSnippets from './CodeSnippets';
import DeployChecklist from './DeployChecklist';
import Pomodoro from './Pomodoro';
import GoogleSearch from './GoogleSearch';
import ThemeManager from './ThemeManager';

interface WidgetContentProps {
  widgetId: string;
  widgetType: string;
  displayName: string;
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

export default function WidgetContent({
  widgetId,
  widgetType,
  displayName,
  onClose,
  initialPosition,
}: WidgetContentProps) {
  const { updateWidgetPosition, widgetPositions, theme } = useAppStore();
  const currentTheme = themes[theme];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      drag
      dragMomentum={false}
      onDragEnd={(e, info) => {
        updateWidgetPosition(widgetId, {
          x:
            (widgetPositions[widgetId]?.x || initialPosition.x) + info.offset.x,
          y:
            (widgetPositions[widgetId]?.y || initialPosition.y) + info.offset.y,
        });
      }}
      style={{
        position: 'absolute',
        x: widgetPositions[widgetId]?.x || initialPosition.x,
        y: widgetPositions[widgetId]?.y || initialPosition.y,
      }}
    >
      <Card
        className="w-80 p-5 rounded-xl shadow-xl"
        style={{
          background: currentTheme.cardBg,
          border: `1px solid ${currentTheme.cardBorder}`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-lg font-semibold"
            style={{ color: currentTheme.text }}
          >
            {displayName}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-opacity-20 hover:bg-white rounded-full"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke={currentTheme.text}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
        {widgetType === 'Timer' && <Timer widgetId={widgetId} />}
        {widgetType === 'MusicPlayer' && <MusicPlayer widgetId={widgetId} />}
        {widgetType === 'ToDoList' && <ToDoList widgetId={widgetId} />}
        {widgetType === 'Documentation' && <Documentation />}
        {widgetType === 'QuickNotes' && <QuickNotes widgetId={widgetId} />}
        {widgetType === 'CodeSnippets' && <CodeSnippets widgetId={widgetId} />}
        {widgetType === 'DeployChecklist' && (
          <DeployChecklist widgetId={widgetId} />
        )}
        {widgetType === 'Pomodoro' && <Pomodoro widgetId={widgetId} />}
        {widgetType === 'GoogleSearch' && <GoogleSearch />}
        {widgetType === 'ThemeManager' && <ThemeManager />}
      </Card>
    </motion.div>
  );
}

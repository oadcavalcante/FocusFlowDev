'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppStore } from '@/store/store';
import Timer from './Timer';
import MusicPlayer from './MusicPlayer';
import ToDoList from './ToDoList';
import Documentation from './Documentation';
import QuickNotes from './QuickNotes';
import CodeSnippets from './CodeSnippets';
import DeployChecklist from './DeployChecklist';
import Pomodoro from './Pomodoro';
import GoogleSearch from './GoogleSearch';

interface WidgetContentProps {
  widgetId: string;
  widgetType: string;
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

export default function WidgetContent({
  widgetId,
  widgetType,
  onClose,
  initialPosition,
}: WidgetContentProps) {
  const { updateWidgetPosition, widgetPositions } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
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
      <Card className="w-80 p-4 bg-opacity-90 backdrop-blur-lg border border-gray-700 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{widgetType}</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
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
      </Card>
    </motion.div>
  );
}

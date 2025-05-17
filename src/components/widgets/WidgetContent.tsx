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
  widget: string;
  onClose: () => void;
  initialPosition: { x: number; y: number };
}

export default function WidgetContent({
  widget,
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
        updateWidgetPosition(widget, {
          x: (widgetPositions[widget]?.x || initialPosition.x) + info.offset.x,
          y: (widgetPositions[widget]?.y || initialPosition.y) + info.offset.y,
        });
      }}
      style={{
        position: 'absolute',
        x: widgetPositions[widget]?.x || initialPosition.x,
        y: widgetPositions[widget]?.y || initialPosition.y,
      }}
    >
      <Card className="w-80 p-4 bg-opacity-90 backdrop-blur-lg border border-gray-700 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{widget}</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>
        {widget === 'Timer' && <Timer />}
        {widget === 'MusicPlayer' && <MusicPlayer />}
        {widget === 'ToDoList' && <ToDoList />}
        {widget === 'Documentation' && <Documentation />}
        {widget === 'QuickNotes' && <QuickNotes />}
        {widget === 'CodeSnippets' && <CodeSnippets />}
        {widget === 'DeployChecklist' && <DeployChecklist />}
        {widget === 'Pomodoro' && <Pomodoro />}
        {widget === 'GoogleSearch' && <GoogleSearch />}
      </Card>
    </motion.div>
  );
}

import { create } from 'zustand';

interface WidgetInstance {
  id: string;
  type: string;
}

interface AppState {
  activeWidgets: WidgetInstance[];
  theme: 'blue' | 'red' | 'green' | 'pink' | 'yellow';
  widgetPositions: { [key: string]: { x: number; y: number } };
  addWidget: (type: string) => void;
  removeWidget: (id: string) => void;
  setTheme: (theme: 'blue' | 'red' | 'green' | 'pink' | 'yellow') => void;
  updateWidgetPosition: (id: string, position: { x: number; y: number }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeWidgets: [],
  theme: 'blue', 
  widgetPositions: {},
  addWidget: (type) => set((state) => {
    const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return {
      activeWidgets: [...state.activeWidgets, { id, type }],
    };
  }),
  removeWidget: (id) => set((state) => ({
    activeWidgets: state.activeWidgets.filter((w) => w.id !== id),
  })),
  setTheme: (theme) => set({ theme }),
  updateWidgetPosition: (id, position) =>
    set((state) => ({
      widgetPositions: { ...state.widgetPositions, [id]: position },
    })),
}));
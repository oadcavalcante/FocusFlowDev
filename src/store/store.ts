import { create } from 'zustand';

interface AppState {
  activeWidgets: string[];
  theme: 'dark' | 'light';
  widgetPositions: { [key: string]: { x: number; y: number } };
  addWidget: (widget: string) => void;
  removeWidget: (widget: string) => void;
  toggleTheme: () => void;
  updateWidgetPosition: (widget: string, position: { x: number; y: number }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeWidgets: [],
  theme: 'dark',
  widgetPositions: {},
  addWidget: (widget) => set((state) => ({
    activeWidgets: [...state.activeWidgets, widget],
  })),
  removeWidget: (widget) => set((state) => ({
    activeWidgets: state.activeWidgets.filter((w) => w !== widget),
  })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  updateWidgetPosition: (widget, position) =>
    set((state) => ({
      widgetPositions: { ...state.widgetPositions, [widget]: position },
    })),
}));
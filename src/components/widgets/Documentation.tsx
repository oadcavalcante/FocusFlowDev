import { useAppStore } from '@/store/store';
import { themes } from '@/styles/design-system';

export default function Documentation() {
  const { theme } = useAppStore();
  const currentTheme = themes[theme];

  return (
    <div className="text-sm space-y-3" style={{ color: currentTheme.text }}>
      <p className="font-semibold">Bem-vindo ao FocusFlowDev!</p>
      <p>
        Este aplicativo foi projetado para aumentar sua produtividade com
        ferramentas como:
      </p>
      <ul className="list-disc pl-4 space-y-1">
        <li>Timer e Pomodoro para gerenciar o tempo.</li>
        <li>Lista de Tarefas e Notas Rápidas para organização.</li>
        <li>Snippets de Código e Checklist de Deploy para desenvolvedores.</li>
        <li>Música Lo-Fi para foco e relaxamento.</li>
      </ul>
      <p>
        Clique nos ícones abaixo para abrir os widgets e arraste-os para
        reposicionar.
      </p>
    </div>
  );
}

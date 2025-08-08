'use client';

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

/**
 * Компонент переключателя темы.
 * 
 * @param props - Пропсы компонента:
 *   - darkMode: Текущий режим темы
 *   - toggleDarkMode: Функция переключения темы
 */
export default function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
'use client';

interface ErrorMessageProps {
  message: string;
  darkMode: boolean;
}

/**
 * Компонент отображения сообщения об ошибке.
 * 
 * @param props - Пропсы компонента:
 *   - message: Текст ошибки
 *   - darkMode: Флаг темной темы
 */
export default function ErrorMessage({ message, darkMode }: ErrorMessageProps) {
  return (
    <div className={`mb-6 p-4 rounded-lg border ${darkMode ? 'bg-red-900 border-red-700 text-red-100' : 'bg-red-50 border-red-200 text-red-700'}`}>
      {message}
    </div>
  );
}
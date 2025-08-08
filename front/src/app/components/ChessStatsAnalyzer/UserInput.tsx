'use client';
import DarkModeToggle from '../UI/DarkModeToggle';

interface UserInputProps {
  username: string;
  setUsername: (username: string) => void;
  loading: boolean;
  fetchGames: (username: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

/**
 * Компонент формы ввода пользователя.
 * 
 * @param props - Пропсы компонента:
 *   - username: Текущее имя пользователя
 *   - setUsername: Функция обновления имени пользователя
 *   - loading: Флаг загрузки
 *   - fetchGames: Функция загрузки данных
 *   - darkMode: Текущий режим темы
 *   - toggleDarkMode: Функция переключения темы
 */
export default function UserInput({
  username,
  setUsername,
  loading,
  fetchGames,
  darkMode,
  toggleDarkMode
}: UserInputProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Анализатор шахматных дебютов</h1>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Имя пользователя Lichess"
          className={`flex-1 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400' : 'border-gray-300'}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchGames(username)}
        />
        <button
          onClick={() => fetchGames(username)}
          disabled={loading}
          className={`px-6 py-2 font-medium rounded-lg transition-colors ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Анализ...
            </span>
          ) : 'Анализировать'}
        </button>
      </div>
    </>
  );
}
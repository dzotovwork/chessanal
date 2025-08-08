'use client';
import { useState } from 'react';
import useDarkMode from '@/app/hooks/useDarkMode';
import useChessStats from '@/app/hooks/useChessStats';
import UserInput from './UserInput';
import OpeningTable from './OpeningTable';
import { OpeningStats } from './types';

/**
 * Основной компонент анализатора шахматной статистики.
 * Управляет состоянием приложения, объединяет все подкомпоненты.
 */
export default function ChessStatsAnalyzer() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [username, setUsername] = useState('');
  const { openings, loading, error, fetchGames } = useChessStats();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`max-w-4xl mx-auto rounded-xl shadow-md overflow-hidden transition-colors duration-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6 md:p-8">
          <UserInput 
            username={username}
            setUsername={setUsername}
            loading={loading}
            fetchGames={fetchGames}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          
          {error && (
            <div className={`mb-6 p-4 rounded-lg border ${darkMode ? 'bg-red-900 border-red-700 text-red-100' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {error}
            </div>
          )}

          {Object.keys(openings).length > 0 && (
            <OpeningTable openings={openings} darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  );
}
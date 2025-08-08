'use client';
import { sortOpenings } from './utils';
import { OpeningStats } from './types';

interface OpeningTableProps {
  openings: OpeningStats;
  darkMode: boolean;
}

/**
 * Компонент таблицы с результатами по дебютам.
 * 
 * @param props - Пропсы компонента:
 *   - openings: Статистика по дебютам
 *   - darkMode: Флаг темной темы
 */
export default function OpeningTable({ openings, darkMode }: OpeningTableProps) {
  const sortedOpenings = sortOpenings(openings);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Дебют</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">ECO</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Партии</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Победы</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Поражения</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Ничьи</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Успешность</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
          {sortedOpenings.map(([key, data]) => (
            <tr key={key} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${darkMode ? 'font-medium text-white' : 'font-medium text-gray-900'}`}>
                {data.name}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                {data.eco}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                {data.total}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600">
                {data.wins}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                {data.losses}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {data.draws}
              </td>
              <td className={`px-4 py-4 whitespace-nowrap text-sm font-bold ${data.wins/data.total > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.round((data.wins / data.total) * 100)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
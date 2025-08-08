'use client';
import { useState } from 'react';
import axios from 'axios';
import { OpeningStats } from '@/app/components/ChessStatsAnalyzer/types';
import { processGame } from '@/app/components/ChessStatsAnalyzer/utils';

/**
 * Хук для загрузки и обработки шахматной статистики с Lichess API.
 * 
 * @returns {Object} Объект с:
 *   - openings: OpeningStats - статистика по дебютам
 *   - loading: boolean - флаг загрузки
 *   - error: string - сообщение об ошибке
 *   - fetchGames: (username: string) => Promise<void> - функция загрузки данных
 */

export default function useChessStats() {
  const [openings, setOpenings] = useState<OpeningStats>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGames = async (username: string) => {
    if (!username.trim()) {
      setError('Введите имя пользователя Lichess');
      return;
    }
    
    setLoading(true);
    setError('');
    setOpenings({});

    try {
      const response = await axios.get(
        `https://lichess.org/api/games/user/${username}`,
        {
          params: {
            max: 100,
            moves: false,
            tags: true,
            opening: true
          },
          headers: {
            Accept: 'application/x-ndjson'
          }
        }
      );

      const games = response.data
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => JSON.parse(line));

      if (!games || games.length === 0) {
        setError('Не найдено партий для этого игрока');
        return;
      }

      const stats: OpeningStats = {};

      games.forEach((game: any) => {
        try {
          processGame(game, username, stats);
        } catch (e) {
          console.error('Error processing game:', e);
        }
      });

      setOpenings(stats);

    } catch (err) {
      console.error("Ошибка API:", err);
      setError('Ошибка при загрузке партий. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return { openings, loading, error, fetchGames };
}
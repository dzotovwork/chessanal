/**
 * Типы данных для анализатора шахматной статистики.
 */

/**
 * Статистика по дебютам.
 * Ключ - строка в формате "название дебюта|ECO-код"
 */
export type OpeningStats = {
  [key: string]: {
    name: string;     // Название дебюта
    eco: string;      // ECO-код
    wins: number;     // Количество побед
    losses: number;   // Количество поражений
    draws: number;    // Количество ничьих
    total: number;    // Общее количество партий
  };
};

/**
 * Результат партии.
 */
export type GameResult = 'win' | 'loss' | 'draw';

/**
 * Структура данных игры с Lichess API.
 */
export interface LichessGame {
  opening?: {
    name?: string;
    eco?: string;
  };
  players?: {
    white?: {
      user?: {
        name?: string;
      };
    };
  };
  status?: string;
  winner?: 'white' | 'black';
}
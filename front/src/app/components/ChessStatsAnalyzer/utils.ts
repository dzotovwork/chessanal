import { OpeningStats, GameResult, LichessGame } from './types';

/**
 * Обрабатывает данные одной игры и обновляет статистику.
 * Подробно логирует каждый шаг обработки.
 * 
 * @param game - Данные игры с Lichess API
 * @param username - Имя пользователя для анализа
 * @param stats - Объект статистики для обновления
 */
export const processGame = (game: LichessGame, username: string, stats: OpeningStats) => {
  console.group('Processing new game');
  try {
    console.log('Initial game data:', JSON.stringify(game, null, 2));
    
    // 1. Получаем информацию об открытии
    let openingName = game.opening?.name || 'Unknown';
    if(openingName !== 'Unknown'){
        // openingName = openingName.split(":")[0]
        // openingName = openingName.split(":")[0]
    }

    const eco = game.opening?.eco || '?';
    console.log(`Opening identified: ${openingName} (${eco})`);

    // 2. Определяем цвет игрока
    const isWhite = game.players?.white?.user?.name?.toLowerCase() === username.toLowerCase();
    console.log(`User ${username} playing as: ${isWhite ? 'white' : 'black'}`);

    // 3. Определяем результат игры
    let result: GameResult;
    if (game.status === 'draw') {
      result = 'draw';
      console.log('Game result: draw');
    } else if (game.winner === 'white') {
      result = isWhite ? 'win' : 'loss';
      console.log(`Game result: ${result} (white won)`);
    } else {
      result = isWhite ? 'loss' : 'win';
      console.log(`Game result: ${result} (black won)`);
    }

    // 4. Создаем ключ для статистики
    const openingKey = `${openingName}|${eco}`;
    console.log(`Using stats key: ${openingKey}`);

    // 5. Инициализируем запись в статистике если нужно
    if (!stats[openingKey]) {
      stats[openingKey] = { 
        name: openingName,
        eco,
        wins: 0, 
        losses: 0, 
        draws: 0,
        total: 0
      };
      console.log('Created new stats entry for this opening');
    }

    // 6. Обновляем статистику
    stats[openingKey].total++;
    console.log(`Incremented total games: ${stats[openingKey].total}`);

    if (result === 'win') {
      stats[openingKey].wins++;
      console.log(`Incremented wins: ${stats[openingKey].wins}`);
    } else if (result === 'loss') {
      stats[openingKey].losses++;
      console.log(`Incremented losses: ${stats[openingKey].losses}`);
    } else {
      stats[openingKey].draws++;
      console.log(`Incremented draws: ${stats[openingKey].draws}`);
    }

    console.log('Updated stats:', JSON.stringify(stats[openingKey], null, 2));
  } catch (e) {
    console.error('Error processing game:', e);
    throw e; // Перебрасываем ошибку для обработки в вызывающем коде
  } finally {
    console.groupEnd();
  }
};

/**
 * Сортирует дебюты по количеству партий (по убыванию).
 * 
 * @param openings - Статистика по дебютам
 * @returns Отсортированный массив записей [ключ, данные]
 */
export const sortOpenings = (openings: OpeningStats) => {
  return Object.entries(openings)
    .sort((a, b) => b[1].total - a[1].total);
};
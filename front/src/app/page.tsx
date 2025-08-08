import ChessStatsAnalyzer from './components/ChessStatsAnalyzer';

/**
 * Главная страница приложения.
 * Рендерит основной компонент ChessStatsAnalyzer.
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <ChessStatsAnalyzer />
    </main>
  );
}
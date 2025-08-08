'use client';
import { useState, useEffect } from 'react';

/**
 * Кастомный хук для работы с темной темой.
 * 
 * @returns {Object} Объект с:
 *   - darkMode: boolean - текущий режим темы
 *   - toggleDarkMode: () => void - функция переключения темы
 */
export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode };
}
import { useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '@/stores/gameStore';

export const useGameControls = () => {
  const { screen, movePlayer, setPlayerX } = useGameStore();
  const touchStartX = useRef<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (screen !== 'game') return;
    
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      movePlayer('left');
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      movePlayer('right');
    }
  }, [screen, movePlayer]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (screen !== 'game') return;
    touchStartX.current = e.touches[0].clientX;
  }, [screen]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (screen !== 'game' || touchStartX.current === null) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    
    if (Math.abs(diff) > 10) {
      movePlayer(diff > 0 ? 'right' : 'left');
      touchStartX.current = currentX;
    }
  }, [screen, movePlayer]);

  const handleTouchEnd = useCallback(() => {
    touchStartX.current = null;
  }, []);

  // Tap zones for mobile
  const handleTouchTap = useCallback((e: TouchEvent) => {
    if (screen !== 'game') return;
    
    const screenWidth = window.innerWidth;
    const tapX = e.touches[0].clientX;
    
    if (tapX < screenWidth / 2) {
      movePlayer('left');
    } else {
      movePlayer('right');
    }
  }, [screen, movePlayer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return null;
};

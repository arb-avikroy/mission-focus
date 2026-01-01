import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';

let obstacleId = 0;

export const useGameLoop = () => {
  const {
    screen,
    gameSpeed,
    gameAreaWidth,
    gameAreaHeight,
    incrementScore,
    addObstacle,
    updateObstacles,
    increaseSpeed,
  } = useGameStore();

  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const obstacleTimerRef = useRef<number>(0);
  const scoreTimerRef = useRef<number>(0);
  const speedTimerRef = useRef<number>(0);

  const gameLoop = useCallback((timestamp: number) => {
    if (screen !== 'game') return;

    const deltaTime = Math.min((timestamp - lastTimeRef.current) / 16.67, 3);
    lastTimeRef.current = timestamp;

    // Update obstacles
    updateObstacles(deltaTime);

    // Spawn new obstacles
    obstacleTimerRef.current += deltaTime;
    const spawnInterval = Math.max(30, 60 - gameSpeed * 5);
    
    if (obstacleTimerRef.current >= spawnInterval) {
      obstacleTimerRef.current = 0;
      const obstacleWidth = 40 + Math.random() * 40;
      const obstacleX = Math.random() * (gameAreaWidth - obstacleWidth);
      
      addObstacle({
        id: obstacleId++,
        x: obstacleX,
        y: -50,
        width: obstacleWidth,
        height: 30 + Math.random() * 20,
        speed: 3 + Math.random() * 2,
      });
    }

    // Increment score
    scoreTimerRef.current += deltaTime;
    if (scoreTimerRef.current >= 10) {
      scoreTimerRef.current = 0;
      incrementScore();
    }

    // Increase difficulty
    speedTimerRef.current += deltaTime;
    if (speedTimerRef.current >= 300) {
      speedTimerRef.current = 0;
      increaseSpeed();
    }

    frameRef.current = requestAnimationFrame(gameLoop);
  }, [screen, gameSpeed, gameAreaWidth, updateObstacles, addObstacle, incrementScore, increaseSpeed]);

  useEffect(() => {
    if (screen === 'game') {
      lastTimeRef.current = performance.now();
      obstacleTimerRef.current = 0;
      scoreTimerRef.current = 0;
      speedTimerRef.current = 0;
      frameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [screen, gameLoop]);

  return null;
};

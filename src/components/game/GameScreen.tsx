import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useGameControls } from '@/hooks/useGameControls';
import { Player } from './Player';
import { Obstacle } from './Obstacle';
import { GameHUD } from './GameHUD';

export const GameScreen = () => {
  const { 
    lives, 
    score, 
    playerX, 
    obstacles, 
    isHit,
    setGameArea,
    gameAreaWidth,
    gameAreaHeight,
  } = useGameStore();
  
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Initialize hooks
  useGameLoop();
  useGameControls();

  // Set game area dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        setGameArea(rect.width, rect.height);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [setGameArea]);

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Game container */}
      <motion.div 
        className={`relative w-full max-w-lg h-[70vh] max-h-[600px] rounded-2xl overflow-hidden shadow-card border border-border/50 bg-card ${isHit ? 'animate-shake' : ''}`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Hit flash overlay */}
        <AnimatePresence>
          {isHit && (
            <motion.div
              className="absolute inset-0 z-30 bg-destructive/30 pointer-events-none"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* HUD */}
        <GameHUD lives={lives} score={score} />

        {/* Game area */}
        <div 
          ref={gameAreaRef}
          className="absolute inset-0 overflow-hidden"
        >
          {/* Obstacles */}
          <AnimatePresence>
            {obstacles.map((obstacle) => (
              <Obstacle key={obstacle.id} obstacle={obstacle} />
            ))}
          </AnimatePresence>

          {/* Player */}
          <Player x={playerX} gameAreaWidth={gameAreaWidth} />
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />

        {/* Mobile touch zones hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground/50 md:hidden">
          <span>← Tap left</span>
          <span className="w-px h-3 bg-border" />
          <span>Tap right →</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

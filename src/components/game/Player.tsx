import { motion } from 'framer-motion';

interface PlayerProps {
  x: number;
  gameAreaWidth: number;
}

export const Player = ({ x, gameAreaWidth }: PlayerProps) => {
  const playerWidth = 60;
  const pixelX = (x / 100) * gameAreaWidth - playerWidth / 2;

  return (
    <motion.div
      className="absolute bottom-20 z-10"
      style={{ 
        left: pixelX,
        width: playerWidth,
      }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Player ship/avatar */}
      <div className="relative">
        {/* Glow effect - gold */}
        <div className="absolute inset-0 bg-primary/40 blur-lg rounded-full" />
        
        {/* Main body - gold gradient */}
        <div className="relative w-full h-10 bg-gradient-to-t from-primary to-primary/70 rounded-t-full rounded-b-lg glow-accent">
          {/* Cockpit */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/30 rounded-full" />
          
          {/* Wings */}
          <div className="absolute -left-2 bottom-0 w-3 h-6 bg-primary/80 rounded-l-full" />
          <div className="absolute -right-2 bottom-0 w-3 h-6 bg-primary/80 rounded-r-full" />
          
          {/* Engine glow - warm gold */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary blur-md animate-pulse-slow" />
        </div>
      </div>
    </motion.div>
  );
};

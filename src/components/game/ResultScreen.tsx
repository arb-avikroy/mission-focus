import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/stores/gameStore';
import { RotateCcw, Home, Target } from 'lucide-react';

export const ResultScreen = () => {
  const { score, startGame, resetGame } = useGameStore();

  const isMissionComplete = score >= 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-destructive/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Result card */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="card-elevated p-8 md:p-10 text-center">
          {/* Status icon */}
          <motion.div 
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 border ${
              isMissionComplete 
                ? 'bg-primary/10 border-primary/20' 
                : 'bg-destructive/10 border-destructive/20'
            }`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Target className={`w-10 h-10 ${isMissionComplete ? 'text-primary' : 'text-destructive'}`} />
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2 tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isMissionComplete ? 'Mission Complete' : 'Mission Failed'}
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            className={`w-16 h-px mx-auto mb-6 ${isMissionComplete ? 'bg-primary/50' : 'bg-destructive/50'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          />

          {/* Score display */}
          <motion.div 
            className="my-6 py-4 px-6 bg-muted/30 border border-border rounded-xl inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Final Score</p>
            <p className="text-4xl md:text-5xl font-display font-bold text-primary tabular-nums">{score}</p>
          </motion.div>

          {/* Story outro */}
          <motion.p 
            className="text-muted-foreground leading-relaxed mb-8 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {isMissionComplete 
              ? "Outstanding work, pilot. The mission was a success. Ready for another challenge?"
              : "You held on as long as you could. Next time, you'll go further."
            }
          </motion.p>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              variant="game" 
              size="lg"
              onClick={startGame}
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Mission
            </Button>
            <Button 
              variant="gameOutline" 
              size="lg"
              onClick={resetGame}
              className="flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Start
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

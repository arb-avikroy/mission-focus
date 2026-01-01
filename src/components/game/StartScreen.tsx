import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGameStore } from '@/stores/gameStore';
import { Rocket } from 'lucide-react';

export const StartScreen = () => {
  const { startGame } = useGameStore();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      </div>

      {/* Main card */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="card-elevated p-8 md:p-10 text-center">
          {/* Icon */}
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl mb-6"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Rocket className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Mission Control
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            className="w-16 h-px bg-primary/50 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          />

          {/* Story intro */}
          <motion.p 
            className="text-muted-foreground leading-relaxed mb-8 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            You are navigating a critical mission through an asteroid field. 
            One wrong move costs a life. <span className="text-primary font-medium">Stay focused.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              variant="game" 
              size="xl"
              onClick={startGame}
              className="w-full"
            >
              Start Mission
            </Button>
          </motion.div>

          {/* Controls hint */}
          <motion.p 
            className="mt-6 text-xs text-muted-foreground/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Use <kbd className="px-1.5 py-0.5 bg-muted/50 border border-border rounded text-foreground/70 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-muted/50 border border-border rounded text-foreground/70 font-mono text-[10px]">→</kbd> or <kbd className="px-1.5 py-0.5 bg-muted/50 border border-border rounded text-foreground/70 font-mono text-[10px]">A</kbd> <kbd className="px-1.5 py-0.5 bg-muted/50 border border-border rounded text-foreground/70 font-mono text-[10px]">D</kbd> to move • Swipe on mobile
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

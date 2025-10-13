"use client";

import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  speedX: number;
  speedY: number;
  rotationSpeed: number;
}

interface ConfettiCelebrationProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function ConfettiCelebration({ trigger, onComplete }: ConfettiCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!trigger || isActive) return;

    setIsActive(true);

    // Camino brand colors - calm, warm palette
    const colors = [
      '#E2C379', // Primary gold
      '#F4E9D8', // Light cream
      '#C9A961', // Deeper gold
      '#8B7355', // Warm brown
      '#DCC9A8', // Soft tan
    ];

    // Create confetti pieces
    const pieces: ConfettiPiece[] = [];
    const pieceCount = 50; // Calm celebration, not overwhelming

    for (let i = 0; i < pieceCount; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100, // Start across the full width
        y: -20, // Start above viewport
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        speedX: (Math.random() - 0.5) * 2,
        speedY: Math.random() * 2 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    setConfetti(pieces);

    // Clear confetti after animation completes
    const timer = setTimeout(() => {
      setConfetti([]);
      setIsActive(false);
      onComplete?.();
    }, 4000);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (!isActive || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confettiFall 3s ease-in forwards, confettiSpin 1s linear infinite`,
            animationDelay: `${Math.random() * 0.5}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            opacity: 0.9,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confettiFall {
          to {
            transform: translateY(120vh) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }
        @keyframes confettiSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

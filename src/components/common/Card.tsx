import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'party' | 'glass';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
}) => {
  const variants = {
    default: 'bg-white rounded-xl shadow-lg border border-gray-100',
    party: 'bg-white/90 rounded-xl shadow-lg border border-party-gold-300/50 backdrop-blur-sm',
    glass: 'glass rounded-xl',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(178, 34, 34, 0.15)' } : undefined}
      transition={{ duration: 0.3 }}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;

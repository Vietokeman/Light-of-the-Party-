import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'gold' | 'gray' | 'green';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'red',
  size = 'md',
  className = '',
}) => {
  const variants = {
    red: 'bg-party-red-100 text-party-red-700 border-party-red-200',
    gold: 'bg-party-gold-100 text-party-gold-700 border-party-gold-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
    green: 'bg-green-100 text-green-700 border-green-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

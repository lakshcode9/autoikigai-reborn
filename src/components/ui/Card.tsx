'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'interactive' | 'minimal';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
}

const variantStyles = {
  default: {
    base: 'border border-depth-3 bg-depth-1',
    hover: 'hover:border-depth-4 hover:bg-depth-2',
  },
  elevated: {
    base: 'border border-depth-3 bg-linear-gradient(135deg, --depth-1 0%, --depth-2 100%) shadow-lg shadow-black/40',
    hover:
      'hover:border-radium/50 hover:shadow-lg hover:shadow-radium/20 hover:bg-depth-2',
  },
  interactive: {
    base: 'border border-depth-3 bg-depth-1 cursor-pointer',
    hover:
      'hover:border-radium hover:bg-depth-2 hover:shadow-lg hover:shadow-radium/20',
  },
  minimal: {
    base: 'border-b border-depth-3 bg-transparent',
    hover: 'hover:border-radium/50',
  },
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      interactive = false,
      onClick,
      className = '',
      icon,
      title,
      description,
    },
    ref
  ) => {
    const styles = variantStyles[variant];
    const isInteractive = interactive || !!onClick;

    return (
      <motion.div
        ref={ref}
        className={`rounded-sm overflow-hidden transition-all duration-300 ${
          styles.base
        } ${isInteractive ? styles.hover : ''} ${className}`}
        onClick={onClick}
        whileHover={isInteractive ? { scale: 1.02 } : {}}
        whileTap={isInteractive ? { scale: 0.98 } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with Icon/Title */}
        {(icon || title) && (
          <div className="flex items-start gap-3 p-4 md:p-6 border-b border-depth-3">
            {icon && (
              <motion.div
                className="text-2xl flex-shrink-0 text-radium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              >
                {icon}
              </motion.div>
            )}
            <div>
              {title && (
                <h3 className="font-mono-tight uppercase tracking-wider text-sm text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-muted mt-1">{description}</p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div
          className={`${icon || title ? 'p-4 md:p-6' : 'p-4 md:p-6'}`}
        >
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

/* Card Grid - Mobile Optimized */
interface CardGridProps {
  children: ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = '1.5rem',
}) => {
  return (
    <div
      className={`grid grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`}
      style={{ gap }}
    >
      {children}
    </div>
  );
};

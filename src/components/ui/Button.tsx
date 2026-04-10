'use client';

import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
  whileHover?: any;
  whileTap?: any;
}

const variantStyles = {
  primary: {
    base: 'bg-radium text-black hover:bg-[#00c2dd]',
    glow: 'shadow-lg shadow-radium/30 hover:shadow-radium/50',
  },
  secondary: {
    base: 'bg-depth-3 text-white hover:bg-depth-4',
    glow: 'shadow-lg shadow-black/30',
  },
  outline: {
    base: 'border border-white/20 text-white hover:bg-white/5 hover:border-white/30',
    glow: '',
  },
  ghost: {
    base: 'text-white hover:bg-white/5',
    glow: '',
  },
  accent: {
    base: 'bg-accent-pink text-white hover:bg-accent-pink-dark',
    glow: 'shadow-lg shadow-accent-pink/30 hover:shadow-accent-pink/50',
  },
  minimal: {
    base: 'text-white underline-accent hover:text-radium',
    glow: '',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs font-mono-tight',
  md: 'px-4 py-2 text-sm font-mono-tight',
  lg: 'px-6 py-3 text-base font-bebas tracking-wider',
  xl: 'px-8 py-4 text-lg font-bebas tracking-widest',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      href,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];
    const baseClass = `relative inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
      fullWidth ? 'w-full' : ''
    } ${variantStyle.base} ${variantStyle.glow} ${sizeStyle} ${className}`;

    const content = (
      <>
        {icon && iconPosition === 'left' && !isLoading && (
          <motion.span
            initial={{ x: -4, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}

        {isLoading && (
          <motion.svg
            className="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}

        <span>{children}</span>

        {icon && iconPosition === 'right' && !isLoading && (
          <motion.span
            initial={{ x: 4, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          className={baseClass}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          ref={ref as any}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseClass}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

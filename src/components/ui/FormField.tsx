'use client';

import React, { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  icon?: ReactNode;
  variant?: 'default' | 'accent' | 'minimal';
  hint?: string;
}

export const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    {
      label,
      type = 'text',
      name,
      placeholder,
      value,
      onChange,
      error,
      success,
      disabled,
      required,
      multiline,
      rows = 4,
      icon,
      variant = 'default',
      hint,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setHasValue(!!e.target.value);
      onChange?.(e);
    };

    const variantStyles = {
      default: {
        container: 'bg-depth-2 border border-depth-3',
        containerFocus: 'bg-depth-1 border-radium shadow-lg shadow-radium/20',
        label: 'text-muted-light',
      },
      accent: {
        container: 'bg-accent-pink/5 border border-accent-pink/20',
        containerFocus: 'bg-accent-pink/10 border-accent-pink shadow-lg shadow-accent-pink/30',
        label: 'text-accent-pink',
      },
      minimal: {
        container: 'bg-transparent border-b-2 border-depth-3',
        containerFocus: 'bg-transparent border-b-2 border-radium',
        label: 'text-muted',
      },
    };

    const styles = variantStyles[variant];

    return (
      <motion.div
        className="w-full mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Floating Label */}
        <motion.label
          className={`block mb-2 text-xs font-mono-tight uppercase tracking-wider transition-all ${
            isFocused || hasValue
              ? 'text-radium text-[10px]'
              : styles.label
          }`}
          animate={{
            fontSize: isFocused || hasValue ? '10px' : '12px',
            letterSpacing: isFocused || hasValue ? '0.1em' : '0.05em',
          }}
          transition={{ duration: 0.2 }}
        >
          {label} {required && <span className="text-error">*</span>}
        </motion.label>

        {/* Input Container */}
        <motion.div
          className={`relative flex items-center gap-2 px-4 py-3 rounded-sm transition-all duration-200 ${
            isFocused ? styles.containerFocus : styles.container
          } ${error ? 'border-error border-opacity-50' : ''} ${
            success ? 'border-success border-opacity-50' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          whileHover={!disabled ? { scale: 1.01 } : {}}
          animate={{
            borderColor: error
              ? 'rgb(239, 68, 68)'
              : success
                ? 'rgb(16, 185, 129)'
                : undefined,
          }}
        >
          {/* Icon */}
          {icon && (
            <motion.div
              className="text-muted-light flex-shrink-0"
              animate={{
                color: isFocused ? 'rgb(0, 224, 255)' : 'rgb(153, 153, 153)',
              }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.div>
          )}

          {/* Input Field */}
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              rows={rows}
              className="w-full bg-transparent outline-none text-white placeholder:text-muted/40 resize-none"
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              className="w-full bg-transparent outline-none text-white placeholder:text-muted/40"
            />
          )}

          {/* Status Indicators */}
          {error && (
            <motion.div
              className="text-error text-lg flex-shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              ✕
            </motion.div>
          )}
          {success && !error && (
            <motion.div
              className="text-success text-lg flex-shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              ✓
            </motion.div>
          )}
        </motion.div>

        {/* Helper Text */}
        {hint && !error && (
          <motion.p
            className="text-xs text-muted mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {hint}
          </motion.p>
        )}

        {/* Error Message */}
        {error && (
          <motion.p
            className="text-xs text-error mt-1"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

FormField.displayName = 'FormField';

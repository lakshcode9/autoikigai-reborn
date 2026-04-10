'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  icon?: React.ReactNode;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (
    message: string,
    type?: ToastType,
    duration?: number,
    icon?: React.ReactNode
  ) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      duration: number = 3000,
      icon?: React.ReactNode
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: Toast = { id, message, type, duration, icon };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none md:bottom-8 md:right-8 sm:w-auto w-[calc(100%-2rem)]">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const typeConfig = {
    success: {
      bg: 'bg-success/10',
      border: 'border-success/30',
      text: 'text-success',
      icon: '✓',
      glow: 'shadow-success/20',
    },
    error: {
      bg: 'bg-error/10',
      border: 'border-error/30',
      text: 'text-error',
      icon: '✕',
      glow: 'shadow-error/20',
    },
    info: {
      bg: 'bg-info/10',
      border: 'border-info/30',
      text: 'text-info',
      icon: 'ⓘ',
      glow: 'shadow-info/20',
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      text: 'text-warning',
      icon: '⚠',
      glow: 'shadow-warning/20',
    },
  };

  const config = typeConfig[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 400, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 400, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-sm border pointer-events-auto ${config.bg} ${config.border} shadow-lg ${config.glow}`}
    >
      {/* Icon */}
      <motion.div
        className={`flex-shrink-0 text-lg font-bold ${config.text}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {toast.icon || config.icon}
      </motion.div>

      {/* Message */}
      <div className="flex-grow text-sm text-white">{toast.message}</div>

      {/* Close Button */}
      <motion.button
        onClick={onClose}
        className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        ✕
      </motion.button>

      {/* Progress Bar */}
      {toast.duration && toast.duration > 0 && (
        <motion.div
          className={`absolute bottom-0 left-0 h-0.5 ${
            toast.type === 'success'
              ? 'bg-success'
              : toast.type === 'error'
                ? 'bg-error'
                : toast.type === 'warning'
                  ? 'bg-warning'
                  : 'bg-info'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
};

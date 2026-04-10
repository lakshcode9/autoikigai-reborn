'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  keyExtractor: (row: T) => string | number;
  loading?: boolean;
  emptyMessage?: string;
  variant?: 'default' | 'striped' | 'minimal';
}

export const DataTable = React.forwardRef<
  HTMLDivElement,
  DataTableProps<any>
>(
  (
    {
      columns,
      data,
      onRowClick,
      keyExtractor,
      loading = false,
      emptyMessage = 'No data available',
      variant = 'default',
    },
    ref
  ) => {
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: 'asc' | 'desc';
    } | null>(null);

    const handleSort = (key: string) => {
      setSortConfig((prev) => {
        if (prev?.key === key) {
          return {
            key,
            direction: prev.direction === 'asc' ? 'desc' : 'asc',
          };
        }
        return { key, direction: 'asc' };
      });
    };

    const sortedData = [...data].sort((a, b) => {
      if (!sortConfig) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const variantStyles = {
      default: 'border border-depth-3',
      striped: 'border border-depth-3',
      minimal: 'border-b border-depth-3',
    };

    if (loading) {
      return (
        <div className="space-y-4" ref={ref}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="h-12 bg-depth-2 rounded animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </div>
      );
    }

    if (data.length === 0) {
      return (
        <motion.div
          className="py-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          ref={ref}
        >
          <p className="text-muted mb-4">{emptyMessage}</p>
          <div className="text-6xl opacity-20">∅</div>
        </motion.div>
      );
    }

    return (
      <div ref={ref} className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className={`border-b-2 border-depth-3 ${variantStyles[variant]}`}>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-4 py-3 text-left text-xs font-mono-tight uppercase tracking-wider text-muted-light hover:text-radium transition-colors"
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(String(column.key))}
                      className="flex items-center gap-2 cursor-pointer hover:text-radium transition-colors"
                    >
                      {column.label}
                      {sortConfig?.key === String(column.key) && (
                        <motion.span
                          animate={{
                            rotate:
                              sortConfig.direction === 'asc' ? 0 : 180,
                          }}
                          transition={{ duration: 0.2 }}
                          className="inline-block"
                        >
                          ↑
                        </motion.span>
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <motion.tr
                key={keyExtractor(row)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.03 }}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-depth-3 transition-all ${
                  variant === 'striped' && rowIndex % 2 === 0
                    ? 'bg-depth-2/40'
                    : ''
                } ${
                  onRowClick
                    ? 'cursor-pointer hover:bg-depth-2/80 hover:border-radium/50 hover:shadow-lg hover:shadow-radium/10'
                    : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-4 py-3 text-sm text-white"
                    style={{ width: column.width }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: rowIndex * 0.03 + 0.1 }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] || '–')}
                    </motion.div>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type StackedImageHoverProps = {
  /** List of image URLs to stack (back -> front order). */
  images: string[];

  /** Width in px. Default: 640 */
  width?: number;

  /** Height in px. Default: 260 */
  height?: number;

  /** Container background (behind images). Default: '#000' */
  backgroundColor?: string;

  /** Rotation in deg. Default: -30 */
  rotateDeg?: number;

  /** Skew in deg. Default: 25 */
  skewDeg?: number;

  /** Scale multiplier. Default: 0.6 */
  scale?: number;

  /** Base pixel shift per layer. Default: 40 (so 40, 80, 120, …) */
  stepPx?: number;

  /** Hover opacity range [min..1]. Default: 0.4 */
  minOpacity?: number;

  /** Accessibility label */
  ariaLabel?: string;

  /** Extra class on root */
  className?: string;
};

export default function StackedImageHover({
  images,
  width = 640,
  height = 260,
  backgroundColor = '#000',
  rotateDeg = -30,
  skewDeg = 25,
  scale = 0.6,
  stepPx = 40,
  minOpacity = 0.4,
  ariaLabel = 'stacked image hover effect',
  className = '',
}: StackedImageHoverProps) {
  const n = images?.length || 0;
  const denom = Math.max(1, n - 1);

  return (
    <motion.div
      className={`relative mx-auto transition-transform duration-500 ease-in-out ${className}`}
      style={{
        width,
        height,
        background: backgroundColor,
        transform: `rotate(${rotateDeg}deg) skew(${skewDeg}deg) scale(${scale})`,
      }}
      role="region"
      aria-label={ariaLabel}
      initial="rest"
      whileHover="hover"
    >
      {images.map((src, i) => {
        const shift = stepPx * (i + 1);
        const targetOpacity = (i === n - 1) ? 1 : (minOpacity + (i * (1 - minOpacity) / denom));

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ zIndex: i }}
            variants={{
              rest: { x: 0, y: 0, opacity: 1 },
              hover: { x: shift, y: -shift, opacity: targetOpacity }
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
              src={src}
              alt={`stacked image ${i + 1}`}
              fill
              className="object-cover"
              // Use unoptimized to avoid Next image domain config for external URLs
              unoptimized
              priority={i === n - 1}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export { StackedImageHover };

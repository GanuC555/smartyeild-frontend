'use client';

import { type HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface FlickeringGridProps extends HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  text?: string;
  fontSize?: number;
  fontWeight?: number | string;
}

export function FlickeringGrid({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.1,
  color = '#6B7280',
  maxOpacity = 0.3,
  text = '',
  fontSize = 90,
  fontWeight = 600,
  className,
  ...props
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const textFont = useMemo(
    () => `${fontWeight} ${fontSize}px "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    [fontSize, fontWeight]
  );

  const setupGrid = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const cols = Math.ceil(width / (squareSize + gridGap));
      const rows = Math.ceil(height / (squareSize + gridGap));
      const cells = new Float32Array(cols * rows);

      for (let i = 0; i < cells.length; i++) {
        cells[i] = Math.random() * maxOpacity;
      }

      return { dpr, cols, rows, cells, width, height };
    },
    [gridGap, maxOpacity, squareSize]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let frame = setupGrid(canvas, container.clientWidth, container.clientHeight);

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      frame = setupGrid(canvas, width, height);
    };

    const draw = (timeDelta: number) => {
      const { cols, rows, dpr, cells, width, height } = frame;

      for (let i = 0; i < cells.length; i++) {
        if (Math.random() < flickerChance * timeDelta) {
          cells[i] = Math.random() * maxOpacity;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;
      const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
      if (!maskCtx) return;

      if (text) {
        maskCtx.save();
        maskCtx.scale(dpr, dpr);
        maskCtx.fillStyle = '#fff';
        maskCtx.font = textFont;
        maskCtx.textAlign = 'center';
        maskCtx.textBaseline = 'middle';
        maskCtx.fillText(text, width / 2, height / 2);
        maskCtx.restore();
      }

      ctx.fillStyle = color;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const px = x * (squareSize + gridGap) * dpr;
          const py = y * (squareSize + gridGap) * dpr;
          const w = squareSize * dpr;
          const h = squareSize * dpr;

          const maskData = maskCtx.getImageData(px, py, w, h).data;
          const intersectsText = maskData.some((value, index) => index % 4 === 0 && value > 0);

          const baseOpacity = cells[x * rows + y];
          ctx.globalAlpha = intersectsText ? Math.min(1, baseOpacity * 3 + 0.35) : baseOpacity;
          ctx.fillRect(px, py, w, h);
        }
      }

      ctx.globalAlpha = 1;
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });
    intersectionObserver.observe(container);

    updateSize();

    let last = 0;
    const animate = (time: number) => {
      if (!isInView) return;
      const delta = (time - last) / 1000;
      last = time;
      draw(delta);
      raf = requestAnimationFrame(animate);
    };

    if (isInView) {
      raf = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [color, flickerChance, isInView, maxOpacity, setupGrid, squareSize, gridGap, text, textFont]);

  return (
    <div ref={containerRef} className={cn('h-full w-full', className)} {...props}>
      <canvas ref={canvasRef} className="pointer-events-none h-full w-full" />
    </div>
  );
}

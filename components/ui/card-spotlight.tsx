"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export function CardSpotlight({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-md border border-neutral-800 bg-black p-10 dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        )}
      </motion.div>
      {children}
    </div>
  );
}

function CanvasRevealEffect({
  animationSpeed = 5,
  containerClassName,
  colors = [[59, 130, 246]],
  dotSize = 3,
}: {
  animationSpeed?: number;
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01 * animationSpeed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.floor(canvas.width / (dotSize * 4));
      const rows = Math.floor(canvas.height / (dotSize * 4));

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSize * 4 + dotSize * 2;
          const y = j * dotSize * 4 + dotSize * 2;

          const noise =
            Math.sin(x * 0.01 + time) *
            Math.cos(y * 0.01 + time) *
            Math.sin(time * 0.5);

          if (noise > 0.1) {
            const colorIndex = Math.floor(
              ((noise + 1) / 2) * colors.length
            ) % colors.length;
            const [r, g, b] = colors[colorIndex];
            const opacity = Math.max(0, noise * 0.6);

            ctx.beginPath();
            ctx.arc(x, y, dotSize * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [animationSpeed, colors, dotSize]);

  return (
    <div className={cn("h-full w-full", containerClassName)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

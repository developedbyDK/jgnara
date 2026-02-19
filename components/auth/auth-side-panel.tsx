"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  IconBackhoe,
  IconTruck,
  IconCrane,
  IconBulldozer,
} from "@tabler/icons-react";

export function AuthSidePanel() {
  return (
    <div className="relative z-20 hidden w-full items-center justify-center overflow-hidden border-l border-neutral-100 bg-white md:flex dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-sm">
        <div
          className="mb-6 flex items-center justify-center text-4xl tracking-tight"
          style={{ fontFamily: "'EutmanEungtteong', sans-serif" }}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-3xl font-bold text-white">
            J
          </span>
          <span className="ml-1.5 text-orange-500">중기</span>
          <span className="text-orange-600">.com</span>
        </div>
        <EquipmentIcons />
        <p className="text-center text-xl font-semibold text-neutral-600 dark:text-neutral-400">
          대한민국 No.1 중장비 매매
        </p>
        <p className="mt-8 text-center text-base font-normal text-neutral-500 dark:text-neutral-400">
          중기나라에서 굴삭기, 덤프트럭, 크레인 등 다양한 중장비를 만나보세요.
          신뢰할 수 있는 매물과 편리한 거래를 경험하세요.
        </p>
      </div>

      <GridLineHorizontal
        className="top-4 left-1/2 -translate-x-1/2"
        offset="-10px"
      />
      <GridLineHorizontal
        className="top-auto bottom-4 left-1/2 -translate-x-1/2"
        offset="-10px"
      />
      <GridLineVertical
        className="top-1/2 left-10 -translate-y-1/2"
        offset="-10px"
      />
      <GridLineVertical
        className="top-1/2 right-10 left-auto -translate-y-1/2"
        offset="-10px"
      />
    </div>
  );
}

function EquipmentIcons() {
  const icons = [
    { name: "굴삭기", icon: IconBackhoe },
    { name: "덤프트럭", icon: IconTruck },
    { name: "크레인", icon: IconCrane },
    { name: "불도저", icon: IconBulldozer },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex flex-row items-center justify-center gap-4">
        {icons.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.1, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <item.icon className="h-7 w-7 text-neutral-600 dark:text-neutral-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GridLineHorizontal({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    />
  );
}

function GridLineVertical({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    />
  );
}

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 items-stretch", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.title + idx}
          className="relative group block p-4 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl w-full h-full p-6 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 shadow-lg flex flex-col justify-between",
        className
      )}
    >
      <div className="relative z-50 flex flex-col justify-center items-center h-full text-center">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 text-xl font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p className={cn("mt-4 text-zinc-400 text-sm text-center leading-relaxed", className)}>
      {children}
    </p>
  );
};

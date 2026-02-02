import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/app/components/ui/utils";

// FadeIn Component for standardized animations
export const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Section Wrapper
export const Section = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={cn("py-10 md:py-16 px-6 md:px-12 max-w-7xl mx-auto", className)}>
    {children}
  </section>
);

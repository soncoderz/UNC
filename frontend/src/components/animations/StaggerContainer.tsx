"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode, Children, isValidElement } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: (custom: { delayChildren: number; staggerChildren: number }) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delayChildren,
      staggerChildren: custom.staggerChildren,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.1, duration: 0.6 },
  },
};

export function StaggerContainer({
  children,
  delayChildren = 0,
  staggerChildren = 0.1,
  className = "",
  once = true,
}: StaggerContainerProps) {
  // Wrap individual children with a motion.div item
  const wrappedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    return <motion.div variants={itemVariants}>{child}</motion.div>;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-50px" }}
      custom={{ delayChildren, staggerChildren }}
      className={className}
    >
      {wrappedChildren}
    </motion.div>
  );
}

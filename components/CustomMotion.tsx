'use client';

import { motion } from 'framer-motion';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export function OpacityPageTransitionMotion({
  className,
  children,
  keyName
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  keyName: string;
}): JSX.Element {
  return (
    <motion.div
      key={keyName}
      variants={{
        hidden: { opacity: 0 },
        display: { opacity: 1 }
      }}
      initial="hidden"
      animate="display"
      // exit animation doesn't work with css modules,
      // as it removes css modules styling after going to another page in prod
      exit="hidden"
      transition={{ duration: 1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

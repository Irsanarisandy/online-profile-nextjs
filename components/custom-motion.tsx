import { motion } from 'framer-motion';

interface IProp {
  children: React.ReactNode;
  classes?: string;
}

const OpacityPageTransitionMotion = ({children, classes}: IProp) => (
  <motion.div
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
    className={classes}
  >
    {children}
  </motion.div>
);

export { OpacityPageTransitionMotion };
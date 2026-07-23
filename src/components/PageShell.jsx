import { motion } from 'framer-motion';

export default function PageShell({ children, className = '' }) {
  return (
    <motion.main
      className={`page-shell ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}

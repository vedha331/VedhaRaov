import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

export default function CelebrationCompleted() {
  const navigate = useNavigate();

  return (
    <PageShell className="celebration-completed-page">
      <motion.section
        className="celebration-layout"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="celebration-content">
          <motion.div
            className="party-emoji"
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉
          </motion.div>

          <motion.div
            className="smile-emoji"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            😊
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Celebration Completed
          </motion.h1>

          <motion.p
            className="celebration-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Where was the party? 🥳
          </motion.p>

          <motion.button
            className="next-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Back to Home
          </motion.button>
        </div>
      </motion.section>
    </PageShell>
  );
}

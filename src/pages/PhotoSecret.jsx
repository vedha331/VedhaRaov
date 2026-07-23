import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

export default function PhotoSecret() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-navigate after 3 seconds (optional)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageShell className="photo-secret-page">
      <section className="secret-layout">
        <motion.div 
          className="secret-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, duration: 0.6 }}
        >
          <motion.span 
            className="secret-emoji"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔐
          </motion.span>
          
          <motion.p 
            className="secret-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We found a photo of you<br />
            We will show you at last! 📸
          </motion.p>

          <motion.button 
            className="next-button"
            onClick={() => navigate('/surprise')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Next ➜
          </motion.button>
        </motion.div>
      </section>
    </PageShell>
  );
}

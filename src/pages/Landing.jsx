import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.removeItem('birthday-name');
  }, []);

  return (
    <PageShell className="landing-page">
      <div className="floating-orb orb-a" /><div className="floating-orb orb-b" /><div className="floating-orb orb-c" />
      <section className="landing-content">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>A little moment, made just for you</motion.p>
        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, type: 'spring' }}>
          Something wonderful<br />is about to begin.
        </motion.h1>
        <motion.p className="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>Step inside for a tiny celebration with a very big smile.</motion.p>
        <motion.button className="primary-button" onClick={() => navigate('/home')} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <span>Let’s start the celebration</span><b>→</b>
        </motion.button>
      </section>
      <div className="confetti-dots" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
    </PageShell>
  );
}

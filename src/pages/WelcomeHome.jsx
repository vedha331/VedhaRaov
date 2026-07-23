import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

export default function WelcomeHome() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const continueToSurprise = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    sessionStorage.setItem('birthday-name', trimmed);
    navigate('/location');
  };
  return (
    <PageShell className="home-page">
      <section className="home-layout">
        <motion.div className="house-illustration" initial={{ x: -35, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 }} aria-hidden="true">
          <div className="roof" /><div className="chimney" /><div className="house-body"><span className="window left" /><span className="door" /><span className="window right" /></div>
          <div className="bush bush-left" /><div className="bush bush-right" />
        </motion.div>
        <motion.section className="name-card" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
          <span className="sparkle">✦</span><p className="eyebrow pink">Welcome home</p>
          <h1>Sweet hello!</h1><p className="card-copy">Before the magic begins, what should we call the guest of honour?</p>
          <form onSubmit={continueToSurprise}>
            <label htmlFor="name">Your beautiful name</label>
            <input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Type your name here" autoComplete="given-name" maxLength="32" />
            <motion.button className="primary-button" type="submit" disabled={!name.trim()} whileHover={{ scale: name.trim() ? 1.03 : 1 }} whileTap={{ scale: 0.97 }}>Continue <b>→</b></motion.button>
          </form>
        </motion.section>
      </section>
    </PageShell>
  );
}

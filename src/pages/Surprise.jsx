import { useCallback, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import BirthdayMessageCard from '../components/BirthdayMessageCard';
import Cake from '../components/Cake';
import NightSky from '../components/NightSky';
import PageShell from '../components/PageShell';

const sillyScenes = [
  ['Birthday loading...', 'Calculating how awesome you are...'],
  ['Official birthday inspection!', 'Checking for extra cake permissions...'],
  ['Party engines ready!', 'Result: dangerously awesome!'],
];

const firework = () => {
  const end = Date.now() + 1200;
  const colors = ['#ffdc5d', '#ff7597', '#9e8cff', '#8cf3d2'];
  const frame = () => {
    confetti({ particleCount: 45, startVelocity: 34, spread: 75, origin: { x: Math.random() * 0.7 + 0.15, y: Math.random() * 0.33 }, colors, zIndex: 20 });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
};

export default function Surprise() {
  const [name] = useState(() => sessionStorage.getItem('birthday-name') || 'Friend');
  const [opened, setOpened] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [sillyScene, setSillyScene] = useState(0);
  const celebrate = useCallback(() => { setCandlesOut(true); firework(); }, []);

  useEffect(() => {
    if (countdown === null) return undefined;
    if (countdown === 0) {
      const timers = [
        window.setTimeout(() => setSillyScene(1), 2200),
        window.setTimeout(() => setSillyScene(2), 4400),
        window.setTimeout(celebrate, 6600),
      ];
      return () => timers.forEach(window.clearTimeout);
    }
    const timer = window.setTimeout(() => setCountdown((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown, celebrate]);

  if (!opened) return <PageShell className="surprise-intro"><motion.section className="surprise-card" initial={{ rotateX: -18, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} transition={{ duration: 0.6 }}><div className="ribbon ribbon-v" /><div className="ribbon ribbon-h" /><div className="bow"><i /><i /></div><p className="eyebrow pink">A message for {name}</p><h1>Thank you for being you.</h1><p>A little surprise is waiting behind this ribbon. Ready to unwrap a moment of joy?</p><motion.button className="reveal-box" onClick={() => setOpened(true)} whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }}><span className="gift-icon">*</span> Click to see your surprise <b>-&gt;</b></motion.button></motion.section></PageShell>;

  if (candlesOut) return <PageShell className="cake-page final-card-page"><Confetti recycle={false} numberOfPieces={420} gravity={0.18} colors={['#ffdc5d', '#ff7597', '#9e8cff', '#8cf3d2']} /><NightSky /><motion.section className="final-card-content" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 110, damping: 16 }}><BirthdayMessageCard name={name} /></motion.section></PageShell>;

  const [sillyTitle, sillyDetail] = sillyScenes[sillyScene];
  return <PageShell className="cake-page"><NightSky /><section className="cake-content"><motion.p className="eyebrow gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Tonight is all about you</motion.p><motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>Happy Birthday,<br /><em>{name}!</em></motion.h1><Cake candlesOut={false} /><div className="blow-panel">{countdown === null ? <><p>Make a wish, then begin the birthday countdown.</p><motion.button className="light-button" onClick={() => { setSillyScene(0); setCountdown(3); }} whileTap={{ scale: 0.97 }}>Start the countdown</motion.button></> : countdown === 0 ? <motion.div className="birthday-loading" key={sillyScene} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}><div className="party-parade" aria-hidden="true"><i /><i /><i /></div><span className="dancing-cake">Ewww....</span><strong>{sillyTitle}</strong><small>{sillyDetail}</small><b>{sillyScene === 2 ? 'Launch the confetti!' : 'Please wait...'}</b></motion.div> : <motion.div className="countdown" key={countdown} initial={{ scale: 0.35, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 15 }}>{countdown}</motion.div>}</div></section></PageShell>;
}

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

export default function ProfileInfo() {
  const [displayedInfo, setDisplayedInfo] = useState([]);
  const navigate = useNavigate();

  const profileData = [
    { label: 'Blood', value: 'A+', emoji: '🩸' },
    { label: 'Working', value: 'Software', emoji: '💻' },
    { label: 'Others', value: 'Rider', emoji: '🏍️' },
    { label: 'Qualities', value: 'Kind Hearted', emoji: '💖' },
    { label: 'Current Location', value: 'Hyderabad', emoji: '📍' },
  ];

  useEffect(() => {
    profileData.forEach((item, index) => {
      setTimeout(() => {
        setDisplayedInfo((prev) => [...prev, item]);
      }, index * 400);
    });

    const totalTime = profileData.length * 400 + 1000;
    const timer = setTimeout(() => {
      navigate('/surprise');
    }, totalTime);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageShell className="profile-info-page">
      <section className="info-layout">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Loading Your Profile... 🎯
        </motion.h1>

        <motion.div className="info-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {displayedInfo.map((item, index) => (
            <motion.div
              key={index}
              className="info-item"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <span className="info-emoji">{item.emoji}</span>
              <div className="info-text">
                <span className="info-label">{item.label}</span>
                <span className="info-value">{item.value}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {displayedInfo.length === profileData.length && (
          <motion.p
            className="completion-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            All details loaded! ✨ Redirecting...
          </motion.p>
        )}
      </section>
    </PageShell>
  );
}

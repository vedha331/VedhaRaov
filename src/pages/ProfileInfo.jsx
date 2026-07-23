import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

export default function ProfileInfo() {
  const [displayedInfo, setDisplayedInfo] = useState([]);
  const navigate = useNavigate();

  const profileData = [
    { label: 'Blood', value: 'universal', emoji: '🩸' },
    { label: 'Working', value: 'Software', emoji: '💻' },
    { label: 'Hobbies', value: 'Rider', emoji: '🏍️' },
    { label: 'Qualities', value: 'Kind Hearted', emoji: '💖' },
    { label: 'Current Location', value: 'Hyderabad', emoji: '📍' },
  ];

  useEffect(() => {
    const timers = [];
    
    profileData.forEach((item, index) => {
      const timer = setTimeout(() => {
        setDisplayedInfo((prev) => {
          if (!prev.find(p => p.label === item.label)) {
            return [...prev, item];
          }
          return prev;
        });
      }, index * 400);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const regularItems = displayedInfo.slice(0, -1);
  const lastItem = displayedInfo[displayedInfo.length - 1];
  const showNextButton = displayedInfo.length === profileData.length;

  return (
    <PageShell className="profile-info-page">
      <section className="info-layout">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Loading Your Profile... 🎯
        </motion.h1>

        <motion.div className="info-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {regularItems.map((item, index) => (
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

          {lastItem && (
            <div className="location-with-button">
              <motion.div
                className="info-item"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <span className="info-emoji">{lastItem.emoji}</span>
                <div className="info-text">
                  <span className="info-label">{lastItem.label}</span>
                  <span className="info-value">{lastItem.value}</span>
                </div>
              </motion.div>

              {showNextButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="next-button-beside"
                  onClick={() => navigate('/photo-secret')}
                >
                  Next <span className="arrow">→</span>
                </motion.button>
              )}
            </div>
          )}
        </motion.div>

        {displayedInfo.length === profileData.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="completion-text"
          >
            Profile loaded! ✨
          </motion.p>
        )}
      </section>
    </PageShell>
  );
}

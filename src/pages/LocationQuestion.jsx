import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

export default function LocationQuestion() {
  const [location, setLocation] = useState('');
  const [showThinking, setShowThinking] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonPos, setYesButtonPos] = useState({ x: 0, y: 0 });
  const [factMessageShown, setFactMessageShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showThinking) {
      const timer = setTimeout(() => {
        setFactMessageShown(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showThinking]);

  const handleContinue = (event) => {
    event.preventDefault();
    if (location.trim()) {
      setShowThinking(true);
    }
  };

  const handleYes = () => {
    sessionStorage.setItem('birthday-location', location.trim());
    navigate('/profile');
  };

  const moveYesButton = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 150 - 75;
    setYesButtonPos({ x: randomX, y: randomY });
  };

  const moveNoButton = () => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 150 - 75;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleButtonHover = () => {
    moveYesButton();
    moveNoButton();
  };

  if (showThinking) {
    return (
      <PageShell className="location-thinking-page">
        <section className="thinking-layout">
          <motion.div className="thinking-content" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <motion.div className="thinking-emoji" animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🤔
            </motion.div>
            
            <motion.p className="thinking-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span className="highlight">{location}</span> is a wonderful place! 🌍
            </motion.p>
            
            <motion.p className="confirmation-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              I am thinking today a <span className="highlight">boy born</span> there... 💭
            </motion.p>

            <motion.div className="button-group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <motion.button
                className="primary-button yes-btn"
                animate={{ x: yesButtonPos.x, y: yesButtonPos.y }}
                onHoverStart={handleButtonHover}
                onMouseEnter={handleButtonHover}
              >
                Yes! 💕
              </motion.button>
              
              <motion.button
                className="secondary-button no-btn"
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onHoverStart={handleButtonHover}
                onMouseEnter={handleButtonHover}
              >
                No
              </motion.button>
            </motion.div>

            {factMessageShown && (
              <motion.div className="fact-message" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                <motion.div className="laugh-emoji" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                  😂
                </motion.div>
                <motion.p className="fact-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  You can't select yes and no because <span className="highlight">it's a FACT!</span> 😉
                </motion.p>
                <motion.button
                  className="primary-button"
                  onClick={handleYes}
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue 🎉
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell className="location-page">
      <section className="location-layout">
        <motion.div className="location-card" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
          <span className="sparkle">✦</span>
          <p className="eyebrow pink">A bit about you</p>
          <h1>Where were you born?</h1>
          <p className="card-copy">Tell me the special place that made you, you</p>
          
          <form onSubmit={handleContinue}>
            <label htmlFor="location">Your birthplace</label>
            <input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter your birthplace"
              maxLength="50"
            />
            <motion.button
              className="primary-button"
              type="submit"
              disabled={!location.trim()}
              whileHover={{ scale: location.trim() ? 1.03 : 1 }}
              whileTap={{ scale: 0.97 }}
            >
              Continue <b>→</b>
            </motion.button>
          </form>
        </motion.div>
      </section>
    </PageShell>
  );
}

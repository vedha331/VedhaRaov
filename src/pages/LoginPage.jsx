import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    if (name.trim()) {
      sessionStorage.setItem('birthday-name', name.trim());
      navigate('/location');
    }
  };

  return (
    <motion.div 
      className="login-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-layout">
        <div className="login-card">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1>✨Sweet Login✨</h1>
            <p className="login-subtitle">Let's make this moment special, tell us your name!</p>
            
            <form onSubmit={handleContinue}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="login-input"
                  autoFocus
                />
              </div>
              
              <button
                type="submit"
                className="login-button"
                disabled={!name.trim()}
              >
                Continue <span className="arrow">→</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

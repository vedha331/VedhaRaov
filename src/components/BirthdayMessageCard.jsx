import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const message = [
  'Happy Birthday! I pray that God blesses you with good health, peace, happiness, and success in everything you do. May your life always be filled with hope, love, and countless beautiful moments.',
  "There are very few people whose presence brings comfort, and you're one of them. Even when you're angry with me, I never stop seeing the kindness in your heart. That's what makes you so special to me—your heart is gentle, even when your words aren't.",
  "Thank you for every memory, every laugh, every moment of support, and for simply being part of my life. Knowing you has been a blessing, and I'll always be grateful for the place you hold in my heart.",
  "I sincerely pray that our friendship never fades with time. May it grow stronger with every passing year, through every season of life. No matter where life takes us, I hope we'll always have a reason to smile when we think of our friendship.",
  'On your special day, I ask God to protect you, guide you, and fill your life with people who love you genuinely. May every tear be replaced with joy, every struggle with strength, and every dream with fulfillment.',
  'Happy Birthday once again! Thank you for being you. Some friendships are gifts, and to me, ours is one of them. Wishing you a lifetime of happiness, peace, and endless blessings. God bless you always.',
];

export default function BirthdayMessageCard({ name }) {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);
  const celebrateAgain = (event) => {
    event.stopPropagation();
    confetti({ particleCount: 180, spread: 100, startVelocity: 42, origin: { y: 0.65 }, colors: ['#ffdc5d', '#ff7597', '#9e8cff', '#8cf3d2'] });
    setTimeout(() => {
      navigate('/celebration-completed');
    }, 500);
  };
  return (
    <div className="birthday-card-stage">
      <motion.button
        className="birthday-flip-card"
        onClick={() => setFlipped((value) => !value)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120, damping: 17 }}
        aria-label={flipped ? 'Show birthday photo' : 'Show birthday greeting'}
      >
        <section className="birthday-card-face birthday-card-front">
          {hasPhoto && <img src="/birthday-boy.jpg" alt={`Birthday photo of ${name}`} onError={() => setHasPhoto(false)} />}
          {!hasPhoto && <div className="photo-placeholder"><span>{name.charAt(0).toUpperCase()}</span><small>Birthday star</small></div>}
          <div className="photo-label"><span>Birthday boy</span><strong>{name}</strong></div>
          <p>Tap to see the heartfelt message</p>
        </section>
        <section className="birthday-card-face birthday-card-back">
          <div className="message-scroll">
            <h2>🎂 Happy Birthday to Someone Truly Special ❤️</h2>
            {message.map((paragraph, index) => <p key={paragraph}>{['✨', '🤍', '🌻', '♾️', '🙏', '🎉'][index]} {paragraph}</p>)}
            <button type="button" className="message-firework" onClick={celebrateAgain}>One more celebration! 🎉</button>
            <small>Tap to see the photo again</small>
          </div>
        </section>
      </motion.button>
    </div>
  );
}

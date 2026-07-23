import { motion } from 'framer-motion';

export default function Cake({ candlesOut }) {
  return (
    <motion.div className="cake-wrap" initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 13 }}>
      <div className="cake" aria-label={candlesOut ? 'Birthday cake with candles extinguished' : 'Birthday cake with lit candles'} role="img">
        <div className="cake-top"><span /><span /><span /></div>
        <div className="cake-layer layer-one"><i /><i /><i /><i /></div>
        <div className="cake-layer layer-two"><i /><i /><i /><i /></div>
        <div className="cake-base" />
        <div className="candles">
          {[0, 1, 2, 3, 4].map((candle) => (
            <div className="candle" key={candle}>
              {!candlesOut && <span className="flame" />}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

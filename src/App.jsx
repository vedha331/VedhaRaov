import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import WelcomeHome from './pages/WelcomeHome';
import LocationQuestion from './pages/LocationQuestion';
import ProfileInfo from './pages/ProfileInfo';
import Surprise from './pages/Surprise';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<WelcomeHome />} />
        <Route path="/location" element={<LocationQuestion />} />
        <Route path="/profile" element={<ProfileInfo />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </AnimatePresence>
  );
}

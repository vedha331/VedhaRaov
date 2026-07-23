import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LocationQuestion from './pages/LocationQuestion';
import ProfileInfo from './pages/ProfileInfo';
import PhotoSecret from './pages/PhotoSecret';
import Surprise from './pages/Surprise';
import CelebrationCompleted from './pages/CelebrationCompleted';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/location" element={<LocationQuestion />} />
        <Route path="/profile" element={<ProfileInfo />} />
        <Route path="/photo-secret" element={<PhotoSecret />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/celebration-completed" element={<CelebrationCompleted />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
}

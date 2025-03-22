
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('animate-fade-in');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('animate-fade-out');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'animate-fade-out') {
      setTransitionStage('animate-fade-in');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`${transitionStage} w-full`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default PageTransition;

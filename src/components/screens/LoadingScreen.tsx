import React, { useEffect, useState } from 'react';
import { useFadeIn } from '../../utils/animationUtils';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  loadingTime?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadComplete,
  loadingTime = 3000
}) => {
  const [progress, setProgress] = useState(0);
  const loadingRef = useFadeIn(0.2);
  
  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + loadingTime;
    
    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const newProgress = Math.min(100, Math.floor((elapsedTime / loadingTime) * 100));
      
      setProgress(newProgress);
      
      if (currentTime < endTime) {
        requestAnimationFrame(updateProgress);
      } else {
        onLoadComplete();
      }
    };
    
    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [loadingTime, onLoadComplete]);
  
  return (
    <div className="screen loading-screen">
      <div className="galaxy-background"></div>
      
      <div className="content-overlay">
        <div ref={loadingRef} className="loading-container">
          <h2 className="loading-title">Traveling through space...</h2>
          
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="loading-messages">
            <p>Warping through Reddit dimensions...</p>
            <p>Collecting cosmic content...</p>
            <p>Translating alien posts...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

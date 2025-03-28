import React from 'react';
import { ThreeParrotsStartscreen } from '../../../assets/videos';
import VideoBackground from '../common/VideoBackground';
import RoundedButton from '../common/RoundedButton';
import { useFadeIn } from '../../utils/animationUtils';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const titleRef = useFadeIn(0.5);
  const buttonRef = useFadeIn(1.5);
  
  return (
    <div className="screen start-screen">
      <VideoBackground src={ThreeParrotsStartscreen} />
      
      <div className="content-overlay">
        <div ref={titleRef} className="title-container">
          <h1 className="main-title">PARROT REDICIOUS TRAVEL</h1>
          <h2 className="subtitle">A Reddit Universe Adventure</h2>
        </div>
        
        <div ref={buttonRef} className="button-container">
          <RoundedButton 
            onClick={onStart} 
            text="START ADVENTURE" 
            className="start-button"
          />
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

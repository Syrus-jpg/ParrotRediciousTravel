import React from 'react';
import { ParrotType } from '../../types/gameTypes';
import VideoBackground from '../common/VideoBackground';
import RoundedButton from '../common/RoundedButton';
import { useFadeIn } from '../../utils/animationUtils';
import {
  ThreeParrotsDrinked,
  CockatooDrinked,
  CaiqueDrinked,
  AlexandrineDrinked
} from '../../../assets/videos';

interface DrinkingScreenProps {
  parrotType: ParrotType;
  parrotName: string;
  onContinue: () => void;
}

const DrinkingScreen: React.FC<DrinkingScreenProps> = ({
  parrotType,
  parrotName,
  onContinue
}) => {
  const contentRef = useFadeIn(1.0);
  
  const getVideo = () => {
    switch (parrotType) {
      case ParrotType.COCKATOO:
        return CockatooDrinked;
      case ParrotType.CAIQUE:
        return CaiqueDrinked;
      case ParrotType.ALEXANDRINE:
        return AlexandrineDrinked;
      default:
        return ThreeParrotsDrinked;
    }
  };
  
  return (
    <div className="screen drinking-screen">
      <VideoBackground src={getVideo()} loop={false} onVideoEnd={onContinue} />
      
      <div className="content-overlay">
        <div ref={contentRef} className="message-container">
          <h2 className="screen-title">Holy Juice!</h2>
          <p className="screen-message">
            {parrotName} is drinking the magical Holy Juice to recover.
          </p>
          <p className="screen-submessage">
            Their cosmic energy is being restored.
          </p>
          
          <div className="button-container">
            <RoundedButton
              onClick={onContinue}
              text="CONTINUE"
              className="continue-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkingScreen;

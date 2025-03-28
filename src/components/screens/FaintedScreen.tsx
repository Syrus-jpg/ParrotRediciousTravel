import React from 'react';
import { ParrotType } from '../../types/gameTypes';
import VideoBackground from '../common/VideoBackground';
import RoundedButton from '../common/RoundedButton';
import { useFadeIn } from '../../utils/animationUtils';
import {
  ThreeParrotsFainted,
  CockatooFainted,
  CaiqueFainted,
  AlexandrineFainted
} from '../../../assets/videos';

interface FaintedScreenProps {
  parrotType: ParrotType;
  parrotName: string;
  onContinue: () => void;
}

const FaintedScreen: React.FC<FaintedScreenProps> = ({
  parrotType,
  parrotName,
  onContinue
}) => {
  const contentRef = useFadeIn(1.0);
  
  const getVideo = () => {
    switch (parrotType) {
      case ParrotType.COCKATOO:
        return CockatooFainted;
      case ParrotType.CAIQUE:
        return CaiqueFainted;
      case ParrotType.ALEXANDRINE:
        return AlexandrineFainted;
      default:
        return ThreeParrotsFainted;
    }
  };
  
  return (
    <div className="screen fainted-screen">
      <VideoBackground src={getVideo()} loop={false} />
      
      <div className="content-overlay">
        <div ref={contentRef} className="message-container">
          <h2 className="screen-title">Oh no!</h2>
          <p className="screen-message">
            {parrotName} has fainted from too much space travel!
          </p>
          <p className="screen-submessage">
            They need some Holy Juice to recover their cosmic energy.
          </p>
          
          <div className="button-container">
            <RoundedButton
              onClick={onContinue}
              text="HELP THEM RECOVER"
              className="continue-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaintedScreen;

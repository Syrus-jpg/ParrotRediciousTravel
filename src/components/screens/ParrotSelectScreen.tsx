import React from 'react';
import { ParrotType } from '../../types/gameTypes';
import VideoBackground from '../common/VideoBackground';
import { useFadeIn } from '../../utils/animationUtils';
import { 
  ChooseCockatoo, 
  ChooseCaique, 
  ChooseAlexandrine 
} from '../../../assets/videos';

interface ParrotSelectScreenProps {
  onSelectParrot: (parrotType: ParrotType) => void;
}

const ParrotSelectScreen: React.FC<ParrotSelectScreenProps> = ({ onSelectParrot }) => {
  const titleRef = useFadeIn(0.3);
  const parrotsRef = useFadeIn(0.7);
  
  const parrotVideos = {
    [ParrotType.COCKATOO]: ChooseCockatoo,
    [ParrotType.CAIQUE]: ChooseCaique,
    [ParrotType.ALEXANDRINE]: ChooseAlexandrine
  };
  
  const handleSelectParrot = (parrotType: ParrotType) => {
    onSelectParrot(parrotType);
  };
  
  return (
    <div className="screen parrot-select-screen">
      <div className="galaxy-background"></div>
      
      <div className="content-overlay">
        <div ref={titleRef} className="title-container">
          <h2 className="screen-title">Choose Your Parrot</h2>
          <p className="screen-subtitle">Select your cosmic travel companion</p>
        </div>
        
        <div ref={parrotsRef} className="parrots-container">
          {Object.entries(parrotVideos).map(([parrotType, video]) => (
            <div 
              key={parrotType}
              className="parrot-option"
              onClick={() => handleSelectParrot(parrotType as ParrotType)}
            >
              <div className="parrot-video-container">
                <VideoBackground src={video} loop={true} />
              </div>
              <div className="parrot-name">{parrotType}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParrotSelectScreen;

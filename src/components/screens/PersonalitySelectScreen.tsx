import React from 'react';
import { ParrotPersonality } from '../../types/gameTypes';
import RoundedButton from '../common/RoundedButton';
import { useFadeIn } from '../../utils/animationUtils';

interface PersonalitySelectScreenProps {
  onSelectPersonality: (personality: ParrotPersonality) => void;
  parrotName: string;
}

const PersonalitySelectScreen: React.FC<PersonalitySelectScreenProps> = ({
  onSelectPersonality,
  parrotName
}) => {
  const titleRef = useFadeIn(0.3);
  const optionsRef = useFadeIn(0.6);
  
  const personalities = [
    ParrotPersonality.NERD,
    ParrotPersonality.ROMANTIC,
    ParrotPersonality.EMO,
    ParrotPersonality.CRAZY,
    ParrotPersonality.FREE_ASSOCIATIVE,
    ParrotPersonality.CHATTERBOX
  ];
  
  return (
    <div className="screen personality-select-screen">
      <div className="galaxy-background"></div>
      
      <div className="content-overlay">
        <div ref={titleRef} className="title-container">
          <h2 className="screen-title">Select {parrotName}'s Personality</h2>
          <p className="screen-subtitle">What kind of parrot are they?</p>
        </div>
        
        <div ref={optionsRef} className="personality-options">
          {personalities.map(personality => (
            <div 
              key={personality}
              className="personality-option"
              onClick={() => onSelectPersonality(personality)}
            >
              <div className="personality-icon">{personality.split('�')[1] || '🦜'}</div>
              <div className="personality-name">{personality.split('�')[0]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalitySelectScreen;

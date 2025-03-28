import React from 'react';
import { PlanetType } from '../../types/gameTypes';
import RoundedButton from '../common/RoundedButton';
import { useFadeIn } from '../../utils/animationUtils';

import AskredditPlanet from '../../../assets/images/planets/askreddit_planet.png';
import AwwPlanet from '../../../assets/images/planets/aww_planet.png';
import FunnyPlanet from '../../../assets/images/planets/funny_planet.png';
import GamePlanet from '../../../assets/images/planets/game_planet.png';
import MusicPlanet from '../../../assets/images/planets/music_planet.png';
import TechnologyPlanet from '../../../assets/images/planets/technology_planet.png';
import SciencePlanet from '../../../assets/images/planets/science_planet.png';
import WorldNewsPlanet from '../../../assets/images/planets/worldnews_planet.png';
import UniverseBackground from '../../../assets/images/planets/universe_background.png';

interface PlanetSelectScreenProps {
  onPlanetSelect: (planet: PlanetType) => void;
  dailyTravelCount: number;
  maxDailyTravels: number;
}

const PlanetSelectScreen: React.FC<PlanetSelectScreenProps> = ({
  onPlanetSelect,
  dailyTravelCount,
  maxDailyTravels
}) => {
  const titleRef = useFadeIn(0.3);
  const planetsRef = useFadeIn(0.6);
  const infoRef = useFadeIn(0.9);
  
  const planetImages = {
    [PlanetType.ASKREDDIT]: AskredditPlanet,
    [PlanetType.AWW]: AwwPlanet,
    [PlanetType.FUNNY]: FunnyPlanet,
    [PlanetType.GAME]: GamePlanet,
    [PlanetType.MUSIC]: MusicPlanet,
    [PlanetType.TECHNOLOGY]: TechnologyPlanet,
    [PlanetType.SCIENCE]: SciencePlanet,
    [PlanetType.WORLDNEWS]: WorldNewsPlanet
  };
  
  const planets = Object.values(PlanetType);
  const canTravel = dailyTravelCount < maxDailyTravels;
  
  return (
    <div className="screen planet-select-screen" style={{backgroundImage: `url(${UniverseBackground})`}}>
      <div className="content-overlay">
        <div ref={titleRef} className="title-container">
          <h2 className="screen-title">Select a Destination Planet</h2>
          <p className="screen-subtitle">Where would you like to travel today?</p>
        </div>
        
        <div ref={planetsRef} className="planets-container">
          {planets.map(planet => (
            <div 
              key={planet}
              className={`planet ${!canTravel ? 'disabled' : ''}`}
              onClick={() => canTravel && onPlanetSelect(planet)}
            >
              <img src={planetImages[planet]} alt={planet} />
              <span className="planet-name">{planet}</span>
            </div>
          ))}
        </div>
        
        <div ref={infoRef} className="travel-info">
          <p>Daily Travels: {dailyTravelCount} / {maxDailyTravels}</p>
          {!canTravel && (
            <p className="travel-limit-message">
              You've reached your daily travel limit! Come back tomorrow for more adventures.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetSelectScreen;

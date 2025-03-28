// src/components/common/NavIcons.tsx
// Navigation icons displayed at the top of the application

import React from 'react';
import { GameState } from '../../types/gameTypes';

/**
 * Props for the NavIcons component
 * @property {(screen: GameState) => void} onIconClick - Callback when an icon is clicked
 */
interface NavIconsProps {
  onIconClick: (screen: GameState) => void;
}

/**
 * Navigation Icons Component
 * Displays a series of icon buttons for quick navigation between different sections
 * Each icon represents a different screen in the application
 * 
 * @param {NavIconsProps} props - Component props
 * @returns {JSX.Element} The navigation icons UI
 */
const NavIcons: React.FC<NavIconsProps> = ({ onIconClick }) => {
  return (
    <div className="nav-icons">
      <button 
        className="icon-button" 
        onClick={() => onIconClick(GameState.POSTCARDS)}
        aria-label="View postcards"
      >
        ✉️
      </button>
      <button 
        className="icon-button" 
        onClick={() => onIconClick(GameState.MEDALS)}
        aria-label="View medals"
      >
        🏆
      </button>
      <button 
        className="icon-button" 
        onClick={() => onIconClick(GameState.HELP_FRIEND)}
        aria-label="Help a friend"
      >
        🦜
      </button>
      <button 
        className="icon-button" 
        onClick={() => onIconClick(GameState.HOLY_JUICE)}
        aria-label="Holy juice manager"
      >
        🍷
      </button>
    </div>
  );
};

export default NavIcons;
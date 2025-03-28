import { GameStateType } from '../types/gameTypes';

const GAME_STATE_KEY = 'parrot_redicious_travel_game_state';

export const saveGameState = (state: GameStateType): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(GAME_STATE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

export const loadGameState = (): GameStateType | null => {
  try {
    const serializedState = localStorage.getItem(GAME_STATE_KEY);
    if (!serializedState) return null;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading game state:', error);
    return null;
  }
};

export const clearGameState = (): void => {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
  } catch (error) {
    console.error('Error clearing game state:', error);
  }
};

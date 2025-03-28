import { ParrotType, ParrotPersonality, PlanetType, Postcard } from '../types/gameTypes';
import CockatooPostcard from '../../assets/images/parrots/cockatoo_mock_postcard.png';

export const mockPostcard: Postcard = {
  id: 'mock-001',
  date: '2023-04-28',
  imageUrl: CockatooPostcard,
  redditTitle: 'Scientists discover new species of deep-sea creatures that glow in the dark',
  parrotComment: 'According to my calculations, the probability of finding glowing creatures is directly proportional to ocean depth squared! Fascinating! 🤓',
  redditLink: 'https://www.reddit.com/r/science/comments/example',
  planet: PlanetType.SCIENCE,
  parrotType: ParrotType.COCKATOO,
  personality: ParrotPersonality.NERD
};

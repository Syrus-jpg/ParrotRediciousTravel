import Replicate from 'replicate';
import { ParrotType, PlanetType } from '../types/gameTypes';

import CockatooPostcard from '../../assets/images/parrots/cockatoo_mock_postcard.png';

const replicate = process.env.REPLICATE_API_TOKEN 
  ? new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })
  : null;

export const generateImage = async (
  redditTitle: string,
  redditContent: string,
  parrotType: ParrotType,
  planet: PlanetType
): Promise<string> => {
  try {
    if (!replicate) {
      console.log('Replicate API token missing, using default image');
      return CockatooPostcard;
    }

    const parrotDescription = getParrotDescription(parrotType);
    const planetDescription = getPlanetDescription(planet);
    
    const prompt = `A cartoon-style ${parrotDescription} parrot on a planet known as ${planetDescription}.
    The parrot is reading the following Reddit post: "${redditTitle}".
    Use bright colors, create a postcard-style image with "Reddit Universe Travel" text at the top.`;

    const output = await replicate.run(
      'prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb',
      {
        input: {
          prompt,
          num_outputs: 1,
          width: 512,
          height: 512,
          num_inference_steps: 50,
        }
      }
    );

    return Array.isArray(output) && output.length > 0 
      ? output[0] 
      : CockatooPostcard;
      
  } catch (error) {
    console.error('Image generation failed:', error);
    return CockatooPostcard;
  }
};

const getParrotDescription = (parrotType: ParrotType): string => {
  switch (parrotType) {
    case ParrotType.COCKATOO:
      return 'white cockatoo';
    case ParrotType.CAIQUE:
      return 'black-headed yellow caique';
    case ParrotType.ALEXANDRINE:
      return 'green alexandrine';
    default:
      return 'colorful parrot';
  }
};

const getPlanetDescription = (planet: PlanetType): string => {
  switch (planet) {
    case PlanetType.ASKREDDIT:
      return 'Q&A';
    case PlanetType.AWW:
      return 'Cute Pets';
    case PlanetType.FUNNY:
      return 'Comedy';
    case PlanetType.GAME:
      return 'Gaming';
    case PlanetType.MUSIC:
      return 'Music';
    case PlanetType.TECHNOLOGY:
      return 'Tech';
    case PlanetType.SCIENCE:
      return 'Science';
    case PlanetType.WORLDNEWS:
      return 'World News';
    default:
      return 'Mysterious';
  }
};

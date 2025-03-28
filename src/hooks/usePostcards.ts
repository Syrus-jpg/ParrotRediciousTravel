import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  ParrotType, 
  ParrotPersonality, 
  PlanetType, 
  Postcard 
} from '../types/gameTypes';
import { getRandomHotPost } from '../api/redditService';
import { generateParrotComment } from '../api/chatGPTService';
import { generateImage } from '../api/midjourneyService';
import { getFormattedDate } from '../utils/formatUtils';

export const usePostcards = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePostcard = useCallback(async (
    planetType: PlanetType,
    parrotType: ParrotType,
    personality: ParrotPersonality
  ): Promise<Postcard | null> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const redditPost = await getRandomHotPost(planetType);
      
      const parrotComment = await generateParrotComment(
        redditPost.title,
        redditPost.content,
        personality
      );
      
      const imageUrl = await generateImage(
        redditPost.title,
        redditPost.content,
        parrotType,
        planetType
      );
      
      const newPostcard: Postcard = {
        id: uuidv4(),
        date: getFormattedDate(),
        imageUrl,
        redditTitle: redditPost.title,
        parrotComment,
        redditLink: redditPost.permalink,
        planet: planetType,
        parrotType,
        personality
      };
      
      return newPostcard;
    } catch (err) {
      console.error('Failed to generate postcard:', err);
      setError('Failed to generate postcard. Please try again.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    isGenerating,
    error,
    generatePostcard
  };
};

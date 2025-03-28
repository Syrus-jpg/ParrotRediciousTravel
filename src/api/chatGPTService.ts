import { Configuration, OpenAIApi } from 'openai';
import { ParrotPersonality } from '../types/gameTypes';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateParrotComment = async (
  redditTitle: string,
  redditContent: string,
  personality: ParrotPersonality
): Promise<string> => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return getFallbackResponse(personality);
    }

    const prompt = `You are a parrot with a ${personality} personality. Comment on this Reddit post in that personality.
    Keep your response short and fun, maximum 50 words.
    
    Reddit title: ${redditTitle}
    Reddit content: ${redditContent}
    
    Parrot's comment:`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100,
      temperature: 0.7,
    });

    return response.data.choices[0]?.text?.trim() || getFallbackResponse(personality);
  } catch (error) {
    console.error('Failed to generate parrot comment:', error);
    return getFallbackResponse(personality);
  }
};

const getFallbackResponse = (personality: ParrotPersonality): string => {
  const responses = {
    [ParrotPersonality.NERD]: 'According to my calculations, this post has a fun factor of 3.14159. Get it? Pi!',
    [ParrotPersonality.ROMANTIC]: 'Reading this post makes my heart flutter... you are my Reddit muse!',
    [ParrotPersonality.EMO]: 'Sigh... even this post reminds me of the meaninglessness of existence...',
    [ParrotPersonality.CRAZY]: 'Woohoo! This post makes me want to dance! *wildly flaps wings*',
    [ParrotPersonality.FREE_ASSOCIATIVE]: 'This post reminds me of summer... ice cream... flying... oh, is the earth flat?',
    [ParrotPersonality.CHATTERBOX]: 'Wow wow wow! Super fun! I must tell all my bird friends! Right now! Immediately! Now!',
  };

  return responses[personality] || 'Squawk! What an interesting post!';
};

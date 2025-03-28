import { PlanetType } from '../types/gameTypes';

const mapPlanetToSubreddit = (planet: PlanetType): string => {
  return planet.toLowerCase();
};

export const getRandomHotPost = async (planet: PlanetType): Promise<{
  title: string;
  content: string;
  permalink: string;
}> => {
  try {
    const subreddit = mapPlanetToSubreddit(planet);
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data.children || data.data.children.length === 0) {
      throw new Error('No posts found');
    }
    
    const nonStickyPosts = data.data.children.filter((post: any) => !post.data.stickied);
    
    if (nonStickyPosts.length === 0) {
      throw new Error('No non-stickied posts found');
    }
    
    const randomIndex = Math.floor(Math.random() * nonStickyPosts.length);
    const post = nonStickyPosts[randomIndex].data;
    
    let content = post.selftext || '';
    if (!content && post.url) {
      content = `[Link: ${post.url}]`;
    }
    
    if (content.length > 200) {
      content = content.substring(0, 197) + '...';
    }
    
    return {
      title: post.title,
      content,
      permalink: `https://www.reddit.com${post.permalink}`
    };
  } catch (error) {
    console.error('Failed to fetch data from Reddit:', error);
    
    return {
      title: `Interesting post from ${planet}`,
      content: 'Content could not be loaded, but it\'s surely interesting!',
      permalink: `https://www.reddit.com/r/${mapPlanetToSubreddit(planet)}`
    };
  }
};

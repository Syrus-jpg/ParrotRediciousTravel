import React, { useEffect, useState } from 'react';
import { Postcard, ParrotType, ParrotPersonality, PlanetType } from '../../types/gameTypes';
import RoundedButton from '../common/RoundedButton';
import { useFadeIn } from '../../utils/animationUtils';
import { formatDisplayDate } from '../../utils/formatUtils';
import { mockPostcard } from '../../data/mockData';

interface PostcardScreenProps {
  postcard: Postcard | null;
  isLoading: boolean;
  error: string | null;
  onGoBack: () => void;
  onSharePostcard?: () => void;
  useMockData?: boolean;
}

const PostcardScreen: React.FC<PostcardScreenProps> = ({
  postcard,
  isLoading,
  error,
  onGoBack,
  onSharePostcard,
  useMockData = false
}) => {
  const [displayedPostcard, setDisplayedPostcard] = useState<Postcard | null>(null);
  
  useEffect(() => {
    if (useMockData) {
      setDisplayedPostcard(mockPostcard);
    } else {
      setDisplayedPostcard(postcard);
    }
  }, [postcard, useMockData]);
  
  const postcardRef = useFadeIn(0.5);
  
  if (isLoading) {
    return (
      <div className="screen postcard-screen">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Generating your postcard...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="screen postcard-screen">
        <div className="error-container">
          <h3>Oops!</h3>
          <p>{error}</p>
          <RoundedButton onClick={onGoBack} text="GO BACK" />
        </div>
      </div>
    );
  }
  
  if (!displayedPostcard) {
    return (
      <div className="screen postcard-screen">
        <div className="error-container">
          <h3>No Postcard Found</h3>
          <p>Something went wrong with your space travel.</p>
          <RoundedButton onClick={onGoBack} text="GO BACK" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="screen postcard-screen">
      <div className="content-overlay">
        <div ref={postcardRef} className="postcard-container">
          <div className="postcard">
            <div className="postcard-image">
              <img src={displayedPostcard.imageUrl} alt="Postcard" />
            </div>
            
            <div className="postcard-content">
              <div className="postcard-header">
                <h3>Reddit Universe Travel</h3>
                <span className="postcard-date">{formatDisplayDate(displayedPostcard.date)}</span>
              </div>
              
              <div className="reddit-content">
                <h4>{displayedPostcard.redditTitle}</h4>
                <a 
                  href={displayedPostcard.redditLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on Reddit
                </a>
              </div>
              
              <div className="parrot-comment">
                <p>"{displayedPostcard.parrotComment}"</p>
                <span className="parrot-signature">- {displayedPostcard.parrotType} parrot ({displayedPostcard.personality})</span>
              </div>
            </div>
          </div>
          
          <div className="button-container">
            {onSharePostcard && (
              <RoundedButton 
                onClick={onSharePostcard} 
                text="SHARE POSTCARD" 
                className="share-button"
              />
            )}
            <RoundedButton onClick={onGoBack} text="CONTINUE ADVENTURE" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostcardScreen;

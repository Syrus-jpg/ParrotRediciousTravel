import React, { useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  onEnded?: () => void;
  scale?: number;
}

/**
 * VideoBackground component
 * Displays a video as a background with customizable properties
 */
const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  src, 
  loop = true, 
  autoPlay = true, 
  muted = true,
  onEnded,
  scale = 1
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Extract video ID from src for debugging
  const videoId = `video-${src.split('/').pop()?.split('.')[0]}`;
  
  // Ensure the video loads and plays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Video playback failed: ', error);
        });
      }
    }
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error(`Video loading error ${src}:`, e);
    // Try to reload
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <div className="video-container">
      <video
        id={videoId}
        ref={videoRef}
        className="full-video"
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        onEnded={onEnded}
        onError={handleError}
        style={{ 
          transform: `scale(${scale})`,
          objectFit: 'cover' // Use cover instead of contain to ensure video fills the container
        }}
      />
    </div>
  );
};

export default VideoBackground;
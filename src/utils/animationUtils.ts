import { useRef, useEffect } from 'react';

export const useVideoPlayback = (onVideoEnd?: () => void) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0;
      
      const playPromise = videoElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch(error => {
            console.error('Video playback failed:', error);
          });
      }
      
      if (onVideoEnd) {
        videoElement.addEventListener('ended', onVideoEnd);
      }
    }
    
    return () => {
      if (videoElement && onVideoEnd) {
        videoElement.removeEventListener('ended', onVideoEnd);
      }
    };
  }, [onVideoEnd]);
  
  return videoRef;
};

export const useFadeIn = (delay: number = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.style.opacity = '0';
      element.style.transition = `opacity 1s ease ${delay}s`;
      
      void element.offsetWidth;
      
      element.style.opacity = '1';
    }
    
    return () => {
      if (element) {
        element.style.transition = '';
      }
    };
  }, [delay]);
  
  return ref;
};

import React, { useState } from 'react';
import RoundedButton from '../common/RoundedButton';
import { useFadeIn } from '../../utils/animationUtils';

interface NameInputScreenProps {
  onSubmit: (userName: string, parrotName: string) => void;
}

const NameInputScreen: React.FC<NameInputScreenProps> = ({ onSubmit }) => {
  const [userName, setUserName] = useState('');
  const [parrotName, setParrotName] = useState('');
  const [error, setError] = useState('');
  
  const formRef = useFadeIn(0.3);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim() || !parrotName.trim()) {
      setError('Please enter both your name and your parrot\'s name');
      return;
    }
    
    onSubmit(userName.trim(), parrotName.trim());
  };
  
  return (
    <div className="screen name-input-screen">
      <div className="galaxy-background"></div>
      
      <div className="content-overlay">
        <div ref={formRef} className="form-container">
          <h2 className="screen-title">Enter Your Names</h2>
          
          <form onSubmit={handleSubmit} className="name-form">
            <div className="input-group">
              <label htmlFor="user-name">Your Name:</label>
              <input
                id="user-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                maxLength={20}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="parrot-name">Your Parrot's Name:</label>
              <input
                id="parrot-name"
                type="text"
                value={parrotName}
                onChange={(e) => setParrotName(e.target.value)}
                placeholder="Enter your parrot's name"
                maxLength={20}
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <RoundedButton 
              type="submit" 
              text="CONTINUE" 
              className="submit-button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NameInputScreen;

import React from 'react';

interface DemoToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const DemoToggle: React.FC<DemoToggleProps> = ({ enabled, onToggle }) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="demo-toggle">
      <label>
        <input 
          type="checkbox" 
          checked={enabled} 
          onChange={onToggle} 
        />
        Use demo data (for recording)
      </label>
    </div>
  );
};

export default DemoToggle;

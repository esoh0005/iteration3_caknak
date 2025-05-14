import React, { useState } from 'react';
import './swipe-right.css';

const SwipeRight = () => {
  // track if expanded to show the game yet
  const [isExpanded, setIsExpanded] = useState(false);
  // need this to control the animation timing
  const [isAnimating, setIsAnimating] = useState(false);

  // handles the swipe button click animate then expand after a delay
  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsExpanded(true);
      setIsAnimating(false);
    }, 500); // half second for the animation to finish
  };

  return (
    <div className="data-breach-container">
      {/* only show the title when we haven't expanded yet */}
      {!isExpanded && <h2 className="unlock-title">Unlock to level up</h2>}
      
      {!isExpanded ? (
        // the swipe container with button shows when not expanded
        <div className="swipe-container">
          <button
            className={`swipe-button ${isAnimating ? 'animating' : ''}`}
            onClick={handleClick}
          >
            Unlock 🢂
          </button>
        </div>
      ) : (
        // once expanded, show the game in an iframe
        <div className="expanded-content">
          {/* embedded game from itch.io */}
          <iframe
            src="https://itch.io/embed-upload/13558716?color=333333"
            allowFullScreen
            style={{
              width: '640px',
              height: '380px'}}
            className="game-iframe"
            title="CyberQuest: MY Edition"
          />
          <button className="close-button" onClick={() => setIsExpanded(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SwipeRight;
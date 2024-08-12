import React, { useState } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';

const SwipeableCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = [{
    id: 1,
    name: 'John',
    storyprof: 'author.jpg',
    storyimg: 'dp.jpg'
  },
  {
    id: 2,
    name: 'David kennedy',
    storyprof: 'author.jpg',
    storyimg: 'dp.jpg'
  },
  {
    id: 3,
    name: 'Adam',
    storyprof: 'author.jpg',
    storyimg: 'dp.jpg'
  },
  {
    id: 4,
    name: 'McCarthy ',
    storyprof: 'author.jpg',
    storyimg: 'dp.jpg'
  }];
  

  const [{ x, opacity }, set] = useSpring(() => ({
    x: 0,
    opacity: 1,
    config: { tension: 200, friction: 20 } // Adjust these values for different spring effects
  }));

  const handleSwipe = (distance) => {
    const threshold = 150; // Define the swipe threshold
    if (distance > threshold) {
      setCurrentIndex((prevIndex) => (prevIndex === stories.length - 1 ? 0 : prevIndex + 1));
    } else if (distance < -threshold) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? stories.length - 1 : prevIndex - 1));
    }
    set({ x: 0, opacity: 1 }); // Reset card position and opacity
  };

  const handleDrag = (event) => {
    const distance = event.movementX; // Get the horizontal movement distance
    set({ x: distance, opacity: 1 }); // Update the spring values based on drag distance
  };

  return (
    <animated.div
      onMouseMove={handleDrag}
      onMouseUp={() => handleSwipe(x)}
      onTouchMove={(e) => handleDrag({ movementX: e.touches[0].clientX - x })}
      onTouchEnd={() => handleSwipe(x)}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {stories.map((story, index) => {
        const offsetX = index * 300; // Set the offset for each story card
        return (
          <animated.div
            key={story.id}
            style={{
              position: 'absolute',
              transform: interpolate([x], (x) => `translateX(${x + offsetX}px)`),
              opacity: interpolate([x], (x) => (Math.abs(x) > 100 * index ? 0.5 : 1)),
              pointerEvents: index === currentIndex ? 'auto' : 'none', // Enable pointer events for the current card
            }}
          >
            <div className='content'>
              <img src={story.storyimg} style={{ width: '100%', height: 'auto' }} alt={story.name} />
            </div>
          </animated.div>
        );
      })}
    </animated.div>
  );
};

export default SwipeableCard;

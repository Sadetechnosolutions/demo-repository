import React from 'react';
import { useSelector } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const StoryPage = () => {
  const selectedStory = useSelector((state) => state.story.selectedStory);

  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 1 },
    1600: { items: 1 },
  };

  const renderNextButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-56 ml-36"
      onClick={onClick}
      disabled={isDisabled}
    >
  
    </button>
  );

  const renderBackButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full -mt-56 -ml-44"
      onClick={onClick}
      disabled={isDisabled}
    >

    </button>
  );

  let stories = [
    {
      id: 1,
      name: 'John',
      storyprof: 'author.jpg',
      storyimg: 'dp.jpg',
    },
    {
      id: 2,
      name: 'David kennedy',
      storyprof: 'author.jpg',
      storyimg: 'dp.jpg',
    },
    {
      id: 3,
      name: 'Adam',
      storyprof: 'author.jpg',
      storyimg: 'dp.jpg',
    },
    {
      id: 4,
      name: 'McCarthy',
      storyprof: 'author.jpg',
      storyimg: 'dp.jpg',
    },
  ];

  // If selectedStory exists, add it to the front of the stories array
  if (selectedStory) {
    stories = [selectedStory, ...stories];
  }

  return (
    <div className='min-h-screen flex justify-center bg-black'>
    <div className=" w-1/2 bg-black px-4 shadow-lg rounded-md">
      <AliceCarousel
        mouseTracking
        touchTracking={false}
        responsive={responsive}
        autoPlay
        disableDotsControls={true}
        infinite
        autoPlayInterval={4000}
        renderNextButton={renderNextButton}
        renderPrevButton={renderBackButton}
      >
        {stories.map((story) => (
          <div key={story.id} className="relative flex w-auto h-auto">
            <img
              src={story.storyimg}
              className="w-5/6 opacity-90 h-[59rem]"
              alt="Story"
            />
            <div className="top-0 flex items-center gap-2 p-2 absolute">
              <img
                className="w-11 h-11 rounded-full border-2 border-cta"
                src={story.storyprof}
                alt="Author Profile"
              />
              <span className="text-white font-semibold text-lg">
                {story.name}
              </span>
            </div>
          </div>
        ))}
      </AliceCarousel>
    </div>
    </div>
  );
};

export default StoryPage;

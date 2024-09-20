import React, { useState, useEffect } from 'react'
import { Player, BigPlayButton } from 'video-react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Videocomp = () => {
  const [videos, setVideos] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const { userID } = useParams();
  const seeAllVideos = () => {
    navigate(`/videosview/${userID}`);
    window.scrollTo(0, 0);
  }

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 3 },
    1600: { items: 3 },
  };

  const renderNextButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full right-8 bottom-16"
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon icon="grommet-icons:next" />
    </button>
  );

  const renderBackButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full -left-11 bottom-16"
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon icon="ic:twotone-arrow-back-ios" />
    </button>
  );

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await fetch(`http://localhost:8080/posts/user/${userID}/videos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      } else {
        console.error('Failed to fetch videos:', response.status);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchVideos();
    }
  }, [userID]);

  return (
    <div className='flex py-4 px-6 drop shadow-lg rounded-md h-auto flex-col'>
      <div className='flex w-full flex-col font-semibold gap-6'>
        <div className='flex justify-between'>
          <span className='text-lg'>Videos ({videos.length})</span>
          <span onClick={seeAllVideos} className='cursor-pointer text-cta text-sm'>See All</span>
        </div>
        <div className='flex w-full px-10'>
          {videos.length > 0 && (
            <AliceCarousel
              renderNextButton={renderNextButton}
              renderPrevButton={renderBackButton}
              disableDotsControls
              responsive={responsive}
            >
              {videos.map((video) => (
                <div key={video.id} className='flex w-[180px] h-28 bg-black'>
                  <Player controls>
                    <source src={video.name} />
                    <BigPlayButton position='center' />
                  </Player>
                </div>
              ))}
            </AliceCarousel>
          )}
          {videos.length === 0 && (
            <div className='flex items-center justify-center w-full h-full'>
              <p>No videos available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Videocomp;

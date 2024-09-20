import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ReactPlayer from 'react-player';
import axios from 'axios';
import moment from 'moment';
import Loader from '../components/loader';
import { Icon } from '@iconify/react/dist/iconify.js';

const StoryPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds loader
    return () => clearTimeout(timer);
  }, []);

  const handleSlideChange = () => {
    setLoading(false); // Hide loader when slide changes
  };
  const selectedStory = useSelector((state) => state.story.selectedStory);
  const [story, setStory] = useState([]);
  const [users,setUsers] = useState()
  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 1 },
    1600: { items: 1 },
  };

  const renderNextButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full right-4 top-[28rem]"
      onClick={onClick}
      disabled={isDisabled}>
    <Icon icon="grommet-icons:next" />    
    </button>
  );

  const renderBackButton = ({ isDisabled, onClick }) => (
    <button
      className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full left-4 top-[28rem]"
      onClick={onClick}
      disabled={isDisabled}
    >
 <Icon icon="ic:twotone-arrow-back-ios" />
    </button>
  );

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/auth/users/descending');
      const usersData = response.data?.map(user => ({
        id: user.id,
        UserName: user.name,
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchStory = async () => {
    const token = localStorage.getItem('token'); // Fixed typo
    try {
      const response = await fetch('http://localhost:8080/statuses/user/status', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` // Added space after "bearer"
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStory(data);
        console.log(data,'data')
      } else {
        console.error('Failed to fetch stories:', response.status);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  useEffect(() => {
    fetchStory();
  }, []);

  const filteredStories = story.filter(item => item.id !== selectedStory?.id);

  // Combine the filtered stories with the selected story
  const combinedStories = selectedStory ? [selectedStory, ...filteredStories] : filteredStories;
  console.log(story);
  console.log(selectedStory)

  return (
    <div className='min-h-screen flex justify-center bg-black'>
      <div className="relative w-1/2 bg- px-4 shadow-lg rounded-md">
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
          {combinedStories?.map((item) =>{ 

const calculateTimeDifference = () => {
  const pastDate = moment(item.createdAt);
  const now = moment();
  const diffInDays = now.diff(pastDate, 'days');
  const diffInHours = now.diff(pastDate, 'hours');
  const diffInMinutes = now.diff(pastDate, 'minutes');
  let displayText = '';

  if (diffInDays > 0) {
    displayText = `${diffInDays}d${diffInDays > 1 ? ' ago' : ''}`;
  } else if (diffInHours > 0) {
    displayText = `${diffInHours}h${diffInHours > 1 ? ' ago' : ''}`;
  } else if (diffInMinutes > 0) {
    displayText = `${diffInMinutes}m${diffInMinutes > 1 ? ' ago' : ''}`;
  } else {
    displayText = 'Just now';
  }

  return displayText;
};

const timeDifference = calculateTimeDifference();
            return(
            <div key={item.id} className="relative flex border border-0 h-screen">
              {item.type === 'IMAGE' ?              
               <img src={`http://localhost:8086${item.content}`}
                className="w-5/6 opacity-90 w-[82rem] h-[59rem]"
                alt="Story"
              /> : <ReactPlayer
              url={`http://localhost:8086${item.content}`}  // Replace with your video URL
              playing={true}  // Autoplay the video
              controls={false} // Hide controls if desired
              width='100%'
              height='100%'
              loop={true} 
            />}

{users?.map(user=>user.id === item.userId ? 
                <div className='top-4 flex items-center gap-2 p-2 absolute'><img className='w-11 h-11 rounded-full border-2 border-cta' src='profile.jpg' /><div className='flex flex-col'><span className='text-white font-semibold  text-sm'>{user.UserName}</span><span className='text-white text-sm font-semibold'>{timeDifference}</span></div></div>
                :null
    )}
          {loading && <Loader />}
            </div>
          ) })}
        </AliceCarousel>
      </div>
    </div>
  );
};

export default StoryPage;

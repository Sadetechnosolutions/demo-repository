import React,{useEffect, useState} from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { selectStory } from '../slices/storyslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import moment from 'moment';
import axios from 'axios';
import ReactPlayer from 'react-player';

const Story = () => {
  const [story,setStory] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [users,setUsers] = useState();
    const responsive = {
        0:    { items: 1 },
        600:  { items: 1 },
        1024: { items: 1 },
        1600: { items: 1 },
      };
      
      const renderNextButton = ({ isDisabled, onClick }) => (
        <button className={`absolute p-2 flex hover:bg-cta text-cta hover:text-white items-center justify-center bg-gray-100 rounded-full top-44 right-4 ${story?.length ===0 ? 'hidden': ''}`}
            onClick={onClick}
            disabled={isDisabled}>
    <Icon icon="grommet-icons:next" />    
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
    
    const renderBackButton = ({ isDisabled, onClick }) => (
        <button className={`absolute p-2 hover:bg-cta text-cta hover:text-white bg-gray-100 rounded-full ${story?.length ===0 ? 'hidden': ''} top-44 left-4`}
            onClick={onClick}
            disabled={isDisabled}>
    <Icon icon="ic:twotone-arrow-back-ios" /> </button>);
const stories = [{
    id:1,
    name:'John',
    storyprof:'author.jpg',
    storyimg:'dp.jpg'
},
{
    id:2,
    name:'David kennedy',
    storyprof:'author.jpg',
    storyimg:'dp.jpg'
},
{
    id:3,
    name:'Adam',
    storyprof:'author.jpg',
    storyimg:'dp.jpg'
},
{
    id:4,
    name:'McCarthy ',
    storyprof:'author.jpg',
    storyimg:'dp.jpg'
}]

const FetchStories = async ()=>{
  const token = localStorage.getItem('token')
  try{
    const response = await fetch('http://localhost:8080/statuses/user/status',{
      method:'GET',
      headers:{
        'Authorization':`bearer${token}`
      }});
      if(response.ok){
      const data = await response.json()
      setStory(data)
      }
      else{

      }
    }
    catch(error){
      console.log('error fetching',error)
    }
  }

  useEffect(() => {
      FetchStories();
  }, []);


const handleClick = (story) => {
  dispatch(selectStory(story)); // Dispatch selected story to Redux store
};
const openStory = ()=>{
  navigate('/storypage')
}

const addStory = ()=>{
  navigate('/uploadstory')
}

  return (
<div className='w-full px-4 shadow-lg rounded-md'>
    <div className='flex py-2 items-center justify-between'><span className='font-semibold'>Stories</span><span onClick={addStory} className='text-cta cursor-pointer font-semibold'>+ Add your story</span></div>
    <AliceCarousel disableDotsControls responsive={responsive} autoPlay infinite autoPlayInterval={4000} renderNextButton={renderNextButton} renderPrevButton={renderBackButton}>
    {story?.map((story)=>{
                   const calculateTimeDifference = () => {
                    const pastDate = moment(story.createdAt);
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
                <div onClick={() =>{ handleClick(story);openStory()}} className='relative bg- w-auto h-96'>
              {story.type === 'IMAGE' ?  <img src={`http://localhost:8086${story.content}`} alt={`http://localhost:8086${story.content}`} className='w-full opacity-90 h-96' /> :      <ReactPlayer
        url={`http://localhost:8086${story.content}`}  // Replace with your video URL
        playing={true}  // Autoplay the video
        controls={false} // Hide controls if desired
        width='100%'
        height='100%'
        loop={true} 
      />}
                {users?.map(user=>user.id === story.userId ? 
                <div className='top-0 flex items-center gap-2 p-2 absolute'><img className='w-11 h-11 rounded-full border-2 border-cta' src='profile.jpg' /><div className='flex flex-col'><span className='text-white font-semibold  text-sm'>{user.UserName}</span><span className='text-white text-sm font-semibold'>{timeDifference}</span></div></div>
                :null
    )}
                </div>
    )})}
    </AliceCarousel>
</div>
  )
}
export default Story

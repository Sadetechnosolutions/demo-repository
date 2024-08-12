import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { selectStory } from '../slices/storyslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Story = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

    const responsive = {
        0:    { items: 1 },
        600:  { items: 1 },
        1024: { items: 1 },
        1600: { items: 1 },
      };
      
      const renderNextButton = ({ isDisabled, onClick }) => (
        <button className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-56 ml-36"
            onClick={onClick}
            disabled={isDisabled}>
    <Icon icon="grommet-icons:next" />    
    </button>
    );
    
    const renderBackButton = ({ isDisabled, onClick }) => (
        <button className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full  -mt-56 -ml-44"
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


const handleClick = (story) => {
  dispatch(selectStory(story)); // Dispatch selected story to Redux store
};
const openStory = ()=>{
  navigate('/storypage')
}

  return (
<div className='w-full px-4 shadow-lg rounded-md'>
    <div className='flex py-2 items-center justify-between'><span className='font-semibold'>Stories</span><span className='text-cta cursor-pointer font-semibold'>+ Add your story</span></div>
    <AliceCarousel disableDotsControls responsive={responsive} autoPlay infinite autoPlayInterval={4000} renderNextButton={renderNextButton} renderPrevButton={renderBackButton}>
    {stories.map((story)=>(
                <div onClick={() =>{ handleClick(story);openStory()}} className='relative w-auto h-auto'>
                <img src={story.storyimg} className='w-full opacity-90 h-full' />
                <div className='top-0 flex items-center gap-2 p-2 absolute'><img className='w-11 h-11 rounded-full border-2 border-cta' src={story.storyprof} /><span className='text-white font-semibold  text-lg'>{story.name}</span></div>
                </div>
    ))}
    </AliceCarousel>
</div>
  )
}
export default Story

import React from 'react'
import { Player,BigPlayButton } from 'video-react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';

const Videocomp = () => {
  const navigate = useNavigate()
  const seeAllVideos = ()=>{
    navigate('/videos',window.scrollTo(0,0))
  }
  const {videos} = useSelector((state)=>state.video)
  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 3 },
    1600: { items: 3 },
  };
  const renderNextButton = ({ isDisabled, onClick }) => (
    <button
        className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-20 ml-80"
        onClick={onClick}
        disabled={isDisabled}>
<Icon icon="grommet-icons:next" />    
</button>
);
//i cant be your superman cant be your superman i cant be your superman maybe ill love you one day
const renderBackButton = ({ isDisabled, onClick }) => (
    <button className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full -ml-[26rem] -mt-20"
        onClick={onClick}
        disabled={isDisabled}>
<Icon icon="ic:twotone-arrow-back-ios" /> </button>);
  return (
    <div className='flex py-4 px-6 drop shadow-lg  rounded-md h-auto w-[800px] flex-col'>
  <div className='flex w-full flex-col font-semibold gap-6'>
        <div className='flex justify-between'> <span className='text-lg'>Videos ({videos.length})</span> <span onClick={seeAllVideos} className='cursor-pointer text-cta text-sm'>See All</span></div>
         <div className='flex w-full ml-10'>
         <AliceCarousel renderNextButton={renderNextButton} renderPrevButton={renderBackButton} disableDotsControls responsive={responsive}>
            {videos.slice().reverse().map((video)=>(
                <div key={video.id} className='flex  w-[180px] h-28 bg-black'>
            <Player controls>
                <source  src={video.name} />
                <BigPlayButton position='center' />
            </Player>
                </div>
            ))}
         </AliceCarousel>
    </div>
</div>

  </div>
  )
}

export default Videocomp

import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import data from '../suggestedpeople.json'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Followpeople = ()=>{
    const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 4 },
        1600: { items: 4 },
      };

    const renderNextButton = ({ isDisabled, onClick }) => (
        <button
            className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-36 ml-[24rem]"
            onClick={onClick}
            disabled={isDisabled}
        >
    <Icon icon="grommet-icons:next" />    
    </button>
    );
    
    const renderBackButton = ({ isDisabled, onClick }) => (
        <button
            className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full -ml-[25.5rem] -mt-36"
            onClick={onClick}
            disabled={isDisabled}
        >
    <Icon icon="ic:twotone-arrow-back-ios" /> </button>
    );
    return(
        <div className='flex py-4 px-6 drop bg-white shadow-lg gap-3 rounded-md w-ful flex-col'>
  <div className='flex justify-between font-semibold items-center'>
         <span className='text-lg'>Suggested to follow</span> <span className='cursor-pointer text-cta text-sm'>See All</span>
          </div>
          <div className='flex py-2  items-center'>
          <AliceCarousel responsive={responsive} disableDotsControls renderNextButton={renderNextButton} renderPrevButton={renderBackButton}>
           {data.slice(0).reverse().map((friend)=>(
            <div key={friend.id} className='flex ml-10 flex-col  w-28 rounded-md pb-3 justify-center gap-2 text-center'>
            <div className='flex flex-col justify-center text-center'>
            <img className='w-28 border-4 border-cta rounded-md h-28' alt='' src={friend.img} />
            </div>
            <div className="flex flex-col gap-1">
            <p className='font-semibold'>{friend.name}</p>
            <p className='text-sm'>{friend.mutual.length <=1 ?(`${friend.mutual.length} Mutual Friend`):(`${friend.mutual.length} Mutual Friends`)} </p>
            <p className="text-sm font-semibold">{friend.place}</p>
            </div>
            <div className='flex justify-center gap-2'>
           <button className='border-2 border-cta w-5/6 text-cta hover:bg-cta hover:text-white font-semibold py-2 rounded-full'>Follow</button>
            </div>
            </div>
           ))}
           </AliceCarousel>
          </div>
  </div>
    )

} 

export default Followpeople
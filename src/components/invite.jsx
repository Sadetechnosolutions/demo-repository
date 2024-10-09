import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import {useSelector} from 'react-redux'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Invite = () => {
    const responsive = {
        0: { items: 1 },
        600: { items: 1 },
        1024: { items: 2 },
        1600: { items: 2 },
      };

    const renderNextButton = ({ isDisabled, onClick }) => (
    <button
            className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-36 ml-[10rem]"
            onClick={onClick}
            disabled={isDisabled}
        >
          
    <Icon icon="grommet-icons:next" />    
    </button>
    );
    const renderBackButton = ({ isDisabled, onClick }) => (
    <button
          className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full -ml-[12rem] -mt-36"
            onClick={onClick}
            disabled={isDisabled}>
    <Icon icon="ic:twotone-arrow-back-ios" /> </button>
    );

    const {Friends} = useSelector((state)=>state.friend)
  return (
<div className='flex py-4 px-6 drop bg-white shadow-lg gap-3 rounded-md w-ful flex-col'>
  <div className='flex justify-between font-semibold items-center'>
         <span className='text-lg'>Invite</span> <span className='cursor-pointer text-sm text-cta'>See All</span>
          </div>
          <div className='flex py-2 items-center'>
          <AliceCarousel responsive={responsive} disableDotsControls renderNextButton={renderNextButton} renderPrevButton={renderBackButton}>
           {Friends.slice(0).reverse().map((friend)=>(
            <div key={friend.id} className='flex ml-8 flex-col  w-32 rounded-md pb-3 justify-center gap-2 text-center'>
            <div className='flex flex-col justify-center text-center'>
            <img className='w-32 h-32 rounded-full' alt='' src={friend.img} />
            </div>
            <div>
            <p className='font-semibold'>{friend.name}</p>
            <p className='text-sm'>{friend.mutual.length <=1 ?(`${friend.mutual.length} Mutual Friend`):(`${friend.mutual.length} Mutual Friends`)} </p>
            </div>
            <div className='flex justify-center gap-2'>
           <button className='bg-cta w-5/6 text-white flex justify-center items-center gap-0.5 font-semibold py-2 rounded-lg'><Icon icon="mingcute:add-fill" /><span>Invite</span></button>
            </div>
            </div>
           ))}
           </AliceCarousel>
          </div>
  </div>
  )
}

export default Invite

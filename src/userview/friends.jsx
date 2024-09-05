import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Friendscomp = () => {
    const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 3 },
        1600: { items: 3 },
      };
    const navigate = useNavigate()
    const seeallFriends = ()=>{
    navigate('/friendsview',window.scrollTo(0,0))
    }
    const renderNextButton = ({ isDisabled, onClick }) => (
        <button className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-36 ml-[22rem]"
            onClick={onClick}
            disabled={isDisabled}>
    <Icon icon="grommet-icons:next" />    
    </button>
    );
    
    const renderBackButton = ({ isDisabled, onClick }) => (
        <button className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full -ml-[23.5rem] -mt-36"
            onClick={onClick}
            disabled={isDisabled} >
    <Icon icon="ic:twotone-arrow-back-ios" /> </button>
    );
const {Friends} = useSelector((state)=>state.friend)

  return (
<div className='flex py-4 px-6 drop bg-white shadow-lg gap-3 rounded-md h-auto w-[800px] flex-col'>
  <div className='flex justify-between font-semibold items-center'>
         <span className='text-lg'>Friends ({Friends.length})</span> <span onClick={seeallFriends} className='text-cta cursor-pointer text-sm'>See All</span>
          </div>
          <div className='flex py-2 items-center'>
          <AliceCarousel responsive={responsive} disableDotsControls renderNextButton={renderNextButton} renderPrevButton={renderBackButton}>
           {Friends.slice(0).reverse().map((friend)=>(
            <div key={friend.id} className='flex ml-10 flex-col border w-44 border-gray-150 rounded-md pb-3 justify-center gap-2 text-center'>
            <div className='flex flex-col justify-center text-center'>
            <img className='w-48 h-40' alt='' src={friend.img} />
            </div>
            <div>
            <p className='font-semibold'>{friend.name}</p>
            <p className='text-sm'>{friend.mutual.length <=1 ?(`${friend.mutual.length} Mutual Friend`):(`${friend.mutual.length} Mutual Friends`)} </p>
            </div>
            <div className='px-2 py-1 text-cta border hover:bg-cta hover:text-white flex justify-center rounded-md cursor-pointer border-cta'><span className='flex gap-1 items-center'><Icon className='text-lg' icon="ic:round-add" />Add Friend</span></div>
            </div>
           ))}
           </AliceCarousel>
          </div>
  </div>
  )
}

export default Friendscomp

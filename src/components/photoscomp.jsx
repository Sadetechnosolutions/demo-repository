import React from 'react'
import { useSelector } from 'react-redux'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Icon } from '@iconify/react/dist/iconify.js';

const Photoscomp = ({seeallPhotos}) => {
  const{uploaded} = useSelector((state)=>state.photo)
  const responsive = {
    0:   { items: 1 },
    600: { items: 2 },
    1024:{ items: 3 },
    1600:{ items: 3 },
  };
  
  const renderNextButton = ({ isDisabled, onClick }) => (
    <button
        className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full -mt-24 ml-[20.5rem]"
        onClick={onClick}
        disabled={isDisabled}
    >
<Icon icon="grommet-icons:next" />    
</button>
);

const renderBackButton = ({ isDisabled, onClick }) => (
    <button
        className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full -ml-[25rem] -mt-24"
        onClick={onClick}
        disabled={isDisabled}
    >
<Icon icon="ic:twotone-arrow-back-ios" /> </button>
);
  return (
    <div className='flex py-4 px-6 drop bg-white shadow-lg  rounded-md h-auto w-[800px] gap-3 flex-col'>
    <div className='flex justify-between font-semibold items-center'>
           <span className='text-lg'>Photos ({uploaded.length})</span> <span onClick={seeallPhotos} className='cursor-pointer text-cta text-sm'>See All</span>
            </div>
            <div className='flex  flex-col'>
              <div className='flex gap-2 ml-10 h-auto py-2'>
                {uploaded.length >0 && (
                                  <AliceCarousel disableDotsControls renderPrevButton={renderBackButton} renderNextButton={renderNextButton} responsive={responsive} items={uploaded.slice().reverse().map((photo)=>(
                                    <div className='inline-block rounded-md overflow-hidden'>
                                    <img className='w-48 h-40 object-cover cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:opacity-90' alt='imagpg' src={photo.name} />
                                    </div>
                                   ))}>
                                    </AliceCarousel> 
                )}

              </div>
              </div>
    </div>
  )
}

export default Photoscomp

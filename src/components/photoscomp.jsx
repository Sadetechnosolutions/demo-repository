import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Photoscomp = ({seeallPhotos}) => {
  const [images,setImages] = useState()
  const{uploaded} = useSelector((state)=>state.photo)
  const userId = useSelector((state) => state.auth.userId);
  const { userID } = useParams();
  const responsive = {
    0:   { items: 1 },
    600: { items: 2 },
    1024:{ items: 3 },
    1600:{ items: 3 },
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
useEffect(() => {
  const fetchImage = async () => {
      // Prevent fetching if already called
      try {
          const token = localStorage.getItem('token');
          if (!token) {
              console.error('No token found in localStorage');
              return;
          }
          const response = await fetch(`http://localhost:8080/posts/user/${userID}/images`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          });
          if (response.ok) {
              const data = await response.json();
              setImages(data);
          } else {
              console.error('Failed to fetch user Image:', response.statusText);
          }
      } catch (error) {
          console.error('Error fetching user Image:', error);
      }
  };

  fetchImage();
}, []);

const renderBackButton = ({ isDisabled, onClick }) => (
    <button
        className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full -left-11 bottom-16"
        onClick={onClick}
        disabled={isDisabled}
    >
<Icon icon="ic:twotone-arrow-back-ios" /> </button>
);
  return (
    <div className='flex py-4 px-6 drop bg-white shadow-lg  rounded-md h-auto gap-3 flex-col'>
    <div className='flex justify-between font-semibold items-center'>
           <span className='text-lg'>Photos ({images?.length})</span> <Link to={`/photosview/${userID}`}><span className='cursor-pointer text-cta text-sm'>See All</span></Link>
            </div>
            <div className='flex  flex-col'>
              <div className='flex gap-2 ml-10 h-auto items-center py-2'>
                {images?.length >0 && (
                                  <AliceCarousel disableDotsControls renderPrevButton={renderBackButton} renderNextButton={renderNextButton} responsive={responsive} items={images?.map((photo)=>(
                                    <div className='inline-block rounded-md overflow-hidden'>
                                    <img className='w-64 h-64 object-cover cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:opacity-90' alt='imagpg' src={`http://localhost:8083${photo.imageUrl}`} />
                                    </div>
                                   ))}>
                                    </AliceCarousel> 
                )}
                {images?.length ===0 && (
                  <div>
                    No Images available
                  </div>
                )}
              </div>
              </div>
              
    </div>
  )
}

export default Photoscomp

import React,{useState} from 'react'
import { Player,LoadingSpinner,BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import '../styles.css'
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const VideosUser = () => {
  const {videos} = useSelector((state)=>state.video)
  return (
    <div className='flex items-center justify-center w-full '>
      <div className='w-5/6 p-2 px-6 rounded-md shadow-lg'>
        <div className='p-2'>
        <p className='text-lg font-semibold'>Videos ({videos.length})</p>
        </div>
        {/* <div className='flex flex-wrap gap-8 p-2'>
          <div className='w-52 h-[120px] cursor-pointer flex items-center justify-center border rounded-md bg-gray-50'>
            <label className='cursor-pointer' ><span className='flex flex-col items-center'><Icon className='text-cta' icon="zondicons:add-solid" width="1.2em" height="1.2em"   />Upload</span>
              <input className=' absolute opacity-0' accept='video/*' type='file'/>
            </label>
          </div> */}
          <div className='flex flex-wrap gap-8 p-2'>
          <div className='h-96'>
          </div>
           {videos.slice().reverse().map((video)=>(
            <div key={video.id}>
            <Link to={`/videos/${video.id}`}>
            <div className='w-52 rounded-md'>
            <Player className='' controls>
                <source src={video.name} />
                <LoadingSpinner />
                <BigPlayButton position='center' />
            </Player>
            </div>
            </Link>
            </div>
           ))}
           </div>
           </div>
        </div>
  )
}

export default VideosUser

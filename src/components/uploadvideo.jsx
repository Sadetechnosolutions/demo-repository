import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addVideo} from '../slices/videoslice'
import { IoClose } from "react-icons/io5";
import { Player,BigPlayButton } from 'video-react';
import InputEmoji from "react-input-emoji";
import { v4 as uuidv4 } from 'uuid';

const PostVideo = ({close}) => {
  const [caption,setCaption] = useState('');
    const dispatch = useDispatch();

    const {selected} = useSelector((state)=>state.video)
    const {videos} = useSelector((state)=>state.video)

    const videoInfo = {
      id:uuidv4(),
      name:selected.name,
      desc:caption,
      postedTime:'1 sec ago'
    }

    const handlePostVideo = ()=>{
      console.log(dispatch(addVideo(videoInfo)))
      console.log(videos);
    }

  return(
    <div className='flex w-full h-full items-center justify-center'>
      <div className='w-1/2 h-auto flex flex-col px-4 py-6 gap-4 shadow-lg rounded-md bg-white'>
      <div className='flex items-center justify-between'>
      <p className='font-semibold'>Post Video</p>
      <div onClick={close} className='cursor-pointer bg-gray-200 p-1 hover:bg-red flex justify-end hover:text-white rounded-full'><IoClose className='h-5 w-5 cursor-pointer'/></div>
      </div>
      < InputEmoji onChange={(text)=>setCaption(text)} placeholder='Write Something...' />
      <div className='bg-black'>
        <div className='h-full bg-black'>
        <Player controls className='w-full h-full' ><source src={selected.name} /><BigPlayButton position='center'/></Player>
        </div>
      </div>
      <div className='flex justify-end items-center gap-4'><button onClick={close} className='px-3 py-2 border border-gray-200 bg-gray-50 text-black rounded-md'>Cancel</button><button onClick={()=>{handlePostVideo();close()}} className='px-3 py-2 border border-cta text-cta hover:bg-cta hover:text-white rounded-md'>Post</button></div>
      </div>
      </div>
  )
}

export default PostVideo;

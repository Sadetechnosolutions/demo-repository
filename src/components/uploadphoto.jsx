import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPhoto, selectPhoto } from '../slices/photoslice';
import { IoClose } from "react-icons/io5";
import { removeSelected } from '../slices/photoslice';
import { Icon } from '@iconify/react/dist/iconify.js';
import { v4 as uuidv4 } from 'uuid';
import InputEmoji from "react-input-emoji";
import moment from 'moment';

const Postphoto = ({ close }) => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.photo);
  const [caption, setCaption] = useState('');
  const [postedTime, setPostedTime] = useState(moment().fromNow());
  const postedTimeRef = useRef(null);

  useEffect(() => {
    postedTimeRef.current = setInterval(() => {
      setPostedTime(moment().fromNow()); // Update postedTime every minute
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(postedTimeRef.current); // Clean up the interval on unmount
  }, []);

  const selectedPhoto = (event) => {
    const file = event.target.files[0];
    const fileObject = { name: file.name };
    console.log(fileObject);
    dispatch(selectPhoto(fileObject));
  };

  const photoInfo = {
    id: uuidv4(),
    desc: caption,
    name: selected.name,
    postedTime: postedTime,
  };

  const handlePostPhoto = () => {
    console.log(dispatch(addPhoto(photoInfo)));
  };
    return (
    <div className='flex w-full h-full items-center justify-center'>
      <div className='w-1/2 h-auto flex flex-col px-4 py-6 gap-4 shadow-lg rounded-md bg-white'>
      <div className='flex items-center justify-between'>
      <p className='font-semibold'>Post Photo</p>
      <div onClick={close} className='cursor-pointer bg-gray-200 p-1 hover:bg-red flex justify-end hover:text-white rounded-full'><IoClose className='h-5 w-5 cursor-pointer'/></div>
      </div>
      <InputEmoji
      onChange={(text)=>setCaption(text)}
      placeholder="Write Something..."
    />
      <div className=''>
        <div className='h-full flex justify-end' >
            {selected.length===0 ?<div className='flex w-full justify-center'><div className='p-2 cursor-pointer border flex items-center justify-center gap-1 w-1/2 rounded-md border-cta text-cta hover:bg-cta hover:text-white'>
            <label className='cursor-pointer'>
            <span className='flex items-center gap-1'><Icon icon="material-symbols:image-outline" width="1.2em" height="1.2em" />Upload Image</span>
            <input id='uploadphoto' onChange={selectedPhoto} type='file' accept='image/jpeg, image/png' className='absolute  opacity-0 cursor-pointer' />
            </label>
          </div>
          </div>:<div className='flex w-full justify-end'><IoClose onClick={()=>dispatch(removeSelected())} className='absolute cursor-pointer  text-white w-6 h-6 ' />
      <img className='w-full h-96' src={selected.name} alt=''/></div>  }
        </div>
      </div>
      <div className='flex justify-end items-center gap-4'><button onClick={close} className='px-3 py-2 border border-gray-200 bg-gray-50 text-black rounded-md'>Cancel</button><button onClick={()=>{handlePostPhoto();close()}} className='px-3 py-2 border border-cta text-cta hover:bg-cta hover:text-white rounded-md'>Post</button></div>
      </div>
      </div>
  )
}

export default Postphoto;

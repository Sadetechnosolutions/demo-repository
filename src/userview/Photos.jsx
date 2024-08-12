import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const PhotosUser = () => {
  const {uploaded} = useSelector((state)=>state.photo)

  return (
    <>
    <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col w-5/6 px-5 shadow-lg drop'>
        <div className='font-semibold text-lg p-4'>Photos ({uploaded.length})</div>
        <div className='flex flex-wrap p-2 gap-8'>
        {uploaded.slice().reverse().map((photo)=>{
          return(
          <div key={photo.id} className='inline-block cursor-pointer relative overflow-hidden'>
  <NavLink key={photo.id} to={`/photos/${photo.id}`}>
  <div className='relative cursor-pointer'>
    <img className='w-[20rem] md:h-64 rounded-lg' src={photo.name} />
    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-80 rounded-lg flex items-center justify-center">
    <p className="text-white flex items-center justify-center gap-2 md:w-full  w-40 md:text-lg font-semibold"> <Icon className='text-cta' icon="ph:heart-fill" width="1.4em" height="1.4em" />{photo.likes ? photo.likes : 0} </p>
    </div>
    </div>
</NavLink>
</div>
)})}
        </div>
        </div>
    </div>
    </>
  )
}

export default PhotosUser;

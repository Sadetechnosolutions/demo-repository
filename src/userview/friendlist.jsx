import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';

const Friendview = () => {
  const {Friends} = useSelector((state)=>state.friend)

  return (
    <div className=' flex w-full items-center justify-center'>
      <div className='w-5/6 drop bg-white shadow-lg h-auto px-6 flex-col '>
      <div className="flex items-center p-4 justify-between">
      <span className='text-lg font-semibold'>Friends ({Friends.length})</span>
      <div className='flex items-center gap-2'>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className=" w-[24rem] h-11 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-green"/>
            <button type="submit" className="absolute right-0 top-0 bottom-0 px-2 text-gray-400 rounded-r-md focus:outline-none">
              <Icon icon="ooui:search" width="1.2em" height="1.2em"  className='text-gray-400' />
            </button>
          </div>
          </div>
        </div>
        <div className='flex flex-wrap gap-6 items-center p-2'>
            {Friends.slice().reverse().map((friend)=>(
                <div key={friend.id}>
            <div className='flex flex-col rounded-md border border-gray-200 rounded-md w-[17.6rem]'>
<div className="relative">
  <img className="w-full h-28" src={friend.coverimg} alt="" />
  <div className="absolute -mt-10 ml-2 flex  items-center">
    <img className="rounded-full w-16 h-16 border-2 border-white" alt="" src={friend.img} />
  </div>
</div>
            <div className='flex  px-4 flex-col mt-5 gap-3 py-4'>
            <div className='flex justify-between items-start'>
            <div className='flex items-start w-full flex-col'>
              <div className='flex items-center justify-between w-full'>
                <span className='text-md font-semibold'>{friend.name}</span>
                <span className='text-sm'>{friend.place}</span>
            </div>
                <span className='text-sm'>Since <span className='text-xs font-normal px-2 py-0.5 rounded-lg bg-yoi'> {friend.joined}</span></span>
            </div>
            </div>
                <div className='flex flex-col gap-1.5'>
                <div className='flex justify-between'>
                <div className='flex flex-col'>
                <span className=''>Friends: {friend.friends}</span>
                <span><span className='inline-block w-14'>Posts:</span> {friend.post}</span>
                </div>
                <div className='flex flex-col'>
                <span><span className='inline-block w-14'>Photos:</span> {friend.photos}</span>
                <span><span className='inline-block w-14'>Videos:</span> {friend.videos}</span>
                </div>
                </div>
               </div>
            <div className='px-2 py-1 text-cta border hover:bg-cta hover:text-white flex justify-center rounded-md cursor-pointer border-cta'><span className='flex gap-1 items-center'><Icon className='text-lg' icon="ic:round-add" />Add Friend</span></div>
         </div>
         </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Friendview;

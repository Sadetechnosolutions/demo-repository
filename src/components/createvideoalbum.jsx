import React from 'react'
import { IoClose } from 'react-icons/io5'

const Createvideoalbum = ({close}) => {
  return (
<div className='flex w-full h-[500px] items-center justify-center'>
      <div className='w-1/2 h-96 flex p-6 flex-col bg-white gap-4 rounded-md shadow-lg'>
        <div className='flex justify-between'>
            <p>Create Album</p><div className='p-2 cursor-pointer rounded-full bg-gray-50 hover:bg-red hover:text-white'><IoClose onClick={close} /></div>
      </div>
      <div className='flex flex-col gap-2 w-full items-center '>
      <div className='w-full justify-start'><label className='text-sm'>Album Name</label></div>
      <input className='border w-full border-b p-2' type='text' placeholder='Your Album Name'/>
      </div>
      <div className='w-full h-full flex items-center justify-center border border-cta border-dashed'>
      <div className=''>
      <label>
        
    <span className='w-min h-auto border border-cta  p-2 rounded-md text-cta hover:bg-cta hover:text-white cursor-pointer'>Browse Files</span>
    <input type='file' className='flex items-center absolute opacity-0 rounded-md'/>
      </label>
      </div>
      </div>
      <button className='bg-cta w-auto p-2  rounded-md text-white'>Create Album</button>
      </div>
    </div>
  )
}

export default Createvideoalbum

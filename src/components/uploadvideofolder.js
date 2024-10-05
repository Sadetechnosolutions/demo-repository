import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Icon } from '@iconify/react/dist/iconify.js'

const Uploadvideofolder = ({close}) => {
  return (
    <div>
        <div className='flex w-full items-center h-[500px] justify-center'>
        <div className='w-1/2 text-center h-96 shadow-lg rounded-md bg-white flex flex-col px-6 py-6 gap-8'>
          <div className='w-full flex items-center justify-between'>
          <p className='font-semibold text-lg'>Upload folder</p>
          <div onClick={close} className='cursor-pointer bg-gray-200 p-1 hover:bg-red flex justify-end hover:text-white rounded-full'><IoClose className='h-5 w-5 cursor-pointer'/></div>
          </div>
          <div className='flex flex-col h-full border bg-ctao bg-opacity-10 border-cta border-dashed items-center gap-6 justify-center'>
          <div className='flex flex-col gap-2 items-center justify-center'>
            <div className='p-4 w-min rounded-full flex flex-col bg-ctao bg-opacity-70'><Icon className=' text-cta' icon="ph:folder-duotone" width="1.4em" height="1.4em" /></div>
            </div>
            <div className='flex flex-col items-center gap-4 justify-center'>
              <label className='bg-cta p-2 rounded-md text-white cursor-pointer'><span>Browse Folder</span>
            <input type='file'  id="folderInput" webkitdirectory="true" directory="true" multiple className='flex items-center p-2 absolute border opacity-0 rounded-md bg-cta text-white'/>
            </label>
            <p className='text-gray-500 text-sm'>Max Folder size: 100MB</p>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Uploadvideofolder

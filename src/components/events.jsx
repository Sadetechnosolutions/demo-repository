import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

const Events = () => {
    const events=[{
        id:1,
        icon:<Icon className='w-9 h-9' icon="el:mic" />,
        desc:'Open Mic 2024 in Columbia',
        color:'purple'
      },
      {
        id:2,
        icon:<Icon className='w-9 h-9' icon="ph:bowl-food-fill" />,
        desc:'food Festival',
        color:'ctao'
      },]
  return (
    <div className='w-full flex bg-white rounded-md flex-col gap-3 shadow-lg py-3 px-4'>
      <div className='flex items-center justify-between'><span className=' font-semibold'>Explore Events</span> <span className='text-sm text-cta'>See all</span></div>
      <hr />
      {events.map((items)=>(
    <div key={items.id} className={`w-full relative items-center justify-center flex cursor-pointer bg-${items.color} h-32 rounded-md`}>
    <div className='absolute flex flex-col items-center justify-center text-white'><span className=''>{items.icon}</span><span className='text-lg font-semibold'>{items.desc}</span></div>
    <div className='absolute right-0'><img className='' src='clock.png' alt='' /></div>
    </div>
      ))}
    </div>
  )
}

export default Events

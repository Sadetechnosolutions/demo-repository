import React from 'react'
import { Icon } from '@iconify/react';

const Generalinfo = ({general,social}) => {
  return (
    <div>
       <div className='flex mt-10 px-6 drop bg-white shadow-lg rounded-md h-auto w-1/2 flex-col'>
  <div className='flex gap-2 items-center justify-between py-4 border-b border-gray-170 '>
      <span className='font-semibold'>General Info</span>
      <span>See All</span>
    </div>
    <div className='flex py-6 gap-8'>
    {general.profile.map((profile)=>(
      <>
      
      <div className='flex flex-col gap-8 w-1/2'>
          <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="tabler:puzzle-filled" width="1.2em" height="1.2em" /><span>Hobbies</span>
          </div>
          <div className='flex flex-col'>
            <div className=' text-md '>
              <span className=' cursor-pointer'>{profile.hobbies}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="fluent:calendar-work-week-28-filled" width="1.2em" height="1.2em"/> <span>Interests</span>
          </div>
          <div className='flex w-full flex-col'>
            <div className='w-full flex-wrap flex gap-4 text-md '>
            {profile.Interests.map((interest) => (
      <span key={interest.id} className='flex  px-2 py-1 w-auto justify-center items-center rounded-md border border-cta cursor-pointer text-cta'>
        {interest.activity}
      </span>
    ))}
            </div>
          </div>
        </div>
        </div>
        <div className='flex w-1/2 flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="zondicons:education" width="1.2em" height="1.2em" /> <span>Education</span>
          </div>
          <div className='flex flex-col'>
            <div className=' text-md '>
              <span className=' cursor-pointer'>{profile.Education}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="ic:round-email" width="1.2em" height="1.2em" /> <span>Work Experience</span>
          </div>
          <div className='flex flex-col'>
          {profile.Workexperience.map((work) => (
  <div className='flex flex-col' key={work.id}>
    <div className='flex font-semibold items-center gap-1.5'>
      <Icon icon="ic:round-email" width="1.2em" height="1.2em" />
      <span>Work Experience</span>
    </div>
    <div className='flex flex-col'>
      <div className='text-md'>
        <span className='cursor-pointer'>{work.work}</span>
      </div>
      <div className='text-md'>
        <span className='cursor-pointer'>{work.experience}</span>
      </div>
    </div>
  </div>
))}

          </div>
        </div>
        </div>
        
        </>
    ))}
    </div>
   <div className='flex items-start gap-8'>
   <div className='flex w-1/2 flex-col gap-2 '>
    <div className='flex gap-2 items-center'>
   <Icon icon="teenyicons:share-solid" width="1em" height="1em" /><span className='font-semibold'>Social Media</span>
   </div>
   <div className='flex gap-4'>
{social.media.map((socialmedia)=>(
<>
<span className='bg-gray-200 p-2 hover:bg-cta hover:text-white cursor-pointer items-center duration-500 ease-in-ease-out rounded-full'>{socialmedia.icon}</span>
</>
)
)}
   </div>
   </div>
      <div className='flex w-1/2 flex-col gap-2 '>
    <div className='flex gap-2 items-center'>
   <Icon icon="teenyicons:share-solid" width="1em" height="1em" /><span className='font-semibold'>Badges</span>
   </div>
   <div className='flex gap-4'>
<span className=''>{}</span>
   </div>
   </div>
   
   </div>
  </div>
    </div>
  )
}

export default Generalinfo;

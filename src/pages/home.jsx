import React from 'react'
import Weather from '../components/weather'
import Createpost from '../components/createpost'
import Suggestfriends from '../components/suggestfriends'
import Events from '../components/events'
import Reels from '../components/reels'
import Invite from '../components/invite'
import Birthday from '../components/birthday'
import Blogs from '../components/blogs'
import Jobposting from '../components/job posting'

import Story from '../components/story'
import Createjob from '../components/addjob'
import Post from '../components/poste'
import Shortcut from '../components/shortcut'

const Home = () => {

  return(
    <div className='w-full bg-gray-50  px-20 py-4 flex flex-col gap-4'>
<Shortcut />
    <div className='w-full justify-between flex flex-wrap gap-4 '>
    <aside className='md:w-1/5 sm:w-full xs:w-full flex flex-col gap-4'>
    <Weather />
    <Birthday />
    <Events />
    </aside> 
    <div className='md:w-1/2 flex flex-col gap-4 sm:w-full'>
    <Reels /> 
    <Createpost />
    <Post />
{/* 
    <div className="flex bg-gradient-to-tr from-span-start to-span-end text-white flex-col justify-center gap-4 h-96 items-center">
      <div className='flex flex-col items-center'>
         <div className="border-2 p-4 rounded-full text-center w-max"><Icon className="w-11 h-11" icon="fa-solid:user-friends" /></div>
         <p className="text-xl font-semibold">Add Friends</p>
      </div>
         <span onClick={openFriendSuggestion} className='border border-white p-2 hover:bg-white hover:text-cta rounded-md cursor-pointer font-semibold'>View Suggestions</span>
         </div> */}
    </div>
    <aside className='flex flex-col gap-4 md:w-1/4 sm:w-full'>
    <Suggestfriends />
    <Story />
    <Jobposting />
    <Createjob />
    <Blogs />
    <Invite />
    </aside>
    </div>
    </div>
  )
}
export default Home

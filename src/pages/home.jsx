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
  // const[shortcut,showShortcut] = useState(false);
  // const navigate = useNavigate();

  // const [hover,setHover] = useState(null);
  // const userId = useSelector((state)=>state.auth.userId)

  // const handleHover = (id)=>{
  //   setHover(id)
  // }

  // const closeHover = ()=>{
  //   setHover(null)
  // }

  // const handleShortcut =()=>{
  //   showShortcut(!shortcut);
  // }

  // const openFriendSuggestion = ()=>{
  //   navigate('/addfriends')
  // }

  // const handleLogout = () => {
  //   navigate('/');
  //   localStorage.removeItem('token');
  // };

  // const options = [{
  //   id:1,
  //   name:"Profile",
  //   icon:<Icon className='optionicon' icon="gravity-ui:person" />,
  //   path:`/user/${userId}`,
  //   task:'none'
  // },

  // {
  //   id:2,
  //   name:"Chat",
  //   icon:<Icon className='optionicon' icon="mingcute:message-4-line" />,
  //   path:'/messages',
  //   task:'none',
  // },

  // {
  //   id:3,
  //   name:"My Pages",
  //   icon:<Icon className='optionicon' icon="icon-park-solid:web-page" />,
  //   path:'/page',
  //   task:'none'
  // },

  // {
  //   id:4,
  //   name:"Friends",
  //   icon:<Icon className='optionicon' icon="icon-park-outline:peoples-two" />,
  //   path:`/friendsview/${userId}`    ,
  //   task:'none'
  // },

  // {
  //   id:5,
  //   name:"Photos",
  //   icon:<Icon className='optionicon' icon="ph:image-duotone" />,
  //   path:`/photosview/${userId}`,
  //   task:'none'
  // },

  // {
  //   id:6,
  //   name:"Videos",
  //   icon:<Icon className='optionicon' icon="bxs:videos" />,
  //   path:`/videosview/${userId}`,
  //   task:'none'
  // },

  // {
  //   id:7,
  //   name:"Notifications",
  //   icon:<Icon className='optionicon' icon="mi:notification" />,
  //   path:`/notifications/${userId}`,
  //   task:'none'
  // },

  // {
  //   id:8,
  //   name:"Saved",
  //   icon:<Icon icon="foundation:book-bookmark" />,
  //   path:'/saved',
  //   task:'none'
  // },

  // {
  //   id:9,
  //   name:"Logout",
  //   icon:<Icon className='optionicon' icon="fe:logout" />,

  // }]

  // const handleNavigation = (path) => {
  //   navigate(path);
  // };
  
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

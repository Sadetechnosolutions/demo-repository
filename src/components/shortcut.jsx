import React,{useState} from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'

import { NavLink } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Shortcut = ()=>{
    const userId = useSelector((state)=>state.auth.userId)
    const [hover,setHover] = useState(null)
    const navigate = useNavigate();
    const[shortcut,showShortcut] = useState(false);
    const options = [{
        id:1,
        name:"Profile",
        icon:<Icon className='optionicon' icon="gravity-ui:person" />,
        path:`/user/${userId}`,
        task:'none'
      },
    
      {
        id:2,
        name:"Chat",
        icon:<Icon className='optionicon' icon="mingcute:message-4-line" />,
        path:'/messages',
        task:'none',
      },
    
      {
        id:3,
        name:"My Pages",
        icon:<Icon className='optionicon' icon="icon-park-solid:web-page" />,
        path:'/page',
        task:'none'
      },
    
      {
        id:4,
        name:"Friends",
        icon:<Icon className='optionicon' icon="icon-park-outline:peoples-two" />,
        path:`/friendsview/${userId}`    ,
        task:'none'
      },
    
      {
        id:5,
        name:"Photos",
        icon:<Icon className='optionicon' icon="ph:image-duotone" />,
        path:`/photosview/${userId}`,
        task:'none'
      },
    
      {
        id:6,
        name:"Videos",
        icon:<Icon className='optionicon' icon="bxs:videos" />,
        path:`/videosview/${userId}`,
        task:'none'
      },
    
      {
        id:7,
        name:"Notifications",
        icon:<Icon className='optionicon' icon="mi:notification" />,
        path:`/notifications/${userId}`,
        task:'none'
      },
    
      {
        id:8,
        name:"Saved",
        icon:<Icon icon="foundation:book-bookmark" />,
        path:'/saved',
        task:'none'
      },
    
      {
        id:9,
        name:"Logout",
        icon:<Icon className='optionicon' icon="fe:logout" />,
    
      }]

    const handleHover = (id)=>{
        setHover(id)
      }
    
      const closeHover = ()=>{
        setHover(null)
      }
    
      const handleShortcut =()=>{
        showShortcut(!shortcut);
      }

      const handleNavigation = (path) => {
        navigate(path);
      };
    return(
        <div className='fixed flex flex-col gap-4 top-20 left-0 h-auto'>
        <div onClick={handleShortcut} className='w-11 h-11 flex items-center cursor-pointer justify-center border bg-cta rounded-full '>
        <Icon className='w-6 h-6 text-white' icon="mynaui:menu" />
        </div>
        {shortcut &&(
        <div className=' flex flex-col gap-4 left-0 h-auto'>
          {options.map((option)=>(
            <NavLink to={option.path}><div onClick={() => handleNavigation(option.path)} onMouseEnter={()=>handleHover(option.id)} onMouseLeave={closeHover} key={option.id}  className={`relative flex items-center rounded-full bg-gradient-to-tr from-span-start to-span-end ${hover === option.id ? 'w-40' : 'w-11'} transition-all duration-300`}>
        <div key={option.id} className=' w-11 h-11 slide-in-down duration-500 flex items-center cursor-pointer justify-center border bg-cta rounded-full'>
        <span data-tooltip-content= {option.name} data-tooltip-id= "mytooltip" className='flex items-center justify-center text-white'>{option.icon}</span>
        </div>
        {hover === option.id && <div className=' text-white ml-4 flex '>{option.name}</div>}
        </div></NavLink>
          ))}
        </div>
        )}
        </div>
    )
}

export default Shortcut;
import React from "react";
import { Link,useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const SettingsBar = ()=>{
const location = useLocation()
    const data=[
        { id: 1, title: 'General Settings',icon:<Icon className='w-5 h-5'  icon="carbon:settings" />, path: '/settings' },
        { id: 2, title: 'Edit Profile',icon:<Icon className='w-5 h-5' icon="flowbite:edit-outline" />, path: '/editprofile' },
        { id: 3, title: 'Notification',icon:<Icon className='w-5 h-5' icon="ic:outline-edit-notifications" />, path: '/notificationsettings' },
        { id: 4, title: 'Messages',icon:<Icon className='w-5 h-4' icon="bx:message-edit" />, path: '/messagesettings' },
        { id: 5, title: 'Privacy & data',icon:<Icon className='w-5 h-4' icon="carbon:security" />, path: '/Privacydata' },
        { id: 6, title: 'Security',icon:<Icon className='w-5 h-4' icon="material-symbols:lock-outline" />, path: '/security' },
  ]
    return(
        <div className="flex border-r border-gray-300 h-[48rem] flex-col gap-4 w-64">
            {data.map((setting)=>(
          <Link to={setting.path}><div className={`bg-white block h-11 w-full flex items-center px-4 gap-4 font-semibold ${location.pathname === setting.path ? ' text-active ' : 'text-gray-900'}`}>{setting.icon} {setting.title}</div></Link>
        ))}
        </div>
    )
}
export default SettingsBar;
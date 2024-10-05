import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { removeNotification } from '../slices/notificationslice';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux'


const Notifications = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state)=>state.auth.userId)
  const [notification,setNotifications] = useState();

  

  const fetchnotifications = async()=>{
    const token = localStorage.getItem('token')
    try{
      const response = await fetch(`http://localhost:8080/follows/notifications/${userId}`,{
        method:'GET',
        headers:{
          'Authorization': `bearer${token}`
        }
      })
    if(response.ok){
      const data = await response.json()
      setNotifications(data)
    }
    else{
    console.log('');
    }
    }
    catch(error){
      console.error('error fetching data', error)
    }
  }

  useEffect = (() => {
    fetchnotifications()
  },[])

  return (
    <>
    <div className='flex flex-col items-center justify-center'>
  <div className='flex mt-10 px-6 drop bg-white shadow-lg  rounded-md h-auto w-5/6 flex-col'>
    <div className='flex gap-2 items-center py-4 border-b border-gray-170 '>
      <Icon icon="ion:notifications-outline" width="1.4em" height="1.4em" />
      <span className='font-semibold'>All Notifications</span>
    </div>
    <div>
      {notification?.notifications.map((notify) => (
        <div key={notify.id} className='flex cursor-pointer hover:bg-gray-50 notification-item border-b justify-between border-gray-170 py-6 items-center'>
          <div className='flex items-center gap-3'>
            <div>
              <img className='h-11 w-11 rounded-full' alt='' src={`http://localhost:8086${notify.profileImagePath}`} />
            </div>
            <div className='flex flex-col'>
              <p>
                <span className=' cursor-pointer hover:text-cta'>{notify.name}</span> {notify.message}
              </p>
              <div className='flex items-center'>
                <div></div>
                <div>{notify.time}</div>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div><img className='w-14 h-14' alt='' src={notify.target} /></div>
            <div onClick={()=>dispatch(removeNotification(notify.id))} className='p-2 cursor-pointer rounded-full hover:bg-gray-400 hover:text-white 500-duration ease-in-ease-out'>
              <Icon icon="carbon:close" width="1.2em" height="1.2em" style={{ color: 'gray-200' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</>

  )
}

export default Notifications;

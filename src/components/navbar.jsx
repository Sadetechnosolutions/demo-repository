
import React, { useState,useEffect,useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import '../styles.css'
import { useNavigate,NavLink,useLocation } from 'react-router-dom';
import {Tooltip } from 'react-tooltip';
import {useSelector} from 'react-redux';


const Navbar = () => {
  const [user, setUser] = useState('');
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [request,setRequest] = useState()
  const [showAllMessages,setShowAllMessages] = useState(false);
  const [notification,setNotifications] = useState([]);
  const iconHome = <Icon className='outline-none rounded-full col-white' icon="mynaui:home" width="1.5em" height="1.5em" />;
  const iconPersonAdd = <Icon className='outline-none rounded-md col-white' icon="akar-icons:person-add" color="red" width="1.3em" height="1.3em" />;
  const iconNotifications = <Icon className='outline-none rounded-md col-white' icon="ion:notifications-outline" width="1.4em" height="1.4em" />;
  const iconMessageText = <Icon className='outline-none rounded-md col-white' icon="iconoir:message-text" width="1.4em" height="1.4em" />;
  const token = localStorage.getItem('token');
  const userId = useSelector((state) => state.auth.userId);
  const [notificationCount,setNotificationCount] = useState(null)
  const [requestCount , setRequestCount] = useState(null);
  const headers = [
    {
      id: 1, 
      title: 'Home',
      path:'/newsfeed',
      icon: iconHome, 
      dropdownContent: null,
      count:null
    },
    {
      id: 2, 
      title: 'Friend Request', 
      icon: iconPersonAdd,
      count:requestCount
    },
    {
      id: 3, 
      title: 'Notifications', 
      icon: iconNotifications, 
      count:notificationCount
    },
    {
      id: 4, 
      title: 'Messages', 
      icon: iconMessageText, 
      count:null
    },
  ];
  const [activeSection, setActiveSection] = useState(headers.id=1);
  const location = useLocation()
  const dropdownRef = useRef(null);
  const [activeTitle,setActiveTitle] = useState(null);
  const navigate = useNavigate();
  const {messages} = useSelector((state)=>state.message)


  // const handleFriend = (id) => {
  //   // Navigate to user details page with the user ID
  //   navigate(`/user/${id}`);
  // };
// Check if the token exists
if (token) {
  console.log('Token retrieved:', token);
} else {
  console.log('No token found in localStorage.');
}
useEffect(() => {
  const routeName = location.pathname.split('/').pop();
  console.log(routeName)
    setActiveTitle(routeName.toUpperCase());
}, [location.pathname]);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setActiveSection(null);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const fetchUserName = useCallback(async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched user data:', data); // Log fetched data
      setUser(data);
    } else {
      console.error('Failed to fetch user data:', response.status);
      // Optionally handle different status codes (e.g., unauthorized, not found)
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
},[userId]);
const fetchNotification = useCallback(async () => {
  try {
      const token = localStorage.getItem('token');
      if (!token) {
          console.error('No token found in localStorage');
          return;
      }

      const followApi = await fetch(`http://localhost:8080/follows/notifications/${userId}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });

      const requestApi = await fetch(`http://localhost:8080/friend-requests/notifications/${userId}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      });

      const likeApi = await fetch(`http://localhost:8080/likes/notification/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

      const followData = await followApi.json();
      const requestData = await requestApi.json();
      const likeData = await likeApi.json();

      // Log the responses to check their structure
      console.log('Follow Notifications:', followData);
      console.log('Friend Request Notifications:', requestData);

      const combinedNotifications = [
          ...(Array.isArray(followData.notification) ? followData.notification : []),
          ...(Array.isArray(requestData.notification) ? requestData.notification : []),
          ...(Array.isArray(likeData.notification) ? likeData.notification : [])
      ];

      setNotifications(combinedNotifications);
  } catch (error) {
      console.error('Error fetching notifications:', error);
  }
},[userId]);

  
// const fetchReqNotification = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No token found in localStorage');
//       return;
//     }
//     const response = await fetch(`http://localhost:8080/friend-requests/notifications/1`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
  
//     if (response.ok) {
//       const data = await response.json();
//       setNotifications(data);
//       // Check if the user is followed
//       // setIsRequested(data.sentRequests.find((follower) => follower.recipientId === parseInt(userID)));
//     } else {
//       console.error('Failed to fetch user data:', response.status);
//     }
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
//   };

  const dropdowns = {
    submenu: [
      { id: 1, title: 'General Settings',icon:<Icon className='w-5 h-5'  icon="carbon:settings" />, path: '/settings' },
      { id: 2, title: 'Edit Profile',icon:<Icon className='w-5 h-5' icon="flowbite:edit-outline" />, path: '/editprofile'},
      { id: 3, title: 'Notification',icon:<Icon className='w-5 h-5' icon="ic:outline-edit-notifications" />, path: '/notificationsettings'},
      { id: 4, title: 'Messages',icon:<Icon className='w-5 h-4' icon="bx:message-edit" />, path: '/messagesettings' },
      { id: 5, title: 'Privacy & data',icon:<Icon className='w-5 h-4' icon="carbon:security" />, path: '/Privacydata' },
      { id: 6, title: 'Security',icon:<Icon className='w-5 h-4' icon="material-symbols:lock-outline" />, path: '/security', },
],
  };

  const handleIconClick = (id) => {
    setActiveSection(id === activeSection ? null : id);

    if (id === 2) { // Assuming 2 is the ID for 'Friend Requests'
      setRequestCount(null);
    } else if (id === 3) { // Assuming 3 is the ID for 'Notifications'
      setNotificationCount(null);
    }
  };

  const showMessages = showAllMessages ? messages.slice().reverse() :  messages.slice(-5);

  const openNotifications = ()=>{
    navigate(`/notifications/${userId}`)
  }
  const gotoRequestpage =()=>{
    closeDropdown();
    navigate(`/friendrequest/${userId}`)
    setShowAllRequests(!showAllRequests)
  }
  const closeDropdown = ()=>{
    setActiveSection(null);
  }
  const handleViewAll = (title)=>{
    setActiveTitle(title);
  }
  const openMessages = ()=>{
    navigate('/messages/1')
  }

  const fetchRequest = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await fetch(`http://localhost:8080/friend-requests/${userId}/pending-requests`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    
      if (response.ok) {
        const data = await response.json();
        setRequest(data);
        setRequestCount(data.pendingCount)

      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    },[userId]);


    const acceptRequest = async (acceptID)=>{
      const token = localStorage.getItem('token')
      const payload={
        senderId:userId,
        recipientId:acceptID
      }
      try{
        const response = await fetch(`http://localhost:8080/friend-requests/accept?senderId=${acceptID}&recipientId=${userId}`,{
          method:'POST',
          headers:{
            'Authorization':`bearer${token}`
          },
          body:JSON.stringify(payload)
        })
        if(response.ok){
          console.log('')
          fetchRequest()
        }
        else{
          console.log('error in posting data')
        }
      }
      catch(error){
        console.error(error)
      }
    }
    console.log(notification)
    const cancelRequest = async (cancelID)=>{
      const token = localStorage.getItem('token')
      const payload={
        senderId:userId,
        recipientId:cancelID
      }
      try{
        const response = await fetch(`http://localhost:8080/friend-requests/decline?senderId=${cancelID}&recipientId=${userId}`,{
          method:'POST',
          headers:{
            'Authorization':`bearer${token}`
          },
          body:JSON.stringify(payload)
        })
        if(response.ok){
          console.log('')
          fetchRequest()
        }
        else{
          console.log('error in posting data')
        }
      }
      catch(error){
        console.error(error)
      }
    }
    useEffect(() => {
        fetchUserName();
        fetchRequest();
        fetchNotification();

    }, [fetchUserName,fetchRequest,fetchNotification]);

  return (
    <>
    <nav className='flex bg-gradient-to-tr sticky top-0 w-full sm:text-md z-10 from-span-start to-span-end justify-between items-center h-16 flex-row'>
    {activeSection === 'dashboard' && dropdowns.submenu && (
      <div ref={dropdownRef} className="absolute top-16 w-full flex duration-300 slide-in-down z-10 drop justify-center gap-20 bg-white rounded-full shadow-lg">
          {dropdowns.submenu.map((item) =>(
            <div key={item.id} className="cursor-pointer flex py-2 text-cta hover:bg-gray-100">
              {item.title}
            </div>
          ))}
      </div>
    )}
      <div className='flex items-center gap-8'>
        <div className='flex items-center ml-4 gap-20'>
      <div className='flex items-center'>
        <NavLink to='/newsfeed'><img className='w-19 h-9 ' src={`/${'logo.png'}`} alt='logo' /></NavLink>
      </div>
        </div>
        <div className='flex items-center gap-8'>
          <NavLink to={`/user/${userId}`}><div className='flex items-center gap-4'>
        <img src={`http://localhost:8086${user.profileImagePath}`} data-tooltip-id="my-tooltip" data-tooltip-content="Profile" alt='' className='cursor-pointer rounded-full h-10 w-11 bg-gray-300'/>
      <p data-tip="Profile" className='text-white w-28 truncate font-semibold'>{user.name}</p> 
      </div></NavLink>
        <div onClick={() => handleIconClick('dashboard')}
                className={`cursor-pointer hover:bg-transparent px-3 py-3 rounded-full transition-colors duration-500 ease-in-out ${
                  activeSection === 'dashboard' ? 'bg-black-300' : ''
                }`}>
      <Icon className='outline-none' data-tooltip-id="my-tooltip" data-tooltip-content="Menu" icon="radix-icons:dashboard" width="1.2em" height="1.2em"  style={{color: 'white'}} />
      </div>
      </div>
      </div>
      <div className='flex items-center gap-8'>
      <div className='w-32'>
        <p className='text-md font-semibold truncate text-white'>{activeTitle}</p>
        </div>
        <ul className='flex items-center justify-center gap-10'>
          {headers.map((header) => (
            <li key={header.id} className='cursor-pointer'>
              <div className="relative">
                <NavLink to={header.path}><button
                  onClick={() => {handleIconClick(header.id)}}
                  className={`relative cursor-pointer hover:bg-transparent px-2 py-2 rounded-full transition-colors duration-500 ease-in-out ${activeSection === header.id ? '' : ''}`}>
                  <span className="">
                    {React.cloneElement(header.icon, {
                      'data-tooltip-content': header.title,
                      'data-tooltip-id': `tooltip-${header.id}`,
                      style: {
                        color: activeSection === header.id ? 'white' : '',
                      },
                    })}
                             <span className={`absolute top-0 right-0 w-4 h-4 text-xs rounded-full ${header.count > 0 ?'bg-red' : ''} text-white flex items-center justify-center`}> {header.count > 0 ? header.count : ''}</span>
                  </span>

                </button></NavLink>
                {activeSection === header.id && header.title==='Friend Request' && (
                  <div ref={dropdownRef} className="absolute top-full overflow-y-auto overflow-x-hidden -right-20 w-[360px] h-[433px] bg-white rounded-md slide-in-down drop shadow-lg z-10 overflow-hidden">
                    <ul className="">
  <div className='flex absolute sticky top-0 bg-white justify-between items-center text-sm py-2 px-4'><p>Requests</p><p className='text-cta' onClick={()=>{gotoRequestpage()}}>ViewAll</p></div>
  {request.pendingCount===0 && (
    <>
    <div className='flex items-center justify-center'>
      <p>No Requests</p></div></>
  )}
{request?.pendingRequests.map((item) => (
                        <div key={item.id} className=" text-sm notification-item text-gray-800 flex flex-col hover:bg-gray-50 justify-between cursor-pointer">
                          <div className='flex flex-col px-4 h-20 border:gray-300 py-4  border-b text-sm '>
                          <div className='flex justify-between items-center justify-center'>
                          <div className='flex gap-2 items-center'>
                          <img className='rounded-full w-8 h-8' alt='alt' src='profile.jpg' />
                          <div className='flex flex-col '><div className='hover:text-cta'>{item.senderName}</div> <div className='text-gray-400 text-[12px]'>{}</div></div>
                          </div>
                          <div className='flex items-end flex-col '>
                         <div className='flex gap-5'>
                          <button onClick={()=>{acceptRequest(item.senderId)}} className=" text-sm">
                          <Icon className='hover:text-cta text-gray-500' icon="mdi:people-tick" width="1.4em" height="1.4em" /></button>                
                           <button onClick={()=>{cancelRequest(item.senderId)}} className='text-sm hover:text-red'><Icon icon="material-symbols-light:delete" width="1.2em" height="1.2em" /></button>
                          </div>
                          <div className=' text-gray-400 text-time'>{item.time}</div>
                          </div>
                          </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                    <div className='flex  justify-center items-center'>
                    {request.pendingCount >=5 && (
  <button className="flex w-full items-center justify-center text-cta hover:bg-gray-100 text-sm py-1.5 px-4">
     <p onClick={() => setShowAllRequests(true)} >Show more</p>
  </button>
)}
                    </div>
                  </div>
                )}
{activeSection === header.id && header.title === 'Notifications' && (
                  <div ref={dropdownRef} className="absolute top-full overflow-y-auto overflow-x-hidden top-full -right-20 h-[470px] w-[360px] bg-white rounded-md slide-in-down drop shadow-lg z-10 overflow-hidden">
                    <ul className="">
                    <div className='flex absolute sticky top-0 bg-white justify-between text-sm py-2 px-4'><p>Notifications</p> <div className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm px-4' onClick={()=>{openNotifications();handleViewAll('NOTIFICATIONS');closeDropdown()}}><p>Show All</p></div></div>
{notification?.count===0 && <div className='flex items-center justify-center'><p>No Notifications</p></div>}
{notification?.map((item) =>{ 
  
  return(
                        <div key={item.id} className=" text-sm text-gray-800 flex flex-col  hover:bg-gray-50 justify-between cursor-pointer">
                          <div className='flex flex-col px-4 justify-center border:gray-300 h-20 py-2 border-b text-sm '>
                          <div className='flex justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                              <div>
                          <img className='rounded-full w-8 h-8' alt='alt' src={`http://localhost:8086${item.profileImagePath}`} />
                          </div>
                          <div className='flex gap-1'>
                            <div className='hover:text-cta'>{item.name}</div> 
                            <div className='text-gray-600 font-semibold text-md'>{item.message}</div>
                            {item.message.includes('birthday')&&(<p className='text-xs text-cta'> Wish him a Happy birthday!</p>)}
                            </div>
                          </div>
                          <div className='flex flex-col gap-1 items-end'>
                        <div className=' text-gray-400 text-xs'>{item.time}</div>
                        {/* <div><img alt='' className='w-12 h-11' src={item.target} /></div> */}
                          </div>
                          </div>
                          </div>
                        </div>
                      )})}
                    </ul>
                    {notification?.length>=5&& <div className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm py-1.5 px-4'><p>Show more</p></div>}
                  </div>
                )}
                {activeSection === header.id && header.title==='Messages' && (
                  <div ref={dropdownRef} className="absolute overflow-y-auto overflow-x-hidden top-full -right-20 h-[355px] w-[360px] bg-white rounded-md slide-in-down drop shadow-lg z-10 overflow-hidden">
                    <div className='flex absolute sticky top-0 bg-white items-center justify-between text-sm py-2 px-4'><p>Messages</p><p className='text-read text-xs hover:underline'>Mark All As Read</p><div onClick={()=>{openMessages();closeDropdown()}} className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm px-4'><p>View All</p></div></div>
{showMessages.length<=0 && <><div className='flex items-center justify-center'><p>No Messages</p></div></>}
{showMessages.map((item) => (
                        <div key={item.id} className=" text-sm text-gray-800 flex flex-col hover:bg-gray-50 justify-between cursor-pointer">
                          <div className='flex flex-col px-4 justify-center w-full  border:gray-300 py-2 border-b text-sm '>
                          <div className='flex justify-between items-center'>
                            <div className='flex gap-2 w-full items-center'>
                              <div>
                          <img className='rounded-full w-8 h-8' alt='alt' src={item.img} />
                          </div>
                          <div className='flex w-full flex-col'>
                            <div className='hover:text-cta  w-min'>{item.name}</div> 
                            <div className='flex w-full items-center justify-between'>
                            <div className='text-gray-400 truncate-text text-[12px]'>{item.message}</div>
                            <div className=' text-gray-400 text-xs'>{item.time}</div>
                            </div>
                            </div>
                          </div>
                          </div>
                          </div>
                        </div>
                      ))}
{showMessages.length>=5 &&<p onClick={()=>{ setShowAllMessages(true)}} className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm py-1.5 px-4'>Show more</p>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className=" md:w-[420px] sm:w-[220px] h-9 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-green"/>
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-2 text-gray-400 rounded-r-md focus:outline-none">
              <Icon icon="mingcute:search-line" width="1.1em" height="1.1em"  style={{color:'gray-300'}} />
            </button>
          </div>
        </div>
        <div onClick={()=>handleIconClick('settings')} data-tooltip-id="my-tooltip" data-tooltip-content="Settings" className='p-3 rounded-full cursor-pointer duration-500 ease-in-out hover:bg-transparent'>
        <Icon  icon="carbon:settings" width="1.4em" height="1.4em"  style={{color: 'white'}} />
        </div>
{activeSection === 'settings' && dropdowns.submenu && (
  <div ref={dropdownRef} className="absolute duration-500 slide-in-down top-16 right-0 w-52 py-2 flex flex-col gap-4 justify-center bg-white shadow-lg ">
    {dropdowns.submenu.map((item) => (
      <NavLink to={item.path}><div key={item.id} onClick={closeDropdown} className="cursor-pointer  gap-1 flex items-center py-2 px-4 hover:bg-gray-100">
      <span className='p-2 rounded-full bg-white'>{item.icon}</span>  <span className='text-sm '>{item.title}</span>
      </div></NavLink>
    ))}
  </div>
)}
        <Tooltip id="my-tooltip" />
        {headers.map((header) => (
        <Tooltip key={`tooltip-${header.id}`} id={`tooltip-${header.id}`}>
          {header.title}
        </Tooltip>
      ))}
    </nav>
    </>
  );
}

export default Navbar;
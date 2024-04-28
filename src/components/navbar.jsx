import React, { useState,useEffect,useRef } from 'react';
import { Icon } from '@iconify/react';
import '../styles.css'
import { useNavigate,NavLink,useLocation } from 'react-router-dom';
import {Tooltip } from 'react-tooltip';
import { removeRequest } from '../slices/friendrequestslice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { addFriend } from '../slices/friendlistslice';

const Navbar = () => {
  const location = useLocation();
  const {notifications} = useSelector((state)=>state.notification)
  const {friendrequests} = useSelector((state)=>state.friendrequest)
  const {messages} = useSelector((state)=>state.message)
  const {profilepic} = useSelector((state)=>state.photo)
  const dispatch = useDispatch();

  const iconHome = <Icon className='outline-none rounded-full col-white' icon="mynaui:home" width="1.5em" height="1.5em" />;
  const iconPersonAdd = <Icon className='outline-none rounded-md col-white' icon="akar-icons:person-add" color="red" width="1.3em" height="1.3em" />;
  const iconNotifications = <Icon className='outline-none rounded-md col-white' icon="ion:notifications-outline" width="1.4em" height="1.4em" />;
  const iconMessageText = <Icon className='outline-none rounded-md col-white' icon="iconoir:message-text" width="1.4em" height="1.4em" />;
  const dropdowns = {
    submenu: [
      { id: 1, title: 'Profile', path: '/profile' },
      { id: 2, title: 'Settings', path: '/settings' },
      { id: 3, title: 'Profile', path: '/profile' },
      { id: 4, title: 'Settings', path: '/settings' },
      { id: 5, title: 'Profile', path: '/profile' },
      { id: 6, title: 'Settings', path: '/settings' },
      { id: 7, title: 'Profile', path: '/profile' },
      { id: 8, title: 'Settings', path: '/settings' },
],
  };
  const headers = [
    { 
      id: 1, 
      title: 'Home',
      path:'/newsfeed',
      icon: iconHome, 
      dropdownContent: null
    },
    { 
      id: 2, 
      title: 'Friend Request', 
      icon: iconPersonAdd,
    },
    { 
      id: 3, 
      title: 'Notifications', 
      icon: iconNotifications, 
    },
    { 
      id: 4, 
      title: 'Messages', 
      icon: iconMessageText, 
    },
  ];
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [activeSection, setActiveSection] = useState(headers.id=1);
  const handleIconClick = (id) => {
    setActiveSection(id === activeSection ? null : id);
  };

  const navigate = useNavigate();
  const showRequest = showAllRequests ? friendrequests.slice().reverse() :  friendrequests.slice(-5);
  const [activeTitle,setActiveTitle] = useState(null);
  const openNotifications = ()=>{
    navigate('/notifications')
  }
  const gotoRequestpage =()=>{
    closeDropdown();
    navigate('/friendrequest')
    setShowAllRequests(!showAllRequests)
  }
  const closeDropdown = ()=>{
    setActiveSection(null);
  }
  const handleViewAll = (title)=>{
    setActiveTitle(title);
  }

  useEffect(() => {
    const routeName = location.pathname.split('/').pop();
    const type = parseInt(routeName,10) === Number
    console.log(routeName)
      if(!isNaN(type)){
        setActiveTitle('');
      }
      else{setActiveTitle(routeName.toUpperCase());
  }}, [location.pathname]);

  const dropdownRef = useRef(null);
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
  const handleAddfriend =(id)=>{
    dispatch(addFriend(id));
  }
  return (
    <>
    <nav className='flex bg-gradient-to-tr sticky top-0 sm:w-full sm:text-md z-10 from-span-start to-span-end justify-between items-center h-16 px-5 flex-row'>
          {activeSection === 'dashboard' && dropdowns.submenu && (
      <div ref={dropdownRef} className="absolute top-16 w-full flex duration-300 slide-in-down z-10 drop justify-center gap-20 bg-white shadow-lg">
          {dropdowns.submenu.map((item) =>(
            <div key={item.id} className="cursor-pointer flex py-2 hover:bg-gray-100">
              {item.title}
            </div>
          ))}
      </div>
    )}
      <div className='flex items-center gap-8'>
        <div className='flex items-center gap-20'>
      <div className='flex items-center'>
        <NavLink to='/newsfeed'><img className='w-19 h-9 ' src='logo.png' alt='logo' /></NavLink>
      </div>
        </div>
        <div className='flex items-center gap-8'>
          <NavLink to='/profile'><div className='flex items-center gap-4'>
        <img src={profilepic} data-tooltip-id="my-tooltip" data-tooltip-content="Profile" alt='' className='cursor-pointer rounded-full h-10 w-11 bg-gray-300'/>
      <p data-tip="Profile" className='text-white w-28 truncate font-semibold'>Peter Parker</p>
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
                  className={`cursor-pointer hover:bg-transparent px-3 py-3 rounded-full transition-colors duration-500 ease-in-out ${activeSection === header.id ? '' : ''}`}
                >
                  <span className="">
                    {React.cloneElement(header.icon, {
                      'data-tooltip-content': header.title,
                      'data-tooltip-id': `tooltip-${header.id}`,
                      style: {
                        color: activeSection === header.id ? 'white' : '',
                      },
                    })}
                  </span>
                </button></NavLink>
                {activeSection === header.id && header.title==='Friend Request' && (
                  <div ref={dropdownRef} className="absolute top-full overflow-y-auto overflow-x-hidden -right-20 w-[360px] h-[433px] bg-white rounded-md slide-in-down drop shadow-lg z-10 overflow-hidden">
                    <ul className="">
  <div className='flex justify-between items-center text-sm py-2 px-4'><p>Requests</p></div>
  {showRequest.length===0&& (
    <>
    <div className='flex items-center justify-center'>
      <p>No Requests</p></div></>
  )}
{showRequest.map((item) => (
                        <div key={item.id} className=" text-sm notification-item transform text-gray-800 flex flex-col hover:bg-gray-50 justify-between cursor-pointer">
                          <div className='flex flex-col px-4 border:gray-300 py-4  border-b text-sm '>
                          <div className='flex justify-between items-center justify-center'>
                            <div className='flex gap-2 items-center'>
                          <img className='rounded-full w-8 h-8' alt='alt' src={item.img} />
                          <div className='flex flex-col '><div className='hover:text-cta'>{item.name}</div> <div className='text-gray-400 text-[12px]'>{item.mutual}</div></div>
                          </div>
                          <div className='flex items-end flex-col '>
                         <div className='flex gap-5'>
                          <button onClick={()=>{handleAddfriend(item);dispatch(removeRequest(item.id))}} className=" text-sm">
                          <Icon className='hover:text-cta text-gray-500' icon="mdi:people-tick" width="1.4em" height="1.4em" /></button>                
                           <button onClick={()=>dispatch(removeRequest(item.id))} className='text-sm hover:text-red'><Icon icon="material-symbols-light:delete" width="1.2em" height="1.2em" /></button>
                          </div>
                          <div className=' text-gray-400 text-time'>{item.time}</div>
                          </div>
                          </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                    <div className='flex  justify-center items-center'>
                    {showRequest.length>=5 && (
  <button className="flex w-full items-center justify-center text-cta hover:bg-gray-100 text-sm py-1.5 px-4">
    {showAllRequests ? <p onClick={()=>{gotoRequestpage()}}>ViewAll</p> : <p onClick={() => setShowAllRequests(!showAllRequests)} >Show more</p>}
  </button>
)}
                    </div>
                  </div>
                )}
{activeSection === header.id && header.title === 'Notifications' && (
                  <div ref={dropdownRef} className="absolute top-full -right-20 h-[470px] w-[360px] bg-white rounded-md slide-in-down drop shadow-lg z-10 overflow-hidden">
                    <ul className="">
                    <div className='flex justify-between text-sm py-2 px-4'><p>Notifications</p></div>
{notifications.length<=0 && <div className='flex items-center justify-center'><p>No Notifications</p></div>}
{notifications.map((item) => (
                        <div key={item.id} className=" text-sm text-gray-800 flex flex-col  hover:bg-gray-50 justify-between cursor-pointer">
                          <div className='flex flex-col px-4 justify-center border:gray-300 py-2 border-b text-sm '>
                          <div className='flex justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                              <div>
                          <img className='rounded-full w-8 h-8' alt='alt' src={item.img} />
                          </div>
                          <div className='flex flex-col'>
                            <div className='hover:text-cta'>{item.name}</div> 
                            <div className='text-gray-400 text-[12px]'>{item.notification}</div>
                            {item.notification.includes('birthday')&&(<p className='text-xs text-cta'> Wish him a Happy birthday!</p>)}
                            </div>
                          </div>
                          <div className='flex flex-col gap-1 items-end'>
                        <div className=' text-gray-400 text-xs'>{item.time}</div>
                        <div><img alt='' className='w-12 h-11' src={item.target} /></div>
                          </div>
                          </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                    {notifications.length>=5&& <div className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm py-1.5 px-4' onClick={()=>{handleViewAll('NOTIFICATIONS');openNotifications();closeDropdown()}}><p>View All</p></div>}
                  </div>
                )}
                {activeSection === header.id && header.title==='Messages' && (
                  <div ref={dropdownRef} className="absolute top-full -right-20 h-[430px] w-[360px] bg-white rounded-md slide-in-down drop shadow-lg z-10 overflow-hidden">
                    <ul className="">
                    <div className='flex items-center justify-between text-sm py-2 px-4'><p>Messages</p><p className='text-read text-xs hover:underline'>Mark All As Read</p></div>
{messages.length<=0 && <><div className='flex items-center justify-center'><p>No Messages</p></div></>}
{messages.map((item) => (
                        <div key={item.id} className=" text-sm text-gray-800 flex flex-col  hover:bg-gray-50 justify-between cursor-pointer">
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
                    </ul>
{messages.length>=5 &&<div className='flex items-center justify-center text-cta hover:bg-gray-100 text-sm py-1.5 px-4'><p>View All</p></div>}
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
  <div ref={dropdownRef} className="absolute duration-500 slide-in-down top-16 right-0 w-44 flex flex-col justify-center bg-white shadow-lg ">
    {dropdowns.submenu.map((item) => (
      <div key={item.id} className="cursor-pointer flex py-2 px-4 hover:bg-gray-100">
        {item.title}
      </div>
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

import React, { useCallback, useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Friendscomp = ({userID}) => {
    const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 3 },
        1600: { items: 3 },
      };
    const navigate = useNavigate()
    const [friends,setFriends] = useState()
    const seeallFriends = ()=>{
    navigate('/friends',window.scrollTo(0,0))
    }
    
    const userId = useSelector((state) => state.auth.userId);
    const renderNextButton = ({ isDisabled, onClick }) => (
        <button
            className="absolute p-2 flex hover:bg-cta hover:text-white items-center justify-center bg-gray-100 rounded-full  right-8 bottom-16"
            onClick={onClick}
            disabled={isDisabled}
        >
    <Icon icon="grommet-icons:next" />    
    </button>
    );
    
    const renderBackButton = ({ isDisabled, onClick }) => (
        <button
            className="absolute p-2 hover:bg-cta hover:text-white bg-gray-100 rounded-full left-0 bottom-16"
            onClick={onClick}
            disabled={isDisabled}
        >
    <Icon icon="ic:twotone-arrow-back-ios" /> </button>
    );

const isCurrentUser = parseInt(userID) === userId;

const fetchfriends = useCallback( async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    const response = await fetch(`http://localhost:8080/friend-requests/${isCurrentUser ? userId:userID}/friends`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      setFriends(data);
      // Check if the user is followed
      // setIsRequested(data.sentRequests.find((follower) => follower.recipientId === parseInt(userID)));
    } else {
      console.error('Failed to fetch user data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  },[isCurrentUser,userId,userID]);

  
  const unFriend = async (unfriendId)=>{
    const token = localStorage.getItem('token')

    try{
      const response = await fetch(`http://localhost:8080/friend-requests/delete-friend/${userId}/${unfriendId}`,{
        method:'DELETE',
        headers:{
          'Authorization':`bearer${token}`
        },
      
      })
      if(response.ok){
        console.log('')
        fetchfriends()
      }
      else{
        console.log('error in posting data')
      }
    }
    catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchfriends()
  },[fetchfriends])
  return (
<div className='flex py-4 px-6 drop bg-white shadow-lg gap-3 rounded-md h-auto flex-col'>
  <div className='flex justify-between font-semibold items-center'>
         <span className='text-lg'>Friends ({friends?.friendCount})</span> <span onClick={seeallFriends} className='text-cta cursor-pointer text-sm'>See All</span>
          </div>
          <div className='flex py-2 items-center'>
          <AliceCarousel responsive={responsive} disableDotsControls renderNextButton={renderNextButton} renderPrevButton={renderBackButton}>
           {friends?.friends.map((friend)=>(
            <div key={friend.id} className='flex ml-10 h-64 flex-col border w-44 border-gray-150 rounded-md pb-3 justify-center gap-2 text-center'>
            <div className='flex flex-col justify-center text-center'>
            <img className='w-48 h-40' alt='' src={`http://localhost:8086${friend.profileImagePath}`} />
            </div>
            <div>
            <p className='font-semibold'>{friend.name}</p>
            {/* <p className='text-sm'>{friend.mutual.length <=1 ?(`${friend.mutual.length} Mutual Friend`):(`${friend.mutual.length} Mutual Friends`)} </p> */}
            </div>
            {isCurrentUser?(<div className='flex justify-center gap-2'>
            <div className='flex p-2 cursor-pointer hover:bg-cta rounded-md items-center justify-center bg-gray-500'><Icon icon="ph:chat-dots" width="1.2em" height="1.2em"  style={{color: 'white'}} /></div>
            <div onClick={()=>{unFriend(friend.id)}} className='flex p-2 cursor-pointer hover:bg-red rounded-md items-center justify-center bg-gray-500'><Icon icon="icon-park-solid:people-delete-one" width="1.2em" height="1.2em"  style={{color: 'white'}} /></div>
            </div>) : userId === friend.id ? '' : (<div className='px-3'><div className='flex p-2 cursor-pointer gap-2 hover:bg-cta rounded-md items-center justify-center bg-gray-400'><Icon icon="bi:person-add" width="1.2em" height="1.2em"  style={{color: 'white'}} /><span className='text-white'>Add Friend</span></div></div>)}
            </div>
           ))}
           </AliceCarousel>
          </div>
  </div>
  )
}

export default Friendscomp
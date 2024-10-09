import React, { useState,useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import {useSelector} from 'react-redux'

const Friendrequest = () => {
  const [request,setRequest] = useState()
  const userId = useSelector((state)=>state.auth.userId)



    const fetchRequest =  useCallback(async () => {
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
          // Check if the user is followed
          // setIsRequested(data.sentRequests.find((follower) => follower.recipientId === parseInt(userID)));
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
          fetchRequest()
      }, [fetchRequest]);
  return (
<div className='w-full flex items-center justify-center'>
      <div className='w-5/6 px-6 drop bg-white shadow-lg  rounded-md h-auto w-3/5 flex-col '>
      <div className="flex items-center p-4 justify-between">
      <span className='text-lg font-semibold'>FriendRequests ({request.pendingCount})</span>
      <div className='flex items-center gap-2'>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className=" w-[220px] h-11 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-green"/>
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-2 text-gray-400 rounded-r-md focus:outline-none"
            >
              <Icon icon="ooui:search" width="1.2em" height="1.2em"  className='text-gray-400' />
            </button>
          </div>
          <Icon icon="carbon:overflow-menu-vertical" width="1.2em" height="1.2em" />
          </div>
        </div>
        <div className='flex flex-wrap gap-8 items-center p-2'>
            {request?.pendingRequest.map((friend)=>(
            <div key={friend.id} className='flex flex-col border border-gray-200 rounded-md w-[22rem] '>
<div className="relative">
  <img className="w-full h-28" src={`http://localhost:8086${friend.senderBannerPath}`} alt="" />
  <div className="absolute -mt-10 ml-2 flex  items-center">
    <img className="rounded-full w-16 h-16 border-2 border-white" alt="" src={`http://localhost:8086${friend.senderImagePath}`} />
  </div>
</div>
            <div className='flex flex-col mt-5 gap-3 p-2'>
              <div className='flex justify-between items-start'>
            <div className='flex items-start flex-col'>
                <span className='text-md font-semibold'>{friend.senderName}</span>
                <span className='text-sm'>{friend.place}</span>
                <span className='text-sm text-gray'>{friend.mutual}</span>
            </div>
            </div>
           
            <div className='flex gap-5'>
                          <button onClick={()=>{acceptRequest(friend.senderId)}} className=" text-sm hover:text-cta">
                          Confirm</button>                
                           <button onClick={()=>{cancelRequest(friend.senderId)}} className='text-sm hover:text-red'>Delete</button>
                          </div>
         </div>
         </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Friendrequest;

import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import {useSelector,useDispatch} from 'react-redux'
import { removeRequest } from '../slices/friendrequestslice';
import { addFriend } from '../slices/friendlistslice';

const Friendrequest = () => {
  const handleAddfriend = (friend)=>{
    console.log(dispatch(addFriend(friend)));
    console.log(friendrequests)
  }
  const dispatch = useDispatch();
    const {friendrequests} = useSelector(state=>state.friendrequest)
  return (
<div className='w-full flex items-center justify-center'>
      <div className='w-5/6 px-6 drop bg-white shadow-lg  rounded-md h-auto w-3/5 flex-col '>
      <div className="flex items-center p-4 justify-between">
      <span className='text-lg font-semibold'>FriendRequests ({friendrequests.length})</span>
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
            {friendrequests.map((friend)=>(
            <div key={friend.id} className='flex flex-col border border-gray-200 rounded-md w-[22rem] '>
<div className="relative">
  <img className="w-full h-28" src={friend.coverimg} alt="" />
  <div className="absolute -mt-10 ml-2 flex  items-center">
    <img className="rounded-full w-16 h-16 border-2 border-white" alt="" src={friend.img} />
  </div>
</div>
            <div className='flex flex-col mt-5 gap-3 p-2'>
              <div className='flex justify-between items-start'>
            <div className='flex items-start flex-col'>
                <span className='text-md font-semibold'>{friend.name}</span>
                <span className='text-sm'>{friend.place}</span>
                <span className='text-sm text-gray'>{friend.mutual}</span>
            </div>
            </div>

            <div className=' gap-4   flex justify-center rounded-md cursor-pointer border-cta'><button onClick={()=>{handleAddfriend(friend);dispatch(removeRequest(friend.id))}} className='text-cta border hover:bg-cta p-1 rounded-md flex border-cta justify-center hover:text-white w-1/2'>Confirm</button><button onClick={()=>{dispatch(removeRequest(friend.id))}} className='text-red border hover:bg-red p-1 border-red rounded-md flex justify-center hover:text-white w-1/2'>Delete</button></div>
         </div>
         </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Friendrequest;

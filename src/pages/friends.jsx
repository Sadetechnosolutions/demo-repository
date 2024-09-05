import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { useSelector,useDispatch } from 'react-redux';
import { removeFriend } from '../slices/friendlistslice';
import {Tooltip } from 'react-tooltip';

const Friendlist = () => {
  const [activeId, setActiveId] = useState(null);
  const [blocked,isBlocked] = useState(false);
  const [dropdown,setDropdown] = useState(false);
  const [activeDropdown,setActiveDropdown] = useState('public');
  const {Friends} = useSelector((state)=>state.friend)
  const dispatch = useDispatch();


  const removefromlist = (id)=>{
    dispatch(removeFriend(id))
  }
  const block = ()=>{
    isBlocked(!blocked);
  }
  const handleDropdownActive = (id) => {
    setActiveDropdown(id === activeDropdown ? id : id);
  };
  const options = [{
    id:1,
    name: blocked? 'Unblock':'Block',
    task:block
  },
  {
    id:2,
    name:'Unfriend',
    task:removefromlist
  },
  {
    id:3,
    name:'Mute'
  },
  {
    id:4,
    name:'Hide'
  }
]

  const handleprivacyDropdown = ()=>{
    setDropdown(!dropdown)
  }

  const handleDropdown = (id) => {
    setActiveId(id === activeId ? null : id);
  };

  const handleclosePrivacydropdown = ()=>{
    setDropdown(false)
  }
 return (
    <div className=' flex w-full items-center justify-center'>
      <div className='w-5/6 drop bg-white shadow-lg h-auto px-6 flex-col '>
      <div className="flex items-center p-4 justify-between">
        <div className='flex gap-2 items-center'>
      <span className='text-lg font-semibold'>Friends ({Friends.length})</span>
      <Icon icon="fluent:edit-12-regular" data-tooltip-id="my-tooltip" data-tooltip-content="Edit privacy" className='cursor-pointer focus:outline-none text-gray-600' onClick={handleprivacyDropdown} width="1.2em" height="1.2em" />
          {dropdown &&(
            <div className='absolute flex w-24 shadow-lg flex-col bg-white border'>
            <span onClick={()=>{handleclosePrivacydropdown();handleDropdownActive('public')}} className={`h-8 flex border-b border-gray-200  items-center px-1 gap-1 cursor-pointer ${activeDropdown === 'public' ? 'text-cta' : ''}`}
            ><Icon icon="material-symbols:public" />Public</span>
              <span onClick={()=>{handleclosePrivacydropdown();handleDropdownActive('onlyme')}} className={`h-8 flex items-center px-1 gap-1 cursor-pointer ${activeDropdown === 'Friends' ? 'text-cta' : ''}`}><Icon icon="bi:people" />Friends</span>
              <span onClick={()=>{handleclosePrivacydropdown();handleDropdownActive('onlyme')}} className={`h-8 flex items-center px-1 gap-1 cursor-pointer ${activeDropdown === 'onlyme' ? 'text-cta' : ''}`}><Icon icon="material-symbols:lock-outline" />Only me</span>
            </div>
          )}
          </div>
      <div className='flex items-center gap-2'>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className=" w-[24rem] h-11 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-green"/>
            <button type="submit" className=" right-0 top-0 bottom-0 px-2 text-gray-400 rounded-r-md focus:outline-none">
              <Icon icon="ooui:search" width="1.2em" height="1.2em"  className='text-gray-400' />
            </button>
          </div>
          {/* <div className='flex flex-col justify-start '>
          <Icon icon="ion:settings-outline" className='cursor-pointer' onClick={handleprivacyDropdown} width="1.2em" height="1.2em" />
          {dropdown &&(
            <div className='absolute flex w-24 shadow-lg flex-col bg-white border'>
            <span onClick={()=>{handleclosePrivacydropdown();handleDropdownActive('public')}} className={`h-8 flex items-center gap-1 cursor-pointer ${activeDropdown === 'public' ? 'text-cta' : ''}`}><Icon icon="material-symbols:public" />Public</span>
            <span onClick={()=>{handleclosePrivacydropdown();handleDropdownActive('onlyme')}} className={`h-8 flex items-center gap-1 cursor-pointer ${activeDropdown === 'onlyme' ? 'text-cta' : ''}`}><Icon icon="material-symbols:lock-outline" />Only me</span>
            </div>
          )}
          </div> */}
          </div>
        </div>
        <div className='flex mt-6 flex-wrap gap-6 items-center p-2'>
            {Friends.slice().reverse().map((friend)=>(
                <div key={friend.id}>
            <div className='flex flex-col rounded-md border border-gray-200 rounded-md w-[17.6rem]'>
<div className="relative">
  <img className="w-full h-28" src={friend.coverimg} alt="" />
  <div className="absolute -mt-10 ml-2 flex  items-center">
    <img className="rounded-full w-16 h-16 border-2 border-white" alt="" src={friend.img} />
  </div>
</div>
      <div className='flex  px-4 flex-col mt-5 gap-3 py-4'>
            <div className='flex justify-between items-start'>
            <div className='flex items-start w-full flex-col'>
            <span className='text-md font-semibold'>{friend.name} <span className='text-xs font-normal px-2 py-0.5 rounded-lg bg-yoi'>Since March 2021</span></span>
              <div className=' w-full items-center justify-between'>
                <span className='text-xs'>{friend.place}</span>
                <span> </span>
              </div>
            </div>
            <Icon className='cursor-pointer' onClick={()=>handleDropdown(friend.id)} icon="carbon:overflow-menu-vertical" width="1.2em" height="1.2em" />
            {activeId === friend.id && (
                    <div className="absolute  slide-in-down flex flex-col bg-white items-center mt-6 w-28 ml-36  h-auto">
                      {options.map((option) => (
                        <div onClick={()=>option.task(friend.id)} className='flex hover:bg-gray-100 hover:text-red justify-start right-0 p-1 text-sm w-full cursor-pointer' key={option.id}>
                          {option.name}
                        </div>
                      ))}
                    </div>
                  )}
            </div>
                <div className='flex flex-col gap-1.5'>

                  <div className='flex justify-between'>
                <div className='flex flex-col'>
                <span className=''>Friends: {friend.friends}</span>
                <span><span className='inline-block w-14'>Posts:</span> {friend.post}</span>
                </div>
                <div className='flex flex-col'>
                <span><span className='inline-block w-14'>Photos:</span> {friend.photos}</span>
                <span><span className='inline-block w-14'>Videos:</span> {friend.videos}</span>
                </div>
                </div>
                </div>
            <div className='px-2 py-1 text-cta border hover:bg-cta hover:text-white flex justify-center rounded-md cursor-pointer border-cta'><span className=''>Message</span>
            </div>
         </div>
         </div>
                </div>
            ))}
        </div>
      </div>
      <Tooltip id="mytooltip" />
    </div>
  )
}

export default Friendlist;

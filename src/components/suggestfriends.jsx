
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {addFriend} from '../slices/friendlistslice'
import { convertFollower } from '../slices/followerslice'

const Suggestfriends = () => {
    const {followers} = useSelector((state)=>state.follower)
    const dispatch = useDispatch();

    const handleFriend = (id)=>{
     console.log(dispatch(addFriend(id)))
    }
    const handleconvertfollow = (id)=>{
        dispatch(convertFollower(id))
    }
    return (
    <div className='w-full px-4 py-3 rounded-md bg-white flex flex-col gap-3 shadow-lg'>
      <div className='flex justify-between'>
      <span className='font-semibold'>Who's following you</span><span className="text-cta">See All</span>
      </div>
      <hr />
      <div className='flex  flex-col gap-4'>
        {followers.map((list)=>(
            <div key={list.id} className='flex ease-in-ease-out cursor-pointer duration-500 items-center justify-between'>
         <div className='flex items-center gap-2'><img className='rounded-full w-8 h-8' src={list.img} alt='' /><span className='w-32 truncate '>{list.name}</span></div>
         <button onClick={()=>{handleFriend(list);handleconvertfollow(list.id)}} className='bg-cta p-2 text-sm text-white font-semibold rounded-md'>Add Friend</button>
         </div>
        ))}
        </div>
    </div>
  )
}

export default Suggestfriends
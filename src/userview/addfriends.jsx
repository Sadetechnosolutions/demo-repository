import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Icon } from "@iconify/react/dist/iconify.js"

const Addfriends =()=>{
    const [request, setRequest] = useState({});
    const {followers} = useSelector((state)=>state.follower)
    const handleRequest = (id) => {
        setRequest((prevRequests) => ({
            ...prevRequests,
            [id]: !prevRequests[id]
        }));
    };

return(
    <div className="flex min-h-screen items-center justify-center">
         <div className="relative flex flex-col gap-6 w-1/2 ">
         <div className="flex flex-col items-center">
         <div className="border-2 p-4 rounded-full border-cta text-center text-cta w-max"><Icon className="w-11 h-11" icon="fa-solid:user-friends" /></div>
         <p className="text-xl text-cta font-semibold">Add Friends</p>
         </div>
         <div className="relative">
            <input type="text" placeholder="Search" className=" md:w-full sm:w-[220px] h-9 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green"/>
            <button type="submit" className="absolute right-0 bottom-0 top-0 px-2 text-gray-400 rounded-r-md focus:outline-none">
              <Icon icon="mingcute:search-line" width="1.1em" height="1.1em"  style={{color:'gray-300'}} />
            </button>
        </div>
        <div className="flex flex-col gap-2">
                <p className="font-semibold">Suggested people</p>
                {followers?.map((list)=>(
                <div key={list.id} className='flex ease-in-ease-out border-b border-gray-200 py-2 cursor-pointer duration-500 items-center justify-between'>
                <div className='flex items-center gap-2'><img className='rounded-full w-8 h-8' src={list.img} alt='' /><span className=' '>{list.name}</span></div>
                <button onClick={()=>{handleRequest(list.id)}} className={`${request[list.id]?'border border-cta text-cta':'bg-cta text-white'} w-28 h-9 justify-center flex items-center text-sm  font-semibold rounded-md`}>{request[list.id]?<span className="flex items-center">Cancel</span>:<span className="flex items-center"><Icon className="w-5 h-5" icon="ic:baseline-add" />Add Friend</span>}</button>
                </div>
                ))}
            </div>
            <div className="flex items-center justify-end gap-11">
                <button className="p-2 border border-cta text-cta hover:bg-cta hover:text-white rounded-md">Continue</button>
            </div>
         </div>
    </div>
)}

export default Addfriends;
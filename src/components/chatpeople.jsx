import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import data from '../message.json'


const Messagelist = ({messages,handleSelectMessage})=>{
    const location = useLocation()
    return(
        <div className="w-1/3 overflow-scroll flex flex-col h-inherit shadow-lg h-full">
            <div className="px-4 flex flex-col gap-2">
                <div className="flex sticky top-0 bg-white py-4 items-center justify-between">
                <span className="font-semibold">Chats</span>
                <Icon className="w-5 h-5" icon="bx:edit" />                
                </div>
                <div className="flex  sticky top-14 bg-white items-center">
                    <input className="w-full px-2 rounded-md h-11 border-none outline-none bg-gray-100" type="text" placeholder="Search Friend" />
                    <div className="w-9 h-11 flex items-center justify-center bg-gray-100"><Icon icon="ooui:search" /></div>
                </div>
                <div className="flex w-auto  flex-col">
                {data?.map((message)=>(
                <Link to={`/messages/${message.id}`}>
                        <div key={message.id} className={`h-24 cursor-pointer border-gray-300 border-b rounded-md flex items-center px-4 ${location.pathname.includes(message.id) ? "active" : ""}`}
  style={location.pathname.includes(message.id) ? { backgroundColor: '#5CBE8F',color:'#fff' } : null}>
                            <div className="flex items-center gap-2">
                                <img className="md:w-9 h-9 rounded-full" src={`/${message.img}`} />
                                <div className="flex  w-1/4 flex-col gap-1"> 
                                <span className="font-semibold w-full ">{message.name}</span>
                                <span className="md:w-40 w-full block truncate">{message.message}</span>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Messagelist;
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Reels=()=>{
    const reelsdata =[{
        id:1,
        name:'Adam James',
        dp:'author.jpg',
        story:"dp.jpg"
    },
    {
        id:2,
        name:'Walker',
        dp:'author.jpg',
        story:"dp.jpg"
    },
    {
        id:3,
        name:'Claire Thompson',
        dp:'author.jpg',
        story:"dp.jpg"
    }]

return(
    <>
    <div className="w-full px-4 py-2 flex bg-white rounded-md flex-col gap-4 shadow-lg">
        <div className="w-full flex gap-6">
            <div style={{backgroundImage:"url(prof-bg.png)"}} className="relative contain-r inline-block cursor-pointer rounded-lg overflow-hidden flex flex-col w-56 h-[22rem]">
            <span className="rounded-full border border-white text-white flex items-center justify-center absolute transition-transform duration-300 hover:scale-110 ml-4 mt-4 w-9 h-9" ><Icon className="w-6 h-6" icon="mingcute:add-line" /></span>
            <div className="absolute w-full text-center child-r p-2 bottom-0">
            <span className="text-white text-lg font-semibold">Upload your reels</span>
            </div>
            </div>
        {reelsdata.map((reel)=>(
                <div key={reel.id} className="relative contain-r h-[20rem] group inline-block cursor-pointer h-[22rem] overflow-hidden">
                        <div key={reel.id} style={{backgroundImage:`url(${reel.story})`}} className=" group-hover:scale-105 transition-transform duration-300 inline-block cursor-pointer rounded-lg  w-56 h-[22rem]">
                        <img className="rounded-full  absolute ml-4 mt-4 w-11 h-11" src={reel.dp} alt='' />
                        <p className='block absolute child-r py-3 bottom-0 text-white opacity-0 w-48 truncate text-center '><span>{reel.name}</span></p>
                        </div>
                </div>
        ))}
        </div> 
    </div>
    </>
)
}

export default Reels
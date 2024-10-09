import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const DisplayPage = ()=>{
    return(
        <div className="w-full p-2 shadow-lg rounded-md">
        <div className="py-2 flex items-center justify-between">
<span className="font-semibold">Create Page</span>
        </div>
        <div style={{backgroundImage:'url(prof-bg.png)'}} className="flex bg-no-repeat from-page-start rounded-md to-page-end text-white h-44 flex items-center justify-center">
        <div className="w-2/3 px-4 flex flex-col gap-4">
         <p className="font-semibold"> Create Your thoughtful pages to engage with other active communities</p>
        <button className=" font-semibold flex gap-1 items-center bg-cta text-white rounded-lg w-max p-2"><Icon className="w-5 h-5" icon="bx:edit" />Create page</button>
        </div>
        </div>
        </div>
    )
    
}

export default DisplayPage;
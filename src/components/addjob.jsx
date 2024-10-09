import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Createjob = ()=>{
return(
    <div style={{backgroundImage:'url(job.jpg)'}} className="w-full h-72 shadow-lg flex flex-col items-center justify-center rounded-md">
    <div className="w-1/2 flex flex-col gap-4 items-center justify-center text-center">
        <div>
        </div>
        
        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white"><Icon className="text-cta w-8 h-8" icon="fluent:briefcase-search-20-regular" /></div>
        <div className="text-2xl font-semibold text-white">Post Job Openings</div>
        <span className="text-xs text-white">Create a new job post for hire a new talented from the pitnik</span>
        <button className="bg-cta text-white font-semibold text-lg p-2 w-1/2 rounded-md">Post Job</button>
    </div>
    </div>
)
}

export default Createjob;

import React from "react";

const Jobposting = ()=>{
    const data=[{
        id:1,
        jobname:'UX Designer',
        desc:'Need graphic desiger urgently from the Canada, ontario only.',
        company:'XYZ Tech',
        image:''
    },

    {
        id:2,
        jobname:'Data Analyst',
        desc:'Need graphic desiger urgently from the Canada, ontario only.',
        company:'ABC Technologies',
        image:''
    },]
return(
<div className="w-full px-4 py-2 bg-white shadow-lg">
<div className="w-full flex py-2 items-center justify-between"><span className="font-semibold">Job openings</span><span className="text-cta">Seeall</span></div>
{data.map((job)=>(
    <div key={job.id} className="w-full flex flex-col gap-2">
    <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100 justify-between">
        <div className="flex items-center gap-2 ">
            <img className="rounded-full w-9 h-9" src={job.image} alt='' />
            <div className="flex flex-col gap-1">
                <span className="font-semibold">{job.jobname}</span>
                <span className="text-sm text-gray-500">{job.company}</span>
            </div>
        </div>
        
        <button className="border-2 border-cta h-9 w-16 rounded-md text-cta hover:bg-cta hover:text-white font-semibold">Apply</button>
    </div>
    </div>
))}
</div>
    )
}

export default Jobposting;
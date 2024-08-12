import React from "react";

const Blogs = ()=>{
    const data = [{
        id:1,
        img:'np.jpg',
        desc:"moiras fade reaches much farther than you think moira's fade reaches much farther than you think."
    },
    {
        id:2,
        img:'np.jpg',
        desc:"moiras fade reaches much farther than you think moira's fade reaches much farther than you think."
    },]
    return(
        <div className="w-full flex flex-col py-2 bg-white gap-2 shadow-lg rounded-md px-4">
            <div className="flex items-center justify-between"><span className="text-md font-semibold">Recent Blogs</span><span className="text-sm text-cta">See all</span></div>
            {data.map((blog)=>(
            <div key={blog.id} className="w-full hover:bg-gray-100 py-2 cursor-pointer flex flex-col gap-1">
            <div className="flex py-1 items-center gap-4">
            <img className="rounded-md w-1/4 " src={blog.img} alt="" />
            <p className="w-auto text-sm">{blog.desc}</p>
        </div>
        </div>
            ))}
        </div>
    )
}

export default Blogs;
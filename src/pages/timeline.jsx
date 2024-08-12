import React from "react";
import Post from "../components/postcard";
import Navbar from "../components/navbar";
import Profileheader from "../components/profileheader";

const Timeline = ()=>{
return(
<div className="w-full flex flex-col items-center">
<Navbar />
<Profileheader />
<div className="w-5/6">
<Post />
</div>

</div>
    )
}

export default Timeline;
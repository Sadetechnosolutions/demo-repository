import React from "react";
import Createpost from "../components/createpost";
import Post from "../components/post";

const Home = ()=>{
    return(
        <div className="w-max-[30rem] w-full h-screen flex flex-col">
        <Createpost />
        <Post />
        </div>
    )
}

export default Home;
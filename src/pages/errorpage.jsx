import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = ()=>{
    const navigate = useNavigate();
    const backtohome = ()=>{
        navigate('/newsfeed');
    }
    return(
       <div className="min-h-screen flex items-center justify-center">
       <div className="flex flex-col items-center justify-center gap-12">
       <div className="flex flex-col items-center justify-center gap-8">
       <span className="text-6xl font-bold flex items-center"> Page Not Found </span>
       <img className="w-64 h-64" src="errorpage.jpg" alt="" />
       <span className="text-xl text-center"><span className="text-highlight font-semibold">Sorry!</span> we can't find the page you're looking for.</span>
       </div>
       <button onClick={backtohome} className="px-3 py-2 border w-max rounded-lg border-cta text-cta font-semibold hover:bg-cta hover:text-white">Back to Home</button>
       </div>
       </div>
    )
}

export default ErrorPage
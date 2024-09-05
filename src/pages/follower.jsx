import React,{useEffect,useState} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import data from '../followers.json'

const Followers = ()=>{
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      // Simulate loading delay
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 500); // Adjust the delay time as needed (in milliseconds)
  
      return () => clearTimeout(timer);
    }, []);
  
    // If not loaded yet, return a loading indicator or null
    if (!loaded) {
      return <div></div>; // You can customize this loading indicator
    }
    return(
        <div className={`w-full flex items-center justify-center `}>
            <div className="w-5/6 shadow-lg flex p-2 flex-col gap-4">
            <div className="flex gap-2 text-lg font-semibold px-8">
            <p>Followers</p><span>(51)</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {data.map((followers)=>(
            <div key={followers.id} className="flex w-[48rem] shadow-md justify-between py-2 px-8 items-center">
            <div className="flex items-center gap-2">
            <img className="w-16 h-16 rounded-full" src={followers.img}/>
            <p className="text-lg w-24 truncate">{followers.name}</p>
            <span></span>
            </div>
            <span> {followers.work} </span>
            <span>{followers.mutual} Mutuals</span>
            <button className="p-2 flex ga hover:bg-cta hover:text-white items-center border rounded-md border-cta text-cta font-semibold"><Icon icon="ic:baseline-add" />Follow</button>
            </div>
                ))}
            </div>
            </div>
        </div>  
    )
}

export default Followers;
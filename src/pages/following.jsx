import React,{useEffect,useState} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import data from '../following.json'
import { unFollow } from "../slices/followingslice";
import { useSelector,useDispatch } from "react-redux";

const Following = ()=>{
  const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const {Following} = useSelector(state=>state.following)


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
            <p>Following</p><span>(44)</span>
            </div>
            <div  className="flex flex-wrap gap-2">
            {Following.map((Following)=>(

            <div key={Following.id} className="flex w-[48rem] shadow-md justify-between py-2 px-8 items-center">
            <div className="flex items-center gap-2">
            <img className="w-16 h-16 rounded-full" src={Following.img}/>
            <p className="text-lg w-24 truncate">{Following.name}</p>
            <span></span>
            </div>
            <span> {Following.work} </span>
            <span>{Following.mutual} Mutuals</span>
            <button onClick={()=>dispatch(unFollow(Following.id))} className="p-2 flex bg-cta text-white items-center gap-2 border rounded-md border-cta hover:bg-white hover:text-cta font-semibold"><Icon icon="mingcute:user-follow-fill" />Following</button>
            </div>

            ))}
            </div>
            </div>

            
        </div>  
)
}

export default Following;











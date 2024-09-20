import React,{useEffect,useState} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import data from '../following.json'
import { unFollow } from "../slices/followingslice";
import { useParams } from "react-router";
import { useSelector,useDispatch } from "react-redux";

const Following = ()=>{
  const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch()
    const {Following} = useSelector(state=>state.following)
    const {userID} = useParams()
    const userId = useSelector((state)=>state.auth.userId)
    const [following,setFollowing] = useState()

    const fetchFollowing = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const response = await fetch(`http://localhost:8080/follows/api/following/${userID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFollowing(data);
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
useEffect(()=>{
fetchFollowing()
},[userID,userId])
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
    const unfollowUser = async (followId)=>{
      const token = localStorage.getItem('token')
      try{
        const response = await fetch(`http://localhost:8080/follows/unfollow/${userId}/${followId}`,{
          method:'DELETE',
          headers:{
            'Authorization':`bearer${token}`
          }
        })
        if(response.ok){
          console.log('')
          fetchFollowing()
        }
        else{
          console.log('error in posting data')
        }
      }
      catch(error){
        console.error(error)
      }
    }
    return(
        <div className={`w-full flex items-center justify-center `}>
            <div className="w-5/6 shadow-lg flex p-2 flex-col gap-4">
            <div className="flex gap-2 text-lg font-semibold px-8">
            <p>Following</p><span>{following?.count}</span>
            </div>
            <div  className="flex flex-wrap gap-2">
            {following?.users.map((Following)=>(
            <div key={Following.id} className="flex w-[48rem] shadow-md justify-between py-2 px-8 items-center">
            <div className="flex items-center gap-2">
            <img className="w-16 h-16 rounded-full" src={`http://localhost:8086${Following.profileImagePath}`}/>
            <p className="text-lg w-24 truncate">{Following.name}</p>
            </div>
            <span> {Following.work} </span>
            <span>{Following.mutual} Mutuals</span>
            <button onClick={()=>{unfollowUser(Following.id)}} className="p-2 flex bg-cta text-white items-center gap-2 border rounded-md border-cta hover:bg-white hover:text-cta font-semibold"><Icon icon="mingcute:user-follow-fill" />Following</button>
            </div>
            ))}
            </div>
            </div>       
        </div>  
)
}

export default Following;











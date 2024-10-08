import React,{useCallback, useEffect,useState} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Followers = ()=>{
  const {userID} = useParams()
  const userId = useSelector((state)=>state.auth.userId)
    const [loaded, setLoaded] = useState(false);
    const [followers,setFollowers] = useState()
    
    const fetchFollowers = useCallback(async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const response = await fetch(`http://localhost:8080/follows/api/followers/${userID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFollowers(data);
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },[userID]);
useEffect(()=>{
fetchFollowers()
},[fetchFollowers])

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
            <p>Followers</p><span>{followers?.count}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {followers?.users.map((followers)=>(
            <div key={followers.id} className="flex w-[48rem] shadow-md justify-between py-2 px-8 items-center">
            <div className="flex items-center gap-2">
            <img className="w-16 h-16 bg-gray-300 rounded-full" src={`http://localhost:8086${followers.profileImagePath}`} alt={`http://localhost:8086${followers.profileImagePath}`}/>
            <p className="text-lg w-24 truncate">{followers.name}</p>
            </div>
            <span> {followers.work} </span>
            {followers.id !== userId ? <span>{followers.mutual} Mutuals</span> : null}
          {followers.id !== userId ?  <button className="p-2 flex ga hover:bg-cta hover:text-white items-center border rounded-md border-cta text-cta font-semibold"><Icon icon="ic:baseline-add" />Follow</button> : null}
            </div>
                ))}
            </div>
            </div>
        </div>  
    )
}

export default Followers;
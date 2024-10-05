import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from 'react-router-dom';

const DisplayReels = () => {
 const navigate = useNavigate()
  const { userID } = useParams();
  const [option,setOption] = useState(false);
  const userId = useSelector((state)=>state.auth.userId)
  const [reels, setReels] = useState([]);
  const [selectedReel, setSelectedReel] = useState(null);
  const [users,setUsers] = useState();

const handleOption = ()=>{
  setOption(!option)
}

  const fetchReels = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8080/reels/getAll/reel', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setReels(data);
          // Find the selected reel based on userID
          const reel = data.find(r => r.id == userID);
          setSelectedReel(reel);
        } else {
          console.error("Expected an array but got:", data);
        }
      } else {
        console.error('Failed to fetch reels:', response.status);
      }
    } catch (error) {
      console.error('Error fetching reels:', error);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/auth/users/descending');
      const usersData = response.data?.map(user => ({
        id: user.id,
        UserName: user.name,
      }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const DeleteReels = async () => {
    const token = localStorage.getItem('token'); // Fixed typo
    try {
      const response = await fetch(`http://localhost:8080/reels//deleteReel/${userId}/${userID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Added space after "bearer"
        }
      });
      if (response.ok) {
        navigate('/newsfeed')
      } else {
        console.error('Failed to fetch stories:', response.status);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };
  return (
    <div>
      {selectedReel ? (
        <div className="min-h-screen flex">
          <div className="w-1/2 bg-black min-screen">
            <ReactPlayer
              url={`http://localhost:8086${selectedReel.content}`}
              controls={true}
              playing={true}
              loop={true}
              width='100%' // Adjust width as needed
              height='100%'
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2 min-screen p-2">
          {users?.map((user)=>user.id == selectedReel.userId ?
          <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <img className="border w-9 h-9 rounded-full bg-gray-400" src={`http://localhost:8086${selectedReel.profileImagePath}`} alt="" />
                    <p className="font-semibold ">{user.UserName}</p>
                  </div>{selectedReel.userId === userId && <span className="flex flex-col"><Icon onClick={handleOption}  icon="iconamoon:menu-kebab-vertical-bold" />
 
                  </span>}</div> : null  
        )}
                         {option &&(
                    <div className="absolute right-4 flex flex-col">
                      <span className="flex gap-1 cursor-pointer items-center"><Icon icon="mdi:edit-outline" /> Edit</span>
                      <span className="flex gap-1 cursor-pointer hover:text-red items-center" onClick={DeleteReels}><Icon icon="mdi:delete-outline" />Delete</span>
                    </div>
                  )}

            <p>{selectedReel.caption}</p>
            <div className="flex gap-4 items-center"> 
       <Icon
        className={`cursor-pointer h-7 w-7 text-gray-600 like-animate`}
        icon={ "material-symbols-light:favorite-outline"}
        width='1.2em'
        height='1.2em'
      />
      <Icon className="cursor-pointer h-6 w-6 text-gray-600" icon="iconamoon:comment-light" />
    </div>
          </div>
        </div>
      ) : (
        <p>no reel available</p>
      )}
    </div>
  );
};

export default DisplayReels;

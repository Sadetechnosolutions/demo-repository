import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";

import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from 'react-router-dom';

const Displayphoto = () => {
 const navigate = useNavigate()
  const { userID } = useParams();
  const { postID } = useParams();
  const [option,setOption] = useState(false);
  const userId = useSelector((state)=>state.auth.userId)
  const [photo, setPhoto] = useState([]);


const handleOption = ()=>{
  setOption(!option)
} 

  const fetchPosts = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/posts/${postID}` , {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setPhoto(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      } else {
        console.error('Failed to fetch reels:', response.status);
      }
    } catch (error) {
      console.error('Error fetching reels:', error);
    }
  },[postID]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8081/api/auth/users/descending');
  //     const usersData = response.data?.map(user => ({
  //       id: user.id,
  //       UserName: user.name,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

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
        <div className=" w-full gap-2 flex">
            <div className="w-1/2">
          {photo.postType === 'IMAGE' ? (
            <img className='w-full' src={`http://localhost:8086${photo.imageUrl}`} alt={`http://localhost:8086${photo.imageUrl}`} />
          ) : photo.postType === 'VIDEO' ? (
            <video className='w-full h-screen bg-black' controls>
              <source src={`http://localhost:8086${photo.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
</div>
<div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <img className="border w-9 h-9 rounded-full bg-gray-400" src={`http://localhost:8086${photo.profileImagePath}`} alt={`http://localhost:8086${photo.profileImagePath}`}  />
                    <p className="font-semibold ">{photo.name}</p>
                  </div>{photo.userId === userId && <span className="flex flex-col"><Icon onClick={handleOption}  icon="iconamoon:menu-kebab-vertical-bold" />
 
                  </span>}</div>
                         {option &&(
                    <div className="absolute right-4 flex flex-col">
                      <span className="flex gap-1 cursor-pointer items-center"><Icon icon="mdi:edit-outline" /> Edit</span>
                      <span className="flex gap-1 cursor-pointer hover:text-red items-center" onClick={DeleteReels}><Icon icon="mdi:delete-outline" />Delete</span>
                    </div>
                  )}

            <p>{photo.description}</p>
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
    </div>
  );
};

export default Displayphoto;

import React, { useState, useEffect, useCallback } from "react";
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
  const [selectedReel, setSelectedReel] = useState(null);
  const [users,setUsers] = useState();
  const [liked,setLiked] = useState();
  const [like,setLike] = useState(false);
  const [likeCount,setLikeCount] = useState();
  const [animationPostId,setAnimationPostId] = useState();
  const [userData,setUserData] = useState();

const handleOption = ()=>{
  setOption(!option)
}
const fetchLikes = useCallback(async (postId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    const response = await fetch(`http://localhost:8080/likes/post/${postId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Check if the logged-in user is in the list of users who liked the post
      const userHasLiked = data.some(like => like.userId === userId);
      setLike(prev => ({
        ...prev,
        [postId]: userHasLiked
      }));
      console.log(liked)
    } else {
      console.error('Failed to fetch likes:', response.status);
    }
  } catch (error) {
    console.error('Error fetching likes:', error);
  }
},[userId,liked]);

const likesCount = async (postId) => {
  try {
    const response = await fetch(`http://localhost:8080/likes/post/${postId}/count`);
    if (response.ok) {
      const data = await response.json();
      setLikeCount(prevCounts => ({
        ...prevCounts,
        [postId]: data 
      }));
    }
  } catch (error) {
    console.error('Error fetching like count:', error);
  }
};

const userIDObject = userID;
const userIdValue = parseInt(userIDObject.userID, 10);
const fetchUserData =  useCallback(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    // Convert userID to an integer and validate
    // Make the API request with the integer userID

    const response = await fetch(`http://localhost:8080/posts/user/${userIdValue}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
    } else {
      const errorText = await response.text();
      console.error('Failed to fetch user data:', response.status, errorText);
    }
  } catch (error) {
    console.error('Error fetching user data:', userID);
  }
},[userID,userIdValue]);

useEffect(() => {
  fetchUserData();
}, [fetchUserData]);

useEffect(() => {
  if (userData.length > 0) {
    userData.forEach(post => {
      if (post.postId) {
        fetchLikes(post.postId); // Fetch likes for each post
        likesCount(post.postId); // Fetch like counts for each post
      }
    });
  }
}, [fetchLikes,userData]);

const handleLike = async (reelsId) => {
  try {
    const response = await fetch(`http://localhost:8080/likes/toggle-reels?postId=${reelsId}&userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setLiked(prev => ({
        ...prev,
        [reelsId]: !prev[reelsId]
      }));
      setAnimationPostId(reelsId);
      // Re-fetch like count or update locally
      const countResponse = await fetch(`http://localhost:8080/likes/post/${reelsId}/count`);
      const countData = await countResponse.json();
      setLikeCount(prev => ({
        ...prev,
        [reelsId]: countData
      }));
      setTimeout(() => setAnimationPostId(null), 300); // Reset animation class
    } else {
      console.log('An error occurred. Please try again later.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  const fetchReels = useCallback(async () => {
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
          // Find the selected reel based on userID
          const reel = data.find(r => r.id === parseInt(userID));
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
  },[userID]);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  
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
          {users?.map((user)=>user.id === selectedReel.userId ?
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
            <div className='flex items-center'>
          <Icon
            onClick={() => handleLike(selectedReel.postId)}
            className={`cursor-pointer h-7 w-7 ${like[selectedReel.postId] ? 'text-pink' : 'text-gray-700'} ${animationPostId === selectedReel.postId ? 'like-animate' : ''}`}
            icon={like[selectedReel.postId] ? "material-symbols-light:favorite" : "material-symbols-light:favorite-outline"}
            width='1.2em'
            height='1.2em'
          /> {likeCount[selectedReel.postId] || 0}</div>
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

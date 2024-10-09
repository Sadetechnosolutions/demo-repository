import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import axios from 'axios';

const Suggestfriends = () => {

  const navigate = useNavigate(); // Initialize useNavigate
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/auth/users/descending');
      const usersData = response.data.map(user => ({
        id: user.id,
        UserName: user.name,
      }))
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFriend = (id) => {
    // Navigate to user details page with the user ID
    navigate(`/user/${id}`);
  };


  return (
    <div className='w-full px-4 py-3 rounded-md bg-white flex flex-col gap-3 shadow-lg'>
      <div className='flex justify-between'>
        <span className='font-semibold'>Who's following you</span>
        <span className="text-cta">See All</span>
      </div>
      <hr />
      <div className='flex flex-col gap-4'>
        {users.map(user => (
          <div key={user.id} className='flex ease-in-ease-out cursor-pointer duration-500 items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img className='rounded-full w-8 h-8' src='' alt='' /> {/* Update with user profile picture if available */}
              <span className='w-32 truncate'>{user.UserName}</span>
            </div>
            <button
              className='bg-cta p-2 text-sm text-white font-semibold rounded-md'
              onClick={() => handleFriend(user.id)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestfriends;

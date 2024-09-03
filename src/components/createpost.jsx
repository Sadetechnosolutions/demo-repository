import React, { useState,useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { selectPost } from '../slices/postslice';
import { useDispatch, useSelector } from 'react-redux';
import InputEmoji from 'react-input-emoji';
import MapSelector from './mapselector';
import moment from 'moment';
import axios from 'axios';


const Createpost = () => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.post);
  const [file, setFile] = useState(null);
  const [postType, setPostType] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [user,setUser] = useState()

  const [description,setDescription] = useState('')
  const userId = useSelector((state) => state.auth.userId);
  const img = <Icon className='w-6 h-6' icon="ph:image" />;
  const video = <Icon className='w-6 h-6' icon="bx:video" />;
  const files = <Icon className='w-6 h-6' icon="ic:baseline-attach-file" />;
  const reels = <Icon className='w-6 h-6' icon="icon-park-outline:video-two" />;
  
  const icons = [
    {
      id: 1,
      icon: img,
      allowed: 'image/*',
      type: 'IMAGE',  // Use a human-readable type
    },
    {
      id: 2,
      icon: video,
      allowed: 'video/*',
      type: 'VIDEO',  // Use a human-readable type
    },
    {
      id: 3,
      icon: reels,
      allowed: 'video/*',
      type: 'REELS',  // Use a human-readable type
    },
    {
      id: 4,
      icon: files,
      allowed: '',
      type: 'FILE',  // Generic file type
    },
  ];

  const handleImageChange = (event, type) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const selectedData = {
          url: reader.result,
          type: selectedFile.type,
        };
        dispatch(selectPost(selectedData)); // Dispatch action with the selected file data
        setFile(selectedFile); // Store the file object
        setPostType(type); // Set postType based on the selected type
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL
    }
  };

  const renderMedia = () => {
    if (!selected) return null;
    if (selected.type && selected.type.startsWith('image')) {
      return <img className='w-36 h-32' src={selected.url} alt='Selected Image' />;
    } else if (selected.type && selected.type.startsWith('video')) {
      return <video className='w-36 h-32' controls><source src={selected.url} type={selected.type} /></video>;
    }
    return null;
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setShowMap(false); // Close the map after selecting the location
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalPostType = file ? postType : 'TEXT';
    // Create a FormData object for the file uploads and form data
    const formDataObj = new FormData();

    // Append userId and postType to FormData
    formDataObj.append('userId', userId);
    formDataObj.append('postType', finalPostType);

    // Append the selected file with the correct key
    if (file) {
      if (postType === 'IMAGE') {
        formDataObj.append('imageFile', file); // Append image file
      } else if (postType === 'VIDEO') {
        formDataObj.append('videoFile', file); // Append video file
      }
      // Add other conditions if needed
    }
    if (description) {
      formDataObj.append('description', description); // Append description to FormData
    }
    // Append location if selected
    if (selectedLocation) {
      formDataObj.append('location', JSON.stringify(selectedLocation)); // Convert location object to JSON string
    }

    // Log the FormData object for debugging
    for (let [key, value] of formDataObj.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        setFile(null);
        setPostType('');
        setDescription('');
        setSelectedLocation(null);
        dispatch(selectPost(null));
        const data = await response.json();
        console.log('API Response Data:', data); // Log the response for debugging
      } else {
        // Log detailed error message
        const errorText = await response.text();
        console.error('Error:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
        method: 'GET',
        headers: {
    
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>; // Show loading state while fetching
  }

  return (
    <form onSubmit={handleSubmit} className='w-full bg-white rounded-md px-6 py-3 flex gap-2 flex-col shadow-lg'>
      <p className='font-semibold py-2'>Create post</p>

      <div className='w-full flex gap-2'>
      <img className='w-9 h-9 rounded-full' src={`http://localhost:8082/${user.profileImagePath}`} alt='' />
      <InputEmoji
        value={description}
        onChange={setDescription} // Update description state
        placeholder='what’s on your mind'
      />
    </div>

      <div>{renderMedia()}</div>
      <div className='flex gap-3'>
        <Icon
          className='w-6 h-6 cursor-pointer'
          icon="carbon:location"
          onClick={() => setShowMap(true)}
        />
        {icons.map((item) => (
          <div className='relative cursor-pointer' key={item.id}>
            <label className='flex cursor-pointer'>
              {item.icon}
              <input
                type='file'
                onChange={(e) => handleImageChange(e, item.type)} // Pass the type here
                accept={item.allowed}
                className='opacity-0 w-0 h-0 bg-black'
              />
            </label>
          </div>
        ))}
      </div>
      {showMap && (
        <MapSelector
          onSelectLocation={handleSelectLocation}
          onClose={() => setShowMap(false)}
        />
      )}
      <button type='submit' className='bg-cta p-2 cursor-pointer text-white text-md font-semibold rounded-md'>
        Post
      </button>
    </form>
  );
};

export default Createpost;

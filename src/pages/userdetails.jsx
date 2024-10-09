import React, { useState, useEffect, useCallback } from 'react';
import Editprofile from './editprofile';
import Personalinfo from './Personal info';
import Modal from 'react-modal';
import {Tooltip } from 'react-tooltip';
import Videocomp from '../components/videocomp';
import Photoscomp from '../components/photoscomp';
import Friendscomp from '../components/friendscomp';
import { useSelector } from 'react-redux';
import Link from 'antd/es/typography/Link';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [editprofile, showEditprofile] = useState(false);
  const [editPersonal,showEditpersonal] = useState(false);

  const navigate = useNavigate()
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const userId = useSelector((state) => state.auth.userId);
  const { userID } = useParams(); // Get userId from URL params
  const [user, setUser] = useState(null);




  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userID}`, {
        method: 'GET',
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  },[userID]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  if (!user) {
    return <p>Loading...</p>; // Show loading state while fetching
  }
  const openPhotos = ()=>{
    navigate('/photos',window.scrollTo(0, 0))
  }
  const openEditprofile = () => {
    showEditprofile(true);
  };

  const closeEditprofile = () => {
    showEditprofile(false);
  };

  const openEditpersonal = ()=>{
    showEditpersonal(true);
  }

  const closeEditpersonal = ()=>{
    showEditpersonal(false);
  }

  const social = {
    media:[{
      id:1,
      icon:<Icon icon="mage:facebook" width="1.2em" height="1.2em" />,
      // link:user.socialMediaLinks.facebook 
    },
  {
    id:2,
    icon:<Icon icon="prime:twitter" width="1.2em" height="1em" />,
    // link:user.socialMediaLinks.twitter
  },
{
  id:3,
  icon:<Icon icon="ri:instagram-fill" width="1.2em" height="1.2em" />,
  // link:user.socialMediaLinks.instagram
},
{
id:4,
icon:<Icon icon="mdi:youtube" width="1.2em" height="1.2em" />,
// link:user.socialMediaLinks.youtube
}]
  }
  return (
    <div className='flex flex-col items-center'>
    <div className='md:flex w-5/6 sm:flex xs:flex-col gap-4 justify-center'>
  <div className='flex py-4 px-6  shadow-lg  rounded-md h-[860px] sm:w-1/3 flex-col'>
    <div className='flex gap-2 items-center justify-between py-4 border-b border-gray-170 '>
      <span className='font-semibold text-lg'>Personal Info</span>
      {parseInt(userID) === userId &&       <span data-tooltip-id="my-tooltip" data-tooltip-content="Edit Personal info" className='flex cursor-pointer gap-2'><Icon onClick={openEditprofile} icon="bx:edit" width="1.3em" height="1.3em" style={{color:'gray'}} /></span>}
    </div>
    <Modal style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-50%, -50%)',
          width: '100%', // Adjust width as needed
          height: '100%', // Limit height to 80% of viewport height
          overflowY: 'auto',
          border:'none'
        },}}
 isOpen={editprofile} onRequestClose={closeEditprofile}>
    <Editprofile close={closeEditprofile} />
    </Modal>
    <div>
        <div className='flex flex-col text-sm cursor-pointer justify-between gap-6 py-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="ic:round-person" width="1.2em" height="1.2em"  /> <span>About Me:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className='text-sm cursor-pointer'>{user.aboutMe}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="heroicons:cake-16-solid" width="1.2em" height="1.2em" /> <span>Birthday:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className='text-sm cursor-pointer'>{formatDate(user.birthday)}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="solar:phone-bold" width="1.2em" height="1.2em"  /> <span>Phone Number:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className='text-sm cursor-pointer '>{user.phno}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="fontisto:blood-drop" width="1em" height="1em" /> <span>Blood Group:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer'>{user.bloodGroup}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="el:person" width="1.2em" height="1.2em" /> <span>Gender:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer'>{user.gender}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="entypo:globe" width="1em" height="1em" /> <span>Country:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer'>{user.country}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="ion:briefcase" width="1.2em" height="1.2em"  /> <span>Occupation:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer '>{user.occupation}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="fa6-solid:handshake" width="1.2em" height="1.2em" /> <span>Joined:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer '>{formatDate(user.joined)}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="ic:round-email" width="1.2em" height="1.2em" /> <span>Email:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer text-cta'>{user.email}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }} className='flex xs:flex-col w-2/3 text-sm flex-col overflow-auto overflow-x-hidden h-[860px] gap-8'>
  <div className='flex  px-6 drop py-4  shadow-lg rounded-md h-auto bg-white flex-col'>
  <div className='flex gap-2 items-center= justify-between py-4 border-b border-gray-170 '>
      <span className='font-semibold  text-lg'>General Info</span>
      {parseInt(userID) === userId && <span data-tooltip-id='my-tooltip' data-tooltip-content='Edit General info' onClick={openEditpersonal} className='flex cursor-pointer gap-2'><Icon icon="bx:edit" width="1.6em" height="1.6em" style={{color:'gray'}} /></span>}
    </div>
    <Modal style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-50%, -50%)',
          width: '100%', // Adjust width as needed
          height: '100%', // Limit height to 80% of viewport height
          overflowY: 'auto',
          border:'none'
        },}}
 isOpen={editPersonal} onRequestClose={closeEditpersonal}>
    <  Personalinfo close={closeEditpersonal} />
    </Modal>
    <div className='flex  py-6 gap-8'>
      <div className='sm:flex xs:flex-col w-[800px]'>
      <div className='flex flex-col gap-8 w-1/2'>
          <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="tabler:puzzle-filled" width="1.2em" height="1.2em" /><span>Hobbies</span>
          </div>
          <div className='flex flex-col'>
            <div className=' text-md '>
              <span className=' cursor-pointer'>{user.hobbies}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="fluent:calendar-work-week-28-filled" width="1.2em" height="1.2em"/> <span>Interests</span>
          </div>
          <div className='flex w-full flex-col'>
            <div className='w-full flex-wrap flex gap-4 text-md '>
            {user.interests?.map((interest) => (
      <div key={interest.id} className='flex  px-2 py-1 w-auto justify-center items-center rounded-md border border-cta cursor-pointer text-cta'>
        {interest.activity}
      </div>
    ))}
            </div>
          </div>
        </div>
        </div>
        <div className='flex w-1/2 flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="zondicons:education" width="1.2em" height="1.2em" /> <span>Education</span>
          </div>
          <div className='flex flex-col'>
            <div className=' text-md '>
              <span className=' cursor-pointer'>{user.education}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="ic:round-email" width="1.2em" height="1.2em" /> <span>Work Experience</span>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col text-md gap-6 '>
            {user && user.workExperience && user.workExperience.length > 0 ? (
  user.workExperience.map((profession) => (
    <div key={profession.id} className='flex flex-col'>
      <span className='text-cta cursor-pointer'>{profession.work}</span>
      <span>{profession.experience}</span>
    </div>
  ))
) : (
  <div>No work experience available</div>
)}
            </div>
          </div>
        </div>
        </div>
        </div>
    </div>
   <div className='flex items-start gap-8'>
   <div className='flex w-[800px] flex-col gap-4 '>
    <div className='flex gap-2 items-center'>
   <Icon icon="teenyicons:share-solid" width="1em" height="1em" /><span className='font-semibold'>Social Media</span>
   </div>
   <div className='flex gap-4'>
{social.media.map((socialmedia)=>(
<Link to={socialmedia.link}><div className='bg-gray-200 p-2 hover:bg-cta hover:text-white cursor-pointer items-center duration-500 ease-in-ease-out rounded-full'>{socialmedia.icon}</div></Link>
)
)}
   </div>
   </div>
   </div>
  </div>
  <Friendscomp userID={userID} />
  <Photoscomp seeallPhotos={openPhotos}/>
  <Videocomp />
  </div>
  <Tooltip id="my-tooltip "  />
</div>
</div>
  );
};

export default UserDetails;

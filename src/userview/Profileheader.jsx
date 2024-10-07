import React,{useState,useEffect, useCallback} from 'react'
import { Link, NavLink,useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector,useDispatch } from 'react-redux';
import { changePhoto } from '../slices/photoslice';
import { updatePhoto,changecoverPhoto,updateCover } from '../slices/photoslice';
import { IoClose } from 'react-icons/io5'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';


const ProfileheaderUser = () => {
  const [imageForm,setImageForm] = useState(false);
  const [coverForm,setCoverForm] = useState(false);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const {selectedprofilepic} = useSelector((state)=>state.photo)
  const {profilepic} = useSelector((state)=>state.photo)
  const {selectedcoverpic} = useSelector((state)=>state.photo)
  const {coverpic} = useSelector((state)=>state.photo)
  const userId = useSelector((state) => state.auth.userId);
  const { userID } = useParams(); // Get userId from URL params
  const [user, setUser] = useState(null);
  const [isFollowed,setIsFollowed] = useState(false);
  const [followers,setFollowers] = useState();
  const [following,setFollowing] = useState();
  const [isFollowing,setisFollowing] = useState()
  const [sentrequest,setSentRequest] = useState()
  const [isRequested,setIsRequested] = useState()
  const [friends,setFriends] = useState()
  const [isFriends,setIsFriends] = useState()
  const [options,setOptions] = useState(false)

  const handleOptions = ()=>{
    setOptions(!options)
  }

  const closeOptions = ()=>{
    setOptions(false)
  }

  const openImageForm = ()=>{
    setImageForm(true);
  }
  const openCoverForm = ()=>{
    setCoverForm(true);
  }

  const closeImageForm =()=>{
    setImageForm(false)
  }

  const closeCoverForm =()=>{
    setCoverForm(false)
  }
  
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(changePhoto(reader.result)); 
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile); 
    }
  };

  const cancelImage = () => {
    dispatch(changePhoto(profilepic));
    closeImageForm();
  };

  const cancelCover = ()=>{
    dispatch(changecoverPhoto(coverpic));
    closeCoverForm();
  }

  const handleButtonClick = () => {
   dispatch(updatePhoto(selectedprofilepic));
  };

  const handleupdateCover = ()=>{
    dispatch(updateCover(selectedcoverpic));
    console.log(coverpic)
  }

    const location = useLocation();
    const isActive = (path) => {
      return location.pathname === path;
    };
    const personal = {
        profile: [
          { id: 1,name:'Peter Parker',img:'profile.jpg',posts:64,following:44,followers:51,photos:4,videos:3,aboutme:`Hi, I’m Peter Parker, I’m 36 and I work as a Professional Cinematographer from Ontario, Canada, my proclaimed works are “dewwater” and "Sunbeast"`,birthday:'December 17, 1985', phno: '+1-989-232435234', bloodgroup: 'B+',gender:'Male',country:'San Francisco, US',occupation:'Cinematographer',joined:'December 20,2021', email:'peterparker07@design.com' },
        ]
      }
      const isCurrentUser = parseInt(userID) === userId;
    const menu = [
        {id:1,
        name:'Profile',
        path:`/user/${userID}`},
        {id:2,
        name:'Timeline',
        path:`/timelineview/${userID}`},
        {id:3,
        name:'Friends',
        path:`/friendsview/${userID}`},
        {id:4,
        name:'Photos',
        path:`/photosview/${userID}`},
        {id:5,
        name:'Videos',
        path:`/videosview/${userID}`},
        ]

        const handlechangeCover = (event)=>{
          const selectedFile = event.target.files[0];
          if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
              dispatch(changecoverPhoto(reader.result)); 
              setFile(selectedFile); 
            };
            reader.readAsDataURL(selectedFile);
          }
        }
        const fetchUserDetails = useCallback(async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/users/${userID}`, {
              method: 'GET',
              headers: {
          
              },
            });
            setUser(response.data);
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        },[userID]);

        const handleFollowStatus = useCallback( (data) => {
          // Assuming data has a list of followers
          setIsFollowed(data.users.some((follower) => follower.id === userId));
        },[userId]);

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
              // Check if the user is followed
              handleFollowStatus(data); 
            } else {
              console.error('Failed to fetch user data:', response.status);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        },[userID,handleFollowStatus]);


const fetchFollowing = useCallback(async () => {
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
    // Check if the user is followed
    setisFollowing(data.users.some((follower) => follower.id === userId));
  } else {
    console.error('Failed to fetch user data:', response.status);
  }
} catch (error) {
  console.error('Error fetching user data:', error);
}
},[userId,userID]);

const fetchRequest = useCallback (async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    const response = await fetch(`http://localhost:8080/friend-requests/${userId}/sent-requests`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      setSentRequest(data);
      // Check if the user is followed
      setIsRequested(data.sentRequests.find((follower) => follower.recipientId === parseInt(userID)));
    } else {
      console.error('Failed to fetch user data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
  },[userID,userId]);

  const fetchfriends = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await fetch(`http://localhost:8080/friend-requests/${isCurrentUser ? userId:userID}/friends`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setFriends(data);
        // Check if the user is followed
        setIsFriends(data.friends.find((follower) => follower.id === userId));
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    },[isCurrentUser,userId,userID]);
    useEffect(()=>{
      fetchFollowers()
      fetchFollowing()
      fetchRequest()
      fetchfriends()
      },[fetchFollowers,fetchFollowing,fetchRequest,fetchfriends])
      
        const followUser = async ()=>{
          const token = localStorage.getItem('token')
          try{
            const response = await fetch(`http://localhost:8080/follows/follow/${userId}/${userID}`,{
              method:'POST',
              headers:{
                'Authorization':`bearer${token}`
              }
            })
            if(response.ok){
              console.log('')
              fetchFollowers()
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

        
        const sendRequest = async ()=>{
          const token = localStorage.getItem('token')
          const payload={
            senderId:userId,
            recipientId:userID
          }
          try{
            const response = await fetch(`http://localhost:8080/friend-requests/send?senderId=${userId}&recipientId=${userID}`,{
              method:'POST',
              headers:{
                'Authorization':`bearer${token}`
              },
              body:JSON.stringify(payload)
            })
            if(response.ok){
              console.log('')
              fetchRequest()
            }
            else{
              console.log('error in posting data')
            }
          }
          catch(error){
            console.error(error)
          }
        }

        const cancelRequest = async ()=>{
          const token = localStorage.getItem('token')
          const payload={
            senderId:userId,
            recipientId:userID
          }
          try{
            const response = await fetch(`http://localhost:8080/friend-requests/decline?senderId=${userId}&recipientId=${userID}`,{
              method:'POST',
              headers:{
                'Authorization':`bearer${token}`
              },
              body:JSON.stringify(payload)
            })
            if(response.ok){
              console.log('')
              fetchRequest()
            }
            else{
              console.log('error in posting data')
            }
          }
          catch(error){
            console.error(error)
          }
        }

        const unfollowUser = async ()=>{
          const token = localStorage.getItem('token')
          try{
            const response = await fetch(`http://localhost:8080/follows/unfollow/${userId}/${userID}`,{
              method:'DELETE',
              headers:{
                'Authorization':`bearer${token}`
              }
            })
            if(response.ok){
              console.log('')
              fetchFollowers()
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

        useEffect(() => {
          fetchUserDetails();
        }, [fetchUserDetails]);

        if (!user) {
          return <p>Loading...</p>;
        }

    const unFriend = async (unfriendId)=>{
      const token = localStorage.getItem('token')
  
      try{
        const response = await fetch(`http://localhost:8080/friend-requests/delete-friend/${userId}/${unfriendId}`,{
          method:'DELETE',
          headers:{
            'Authorization':`bearer${token}`
          },
        
        })
        if(response.ok){
          console.log('')
          fetchfriends()
          closeOptions()
        }
        else{
          console.log('error in posting data')
        }
      }
      catch(error){
        console.error(error)
      }
    }
    
  return (
    <div>
    <Modal  appElement={document.getElementById('root')}
style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      backgroundColor:'transparent',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '60%',
      overflowY: 'auto',
      border:'none'
    },}}
    isOpen={imageForm} onRequestClose={closeImageForm}>
  <div className='bg-white h-96 ml-72 w-1/2 flex rounded-lg shadow-lg flex-col items-center gap-4'>
  <div className='flex mt-4 px-4 w-full items-center justify-between'><p className='text-lg font-semibold'>Change Profile picture</p><div onClick={closeImageForm} className='p-1 cursor-pointer hover:bg-red hover:text-white rounded-full bg-gray-100'><IoClose className='w-5 h-5' /></div></div>
  <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
    <div className='flex cursor-pointer justify-center items-center gap-8'>
<img className='h-28 w-28 rounded-full' src={selectedprofilepic} alt=''/><label className="relative cursor-pointer rounded-md px-3 py-2  border border-cta text-white bg-cta border">
<button className='cursor-pointer text-sm'>Upload an Image</button>
<input type="file" accept='image/*' onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
</label></div>
<div className='flex gap-4'>
<button onClick={cancelImage} className='p-2 border border-gray-300 hover:border-none hover:bg-gray-100 rounded-md'>Cancel</button>
<button className='p-2 hover:bg-cta text-cta hover:text-white rounded-md border border-cta' onClick={()=>{handleButtonClick();closeImageForm()}}>Submit</button>
</div>
</div>
</div>
</Modal>
<Modal  appElement={document.getElementById('root')}
style={{
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      backgroundColor:'transparent',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      height: '60%',
      overflowY: 'auto',
      border:'none'
    },}}
    isOpen={coverForm} onRequestClose={closeCoverForm}>
  <div className='bg-white h-96 ml-72 w-1/2 flex rounded-lg shadow-lg flex-col items-center gap-4'>
  <div className='flex mt-4 px-4 w-full items-center justify-between'><p className='text-lg font-semibold'>Change Cover picture</p><div onClick={closeCoverForm} className='p-1 cursor-pointer hover:bg-red hover:text-white rounded-full bg-gray-100'><IoClose className='w-5 h-5' /></div></div>
  <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
    <div className='flex cursor-pointer justify-center items-center gap-8'>
<img className='h-28 w-28 rounded-full' src={selectedcoverpic} alt=''/><label className="relative cursor-pointer rounded-md px-3 py-2  border border-cta text-white bg-cta border">
<button className='cursor-pointer text-sm'>Upload an Image</button>
<input type="file" accept='image/*' onChange={handlechangeCover} className="absolute inset-0 opacity-0 cursor-pointer" />
</label></div>
<div className='flex gap-4'>
<button onClick={cancelCover} className='p-2 border border-gray-300 hover:border-none hover:bg-gray-100 rounded-md'>Cancel</button>
<button className='p-2 hover:bg-cta text-cta hover:text-white rounded-md border border-cta' onClick={()=>{handleupdateCover();closeCoverForm()}}>Submit</button>
</div>
</div>
</div>
</Modal>
{personal.profile.map((profile)=>(
<div className='w-full flex items-center justify-center' key={profile.id}>
<div className='flex w-5/6 flex items-center justify-center'>
  <div style={{backgroundImage:`url('http://localhost:8086${user.bannerImagePath}')`}} alt={user.bannerImagePath} className='flex flex-col relative border w-full h-96 mt-4 bg-cover bg-center  bg-no-repeat gap-4 justify-end'>
    {parseInt(userID) === userId && ( <div onClick={openCoverForm} className='absolute right-4 top-4 flex gap-2 items-center rounded-md cursor-pointer px-2 py-1 bg-white bg-opacity-40'><Icon icon="mdi:camera" width="1.2em" height="1.2em"  style={{color: ''}} /><span className='font-semibold'>Change cover photo</span> </div>
    )} 
  <div className='absolute right-0 top-0 p-2'>
    </div>
<div className='flex px-11 items-center'>
       <div>
        <img  className='w-36 border-4 border-gray-300e h-36 rounded-full' alt='' src={`http://localhost:8086${user.profileImagePath}`} /></div> 
       { parseInt(userID) === userId && <div onClick={openImageForm} className='absolute justify-end mt-20 ml-28 flex text-cta hover:bg-cta hover:text-white border border-cta cursor-pointer items-center justify-center py-1.5 w-min px-1.5 rounded-full bg-white'><Icon icon="mdi:camera" width="1.2em" height="1.2em"  style={{color: ''}} /></div>}
        </div>
    <div className='flex justify-between relative md:px-11 sm:px-6 items-center md:w-full sm:w-auto h-20 bg-white'>
        <div className='flex flex-col'>
                <div>
                <p className='text-xl text-cta font-semibold'>{user.name}</p>
                </div>
                <p className='text-gray-500'>{user.country}</p>
        </div>
        <NavLink to='/profession'><span className='cursor-pointer text-lg hover:text-cta font-semibold'>Profession</span></NavLink>
        <div className='flex gap-12'>
        {menu.map((items)=>(
                <div key={items.id}>
                <NavLink to={items.path} className={`text-lg hover:text-cta font-semibold ${isActive(items.path) ? 'active-link' : ''}`}  ><p className='text-lg hover:text-cta'>{items.name}</p></NavLink>
                </div> 
                    ))}
        </div>
        <div className='flex items-center gap-6 font-semibold'>
        {/* <div className='flex items-center flex-col'>
        <span>Posts</span>
        <span>{profile.posts}</span>
        </div> */} 
        <Link to={`/following/${userID}`}>
        <div className='flex items-center flex-col'>
        <span>Following</span>
        <span>{following?.count}</span>
        </div></Link>
        <Link to={`/followers/${userID}`}>
        <div className='flex items-center flex-col'>
        <span>Followers</span>
        <span>{followers?.count}</span>
        </div></Link>
        </div>
        {parseInt(userID) === userId ? (<div className='p-2 bg-gray-50 cursor-pointer rounded-full'><Icon icon="system-uicons:menu-vertical" width="1.2em" height="1.2em"  /></div>) : (
        <div className='flex gap-8'>
          <div className='relative'>
        <div className='flex gap-1 cursor-pointer items-center justify-center w-32 rounded-md h-10 bg-cta hover:opacity-85 text-white'>
        {isFriends? <div onClick={handleOptions} className='flex items-center gap-1'><Icon className='w-4 h-4' icon="fa-solid:user-friends" />Friends</div>:isRequested? <div onClick={cancelRequest} className='flex items-center gap-1 font-semibold'><Icon className='w-5 h-5' icon="material-symbols:person-cancel-rounded" /> <span>Cancel</span></div> : <div onClick={sendRequest} className='flex items-center gap-1 font-semibold'><Icon className='w-4 h-4' icon="mingcute:user-add-fill" /><span>Add Friend</span></div>}
          </div>  
          {options && <div className='absolute flex flex-col p-2 shadow-lg w-32'>
            <span onClick={()=>{unFriend(user.id)}} className='flex cursor-pointer items-center gap-1 py-1 text-sm justify-center' ><Icon className='text-cta' icon="icon-park-solid:people-delete-one" width="1.2em" height="1.2em" />Unfriend</span>
            <span className='flex items-center cursor-pointer gap-1 py-1 text-sm justify-center'>Block</span></div>}
</div>
{isFollowed ? (
    <button onClick={unfollowUser} key={user.id} className=' flex gap-1 cursor-pointer items-center justify-center w-32 rounded-md hover:opacity-85 h-10 bg-cta text-white'>
      <Icon className='w-5 h-5 font-semibold' icon="charm:tick" />
      <span  className='font-semibold'>Following</span>
    </button>
  ) : (
    <button onClick={followUser}  key={user.id} className=' flex gap-1 cursor-pointer items-center justify-center w-32 rounded-md hover:opacity-85 h-10 bg-cta text-white'>
      <Icon className='w-5 h-5 font-semibold' icon="ic:sharp-add" />
      <span className='font-semibold'>Follow</span>
    </button>
          )}
        </div>)}
    </div>
  </div>
  </div>
  </div>
            ))}
</div>
  )
}

export default ProfileheaderUser;






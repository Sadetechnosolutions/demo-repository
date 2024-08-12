import React,{useState,useEffect} from 'react'
import { Link, NavLink,useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from 'react-modal';
import { useSelector,useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { updatePhoto,changecoverPhoto,updateCover,changePhoto } from '../slices/photoslice';

const Profileheader = () => {
  const dispatch = useDispatch();
  const [imageForm,setImageForm] = useState(false);
  const [coverForm,setCoverForm] = useState(false);
  const [user,setUser] = useState();
  const [file, setFile] = useState(null);
  const {selectedprofilepic} = useSelector((state)=>state.photo)
  const {profilepic} = useSelector((state)=>state.photo)
  const {selectedcoverpic} = useSelector((state)=>state.photo)
  const {coverpic} = useSelector((state)=>state.photo)
  const userId = useSelector((state) => state.auth.userId);
  const location = useLocation();
  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched user data:', data); // Log fetched data
        setUser(data);
      } else {
        console.error('Failed to fetch user data:', response.status);
        // Optionally handle different status codes (e.g., unauthorized, not found)
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUserName();
    }
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>; // Show loading state while fetching
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
        dispatch(changePhoto(reader.result)); // Dispatch action to update profile picture
        setFile(selectedFile); // Store the file object
      };
      
      reader.readAsDataURL(selectedFile); // Read the file as a data URL
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

    const isActive = (path) => {
      return location.pathname === path;
    };
    const personal = {
        profile: [
          { id: 1,name:'Peter Parker',img:'profile.jpg',posts:64,following:44,followers:51,photos:4,videos:3,aboutme:`Hi, I’m Peter Parker, I’m 36 and I work as a Professional Cinematographer from Ontario, Canada, my proclaimed works are “dewwater” and "Sunbeast"`,birthday:'December 17, 1985', phno: '+1-989-232435234', bloodgroup: 'B+',gender:'Male',country:'San Francisco, US',occupation:'Cinematographer',joined:'December 20,2021', email:'peterparker07@design.com' },
        ]
      }

    const menu = [
        {id:1,
        name:'Profile',
        path:'/profile'},
        {id:2,
        name:'Timeline',
        path:'/timeline'},
        {id:3,
        name:'Friends',
        path:'/friends'},
        {id:4,
        name:'Photos',
        path:'/photos'},
        {id:5,
        name:'Videos',
        path:'/videos'},
        ]
        
        const handlechangeCover = (event)=>{
          const selectedFile = event.target.files[0];
          if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
              dispatch(changecoverPhoto(reader.result)); // Dispatch action to update profile picture
              setFile(selectedFile); // Store the file object
            };
            reader.readAsDataURL(selectedFile); // Read the file as a data URL
          }
        }

  return (
    <>
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
      <div style={{backgroundImage:`url('http://localhost:8080/api/users/${user.profileImagePath}')`}} alt={user.profileImagePath} className='flex flex-col relative w-full h-96 mt-4 bg-cover bg-center bg-no-repeat gap-4 justify-end'>
      <div className='absolute right-0 top-0 p-2'><div onClick={openCoverForm} className=' flex gap-2 items-center rounded-md cursor-pointer px-2 py-1 bg-white bg-opacity-40'><Icon icon="mdi:camera" width="1.2em" height="1.2em"  style={{color: ''}} /><span className='font-semibold'>Change cover photo</span> </div></div>
 <div className='flex px-11 items-center'>
           <div>
            <img  className='w-36 border-4 border-white h-36 rounded-full' alt='' src='http://localhost:8082//uploads/e5221dac-d983-465c-abc1-6f1bfbe92e57_dp.jpg' /></div> 
            <div onClick={openImageForm} className='absolute justify-end mt-20 ml-28 flex text-cta hover:bg-cta hover:text-white border border-cta cursor-pointer items-center justify-center py-1.5 w-min px-1.5 rounded-full bg-white'><Icon icon="mdi:camera" width="1.2em" height="1.2em"  style={{color: ''}} /></div>
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
            <div className='p-2 bg-gray-50 cursor-pointer rounded-full'><Icon icon="system-uicons:menu-vertical" width="1.2em" height="1.2em"  /></div>
            <div className='flex items-center gap-6 font-semibold'>
            {/* <div className='flex items-center flex-col'>
            <span>Posts</span>
            <span>{profile.posts}</span>
            </div> */} 
            <Link to='/following'>
            <div className='flex items-center flex-col'>
            <span>Following</span>
            <span>{profile.following}</span>
            </div></Link>
            <Link to='/followers'>
            <div className='flex items-center flex-col'>
            <span>Followers</span>
            <span>{profile.followers}</span>
            </div></Link>
            </div>
        </div>
      </div>
      </div>
      </div>
      // wouldnt trade it for anything
      // 09:21 life peaked
                ))}
    </>
  )
}

export default Profileheader;



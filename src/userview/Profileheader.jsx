import React,{useState} from 'react'
import { Link, NavLink,useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector,useDispatch } from 'react-redux';
import { changePhoto } from '../slices/photoslice';
import { updatePhoto,changecoverPhoto,updateCover } from '../slices/photoslice';

const ProfileheaderUser = () => {
  const [imageForm,setImageForm] = useState(false);
  const [coverForm,setCoverForm] = useState(false);
  const [file, setFile] = useState(null);
  const [request,sentRequest] = useState(false)
  const [follow,setFollow] = useState(false)
  const dispatch = useDispatch();
  const {selectedprofilepic} = useSelector((state)=>state.photo)
  const {profilepic} = useSelector((state)=>state.photo)
  const {selectedcoverpic} = useSelector((state)=>state.photo)
  const {coverpic} = useSelector((state)=>state.photo)
  
  const handleRequest = ()=>{
    sentRequest(!request)
  }

  const handleFollow = ()=>{
    setFollow(!follow)
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

    const menu = [
        {id:1,
        name:'Profile',
        path:'/profileview'},
        {id:2,
        name:'Timeline',
        path:'/timeline'},
        {id:3,
        name:'Friends',
        path:'/friendsview'},
        {id:4,
        name:'Photos',
        path:'/photosview'},
        {id:5,
        name:'Videos',
        path:'/videosview'},
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

  return (
    <>
    {personal.profile.map((profile)=>(
    <div className='w-full flex items-center justify-center' key={profile.id}>
    <div className='flex w-5/6 flex bg items-center justify-center'>
      <div style={{backgroundImage:`url(${coverpic})`}} className='flex flex-col relative w-full h-96 mt-4 bg-cover bg-center bg-no-repeat gap-4 justify-end'>
 <div className='flex px-11 items-center'>
           <div>
            <img  className='w-36 border-4 border-white h-36 rounded-full' alt='' src={profilepic} />
            </div>
            </div>
            <div className='flex justify-between relative md:px-11 sm:px-6 items-center md:w-full sm:w-auto h-20 bg-white'>
            <div className='flex flex-col'>
                    <div>
                    <p className='text-xl text-cta font-semibold'>{profile.name}</p>
                    </div>
                    <p className='text-gray-500'>{profile.country}</p>
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
            <Link to='/followingview'>
            <div className='flex items-center flex-col'>
            <span>Following</span>
            <span>{profile.following}</span>
            </div>
            </Link>
            <Link to='/followersview'>
            <div className='flex items-center flex-col'>
            <span>Followers</span>
            <span>{profile.followers}</span>
            </div>
            </Link>
            </div>
            <div className='flex gap-8'><button onClick={handleRequest} className={`flex items-center ${request?'bg-cta text-white':'border border-cta text-cta'} w-32 flex justify-center rounded-md`}>{request?<span className='font-semibold'>Cancel</span>:<span className='flex items-center font-semibold'><Icon className='text-lg' icon="ic:outline-add" />Add Friend</span>}</button>
            <button onClick={handleFollow} className={`flex items-center ${follow?'bg-cta text-white ':'border border-cta text-cta'} w-28 h-11 flex justify-center rounded-md`}>{follow?<span className='flex gap-0.5 items-center'><Icon className='w-5 h-5' icon="charm:tick" />Following</span>:<span className='flex items-center'><Icon className='text-lg' icon="ic:outline-add" /><span className='font-semibold'>Follow</span></span>}</button></div>
        </div>
      </div>
      </div>
      </div>
                ))}
    </>
  )
}

export default ProfileheaderUser;

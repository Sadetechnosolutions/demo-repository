import React,{useState} from 'react'
import { NavLink,useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js';
import Modal from 'react-modal';
import { useSelector,useDispatch } from 'react-redux';
import { changePhoto } from '../slices/photoslice';
import { IoClose } from 'react-icons/io5';
import { updatePhoto } from '../slices/photoslice';

const Profileheader = () => {
  const dispatch = useDispatch();
  const [imageForm,setImageForm] = useState(false);
  const [file, setFile] = useState(null);
  const {selectedprofilepic} = useSelector((state)=>state.photo)
  const {profilepic} = useSelector((state)=>state.photo)
  const openImageForm = ()=>{
    setImageForm(true);
  }

  const closeImageForm =()=>{
    setImageForm(false)
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
  const cancel = () => {
    dispatch(changePhoto(profilepic));
    closeImageForm();
  };
  const handleButtonClick = () => {
   dispatch(updatePhoto(selectedprofilepic));
  };
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
        name:'Bio',
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
<button onClick={cancel} className='p-2 border border-gray-300 hover:border-none hover:bg-gray-100 rounded-md'>Cancel</button>
<button className='p-2 hover:bg-cta text-cta hover:text-white rounded-md border border-cta' onClick={()=>{handleButtonClick();closeImageForm()}}>Submit</button>
</div>
</div>
    </div>
 </Modal>
    {personal.profile.map((profile)=>(
    <div className='w-full flex items-center justify-center' key={profile.id}>
    <div className='flex w-5/6 flex items-center justify-center'>
      <div style={{backgroundImage:"url(coverimg.jpg)"}} className='flex flex-col w-full h-96 mt-4 bg-cover bg-no-repeat gap-4 justify-end'>
        <div className='flex px-11 items-center'>
           <div>
            <img  className='w-36 border-4 border-white h-36 rounded-full' alt='' src={profilepic} /></div> 
            <div onClick={openImageForm} className='absolute justify-end mt-20 ml-28 flex text-cta hover:bg-cta hover:text-white border border-cta cursor-pointer items-center justify-center py-1.5 w-min px-1.5 rounded-full bg-white'><Icon icon="mdi:camera" width="1.2em" height="1.2em"  style={{color: ''}} /></div>
            </div>
        <div className='flex justify-between bg-gray-200 px-11 items-center w-full h-20 bg-white'>
            <div className='flex flex-col'>
                    <div>
                    <p className='text-xl text-cta font-semibold'>{profile.name}</p>
                    </div>
                    <p className='text-gray-500'>{profile.country}</p>
            </div>
            <NavLink to='/profession'><span className='cursor-pointer text-lg hover:text-cta'>Profession</span></NavLink>
            <div className='flex gap-12'>
            {menu.map((items)=>(
                    <div key={items.id}>
                    <NavLink to={items.path} className={`text-lg hover:text-cta ${isActive(items.path) ? 'active-link' : ''}`}  ><p className='text-lg hover:text-cta'>{items.name}</p></NavLink>
                    </div> 
                        ))}
            </div>
            <div className='p-2 bg-gray-50 cursor-pointer rounded-full'><Icon icon="system-uicons:menu-vertical" width="1.2em" height="1.2em"  /></div>
            <div className='flex items-center gap-6'>
            <div className='flex items-center flex-col'>
            <span>Posts</span>
            <span>{profile.posts}</span>
            </div>
            <div className='flex items-center flex-col'>
            <span>Following</span>
            <span>{profile.following}</span>
            </div>
            <div className='flex items-center flex-col'>
            <span>Followers</span>
            <span>{profile.followers}</span>
            </div>
            </div>
        </div>
      </div>
      </div>
      </div>
                ))}
    </>
  )
}

export default Profileheader;

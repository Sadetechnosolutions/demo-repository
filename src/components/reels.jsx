import React, { useState,useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { addReels } from "../slices/videoslice";
import Modal from 'react-modal'
import ReactPlayer from "react-player";
import InputEmoji from "react-input-emoji";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";

const Reels=()=>{
    const {userID} = useParams()
    const dispatch = useDispatch()
    const [file,setFile] = useState()
    const [selected,setSelected] = useState(false)
    const reels = useSelector((state)=>state.video.reels)
    const [caption,setCaption] = useState('')
    const userId = useSelector((state)=>state.auth.userId)
    const [reel,setReel] = useState()
    const [users,setUsers] = useState()

    const closeReel = ()=>{
        setSelected(false)
    }

    const handleReelsChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) { 
            const fileObject = { name: selectedFile };
                setFile(fileObject.name.name); 
                dispatch(addReels(fileObject))
                console.log(fileObject)
                setSelected(true)
        }
    };

    const PostReels =async ()=>{
        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('file', reels?.name);
        formData.append('caption', caption);
        formData.append('duration', 24);
        formData.append('privacy', 'PUBLIC');
        formData.append('userId', userId);
        try{
             const response = await fetch('http://localhost:8080/reels/addReel',{
             method:'POST',
             body:formData,
             headers:{
                'Authorization':`bearer${token}`,
             }
            })
            if(response.ok){
                dispatch(addReels(null))
                closeReel()
                setSelected(false)
                fetchReels()
            }
            else{
              console.log('failed to post')
            }  
        }
        catch(error){
            console.log(error);
        }
    }

    const fetchReels = async () => {
        const token = localStorage.getItem('token'); // Fixed typo
        try {
          const response = await fetch('http://localhost:8080/reels/getAll/reel', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}` // Added space after "bearer"
            }
          });
          if (response.ok) {
            const data = await response.json();
            setReel(data);
            console.log(data,'data')
          } else {
            console.error('Failed to fetch stories:', response.status);
          }
        } catch (error) {
          console.error('Error fetching stories:', error);
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

      const renderBackButton = ({ isDisabled, onClick }) => (
        <button
            className="absolute p-2 hover:bg-cta hover:text-white text-cta bg-gray-100 rounded-full left-0 bottom-28"
            onClick={onClick}
            disabled={isDisabled}
        >
    <Icon icon="ic:twotone-arrow-back-ios" /> </button>
    );
    const renderNextButton = ({ isDisabled, onClick }) => (
      <button
          className="absolute p-2 hover:bg-cta hover:text-white text-cta bg-gray-100 rounded-full right-0 bottom-28"
          onClick={onClick}
          disabled={isDisabled}
      >
 <Icon icon="grommet-icons:next" />  </button>
  );
      const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        1024: { items: 4 },
        1600: { items: 4 },
      };
    
return(
    <>
    <div className="w-full relative px-2 py-6 flex bg-white rounded-md flex-col items-center justify-center gap-4 shadow-lg">
        <div className=" m-auto w-full flex gap-2">
            <button className="text-cta font-semibold cursor-pointer absolute top-0 right-4">+Add your reels <input onChange={e=>{handleReelsChange(e)}} className="absolute inset-0 cursor-pointer opacity-0" accept="video/*" type="file" /></button>
            {/* <div style={{backgroundImage:"url(coverimg.jpg)"}} className="relative contain-r inline-block cursor-pointer rounded-lg overflow-hidden flex flex-col w-44 h-[22rem]">
            <span className="rounded-full border border-white text-white flex items-center justify-center absolute transition-transform duration-300 hover:scale-110 ml-4 mt-4 w-9 h-9" ><Icon className="w-6 h-6" icon="mingcute:add-line" /></span>
            <div className="absolute w-full text-center child-r p-2 bottom-0">
            <span className="text-white text-lg font-semibold">Upload your reels</span>
            </div>
            <input onChange={e=>{handleReelsChange(e)}} className="absolute inset-0 cursor-pointer opacity-0" accept="video/*" type="file" />
            </div> */}
            <AliceCarousel          
          mouseTracking
          touchTracking={false}
          responsive={responsive}
          disableDotsControls={true}
          renderPrevButton={renderBackButton}
          renderNextButton={renderNextButton}
   >

        {reel?.map((reel)=>(
                <NavLink key={reel.id} to={`/reels/${reel.id}`}><div  className="relative contain-r w-44 rounded-md group inline-block cursor-pointer h-[22rem] overflow-hidden">
                        <div key={reel.id} style={{backgroundImage:`url(${reel.story})`}} className=" group-hover:scale-105 transition-transform duration-300 inline-block cursor-pointer rounded-lg  w-56 h-[22rem]">
                        <ReactPlayer 
        url={`http://localhost:8086${reel.content}`}  // Replace with your video URL
        controls={false} // Hide controls if desired
        width='300%'
        height='100%'
 />
             {users.map((user)=>user.id === reel.userId?     
      <div className="absolute left-8 top-4">
        <div className="flex items-center text-white font-semibold gap-2">
        <img className="w-8 h-8 rounded-full" src={`http://localhost:8086${reel.profileImagePath}`} />
          <p key={user.id} className=' '><span>{user.UserName}</span></p>
    </div>
      </div> : '' )}
                        </div>
                </div></NavLink>
        ))}
        </AliceCarousel>
        </div> 
        <Modal appElement={document.getElementById('root')} 
        style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-30%, -20%)',
          width: '80%',
          height: '100%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={selected} onRequestClose={closeReel}>
      <div className='relative w-1/2 bg-white h-[37rem] rounded-md flex rounded-lg p-2 shadow-lg flex-col items-center justify-center'>
      <InputEmoji className='mt-6'
                      value={caption}
                      onChange={(text) => setCaption(text)}
                      placeholder="Write something..."
                    />
      <ReactPlayer
              url={reels?.name.name}  // Replace with your video URL
              playing={true}  // Autoplay the video
              controls={false} // Hide controls if desired
              width='100%'
              height='80%'
              loop={true} 
            />
            <button onClick={PostReels} className="absolute rounded-md py-2 px-4 bg-cta text-white right-4 bottom-4">Post</button>
    </div>
 </Modal>
    </div>
    </>
)
}

export default Reels


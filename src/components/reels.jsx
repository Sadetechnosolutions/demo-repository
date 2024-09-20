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
    const reelsdata =[{
        id:1,
        name:'Adam James',
        dp:'author.jpg',
        story:"dp.jpg"
    },
    {
        id:2,
        name:'Walker',
        dp:'author.jpg',
        story:"dp.jpg"
    },
    {
        id:3,
        name:'Claire Thompson',
        dp:'author.jpg',
        story:"dp.jpg"
    }]


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
    
return(
    <>
    <div className="w-full px-4 py-2 flex bg-white rounded-md flex-col gap-4 shadow-lg">
        <div className="w-full flex gap-2">
            
            <div style={{backgroundImage:"url(coverimg.jpg)"}} className="relative contain-r inline-block cursor-pointer rounded-lg overflow-hidden flex flex-col w-44 h-[22rem]">
            <span className="rounded-full border border-white text-white flex items-center justify-center absolute transition-transform duration-300 hover:scale-110 ml-4 mt-4 w-9 h-9" ><Icon className="w-6 h-6" icon="mingcute:add-line" /></span>
            <div className="absolute w-full text-center child-r p-2 bottom-0">
            <span className="text-white text-lg font-semibold">Upload your reels</span>
            </div>
            <input onChange={e=>{handleReelsChange(e)}} className="absolute inset-0 cursor-pointer opacity-0" accept="video/*" type="file" />
            </div>
        {reel?.map((reel)=>(
                <NavLink to={`/reels/${reel.id}`}><div key={reel.id} className="relative contain-r w-52 rounded-md group inline-block cursor-pointer h-[22rem] overflow-hidden">
                        <div key={reel.id} style={{backgroundImage:`url(${reel.story})`}} className=" group-hover:scale-105 transition-transform duration-300 inline-block cursor-pointer rounded-lg  w-56 h-[22rem]">
                        <ReactPlayer 
        url={`http://localhost:8086${reel.content}`}  // Replace with your video URL
        controls={false} // Hide controls if desired
        width='300%'
        height='100%'
 />
                        {users?.map(user=>user.id === reel.userId ? 
      <div>
        <img src='' />
      <p className='block absolute child-r py-3 top-2 text-white opacity-0 w-48 truncate text-center '><span>{user.UserName}</span></p>
      </div> : null)}
                        </div>
                </div></NavLink>
        ))}
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
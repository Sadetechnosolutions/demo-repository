import React, { useState,useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch,useSelector } from "react-redux";
import { updateStory } from "../slices/photoslice";
import { useNavigate } from "react-router";

const StoryUpload = ()=>{
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [file,setFile] = useState(null);
    const [ textbox,setTextbox] = useState(false);
    const [text,setText] = useState('')
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const { story } = useSelector((state) => state.photo);
    const userId = useSelector((state)=>state.auth.userId)
    const [type,setType] = useState('');


    const handleStoryChange = (event,type) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) { 
            const fileObject = { name: selectedFile };
                setFile(fileObject.name.name); 
                dispatch(updateStory(fileObject))
                console.log(fileObject)
                setType(type)
        }
    };

    const handleroute = () => {
        setTimeout(() => {
          navigate('/newsfeed');
        }, 3000);
      };
    const handleClick = (e) => {
        const { clientX: left, clientY: top } = e;
        setPosition({ left, top });
        setIsEditing(!isEditing);
    };
    const handleTextbox = ()=>{
     setTextbox(!textbox)
    }

    const handleChange = (e)=>{
        setText(e.target.value)
    }

    const PostStory =async ()=>{
        const token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('file', story.name);
        formData.append('type', type);
        formData.append('duration', 24);
        formData.append('privacy', 'PUBLIC');
        formData.append('userId', userId);
        try{
             const response = await fetch('http://localhost:8080/statuses/post',{
             method:'POST',
             body:formData,
             headers:{
                'Authorization':`bearer${token}`,
             }
            })
            if(response.ok){
                dispatch(updateStory(null))
                handleroute()
                setType('')
            }
            else{
              console.log('failed to post')
              setType('')
            }  
        }
        catch(error){
            console.log(error);
            setType('')
        }
    }
    console.log(story?.name)
    return(
        <div className="min-h-screen bg-black flex justify-center">
    <div style={{backgroundImage: `url(${story?.name.name})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}} className="relative p-8 min-screen w-3/5">
        {isEditing &&
        <input
        onChange={handleChange}
        value={text}
        style={{
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.8)',
            color: '#000',
            border: 'none',
            opacity:0,
            padding: '5px',
            borderRadius: '5px',
            outline: 'none'}} className="w-full h-min-h-screen -0" type="text" />}
    <div className="absolute flex w-full justify-center items-center gap-16 top-5">
    <div className="relative cursor-pointer">
    <label className="flex cursor-pointer">   
    <Icon className="story-icons" icon="uim:image-v"  style={{color: '#525151'}} />
    <input className="w-0 h-0 opacity-0" onChange={(e)=>{handleStoryChange(e,'IMAGE')}} type="file" accept="image/*"/> </label>
    </div>
    <div className="relative cursor-pointer">
    <label className="flex cursor-pointer">   
    <Icon className="story-icons" icon="icon-park-twotone:video"  style={{color: '#525151'}} />
    <input className="w-0 h-0 opacity-0" onChange={(e)=>{handleStoryChange(e,'VIDEO')}} type="file" accept="video/*"/> </label>
    </div>
    <Icon className="story-icons"  icon="icon-park-twotone:music"  style={{color: '#525151'}} />
    <Icon   onClick={(e)=>{handleClick(e)}} className="story-icons"  icon="ion:text"  style={{color: '#525151'}} />
    <Icon className="story-icons"  icon="mdi:sticker-emoji"  style={{color: '#525151'}} />
    </div>
    <button onClick={PostStory} className="absolute bottom-6 right-6 bg-black p-2 rounded-full text-cta text-white flex items-center gap-2 p-2 px-4 text-lg font-semibold">Add to Story <span><Icon icon="fluent:send-20-filled"  style={{color: 'white'}} /></span></button>
    </div>
    </div>
    )
}

export default StoryUpload;
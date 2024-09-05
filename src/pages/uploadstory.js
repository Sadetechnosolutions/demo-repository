import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch,useSelector } from "react-redux";
import { updateStory } from "../slices/photoslice";

const StoryUpload = ()=>{
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const [file,setFile] = useState(null);
    const [ textbox,setTextbox] = useState(false);
    const [text,setText] = useState('')
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const { story } = useSelector((state) => state.photo);
    const userId = useSelector((state)=>state.auth.userId)


    const handleStoryChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) { 
            const fileObject = { name: selectedFile.name };
                setFile(fileObject); 
                dispatch(updateStory(fileObject))
                console.log(fileObject)
        }
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
        try{
            const payload = {file : story?.name, type:'image', duration:'20s', privacy:'public', userId:userId}
             const response = await fetch('http:8080/statuses/post',{
             method:'POST',
             headers:{
                'Authorization':`bearer${token}`
             }
            })
            if(response.ok){
                dispatch(updateStory(null))
            } 
            else{
              console.log('failed to post')
            }  
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <div className="min-h-screen bg-cta flex justify-center">
    <div style={{backgroundImage: `url(${story?.name})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}} className="relative p-8 min-screen w-3/5">
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
    <input className="w-0 h-0 opacity-0" onChange={(e)=>{handleStoryChange(e)}} type="file" accept="image/*"/> </label>
    </div>
    <div className="relative cursor-pointer">
    <label className="flex cursor-pointer">   
    <Icon className="story-icons" icon="uim:image-v"  style={{color: '#525151'}} />
    <input className="w-0 h-0 opacity-0" onChange={handleStoryChange} type="file" accept="video/*"/> </label>
    </div>
    <Icon className="story-icons"  icon="icon-park-twotone:music"  style={{color: '#525151'}} />
    <Icon   onClick={(e)=>{handleClick(e)}} className="story-icons"  icon="ion:text"  style={{color: '#525151'}} />
    <Icon className="story-icons"  icon="mdi:sticker-emoji"  style={{color: '#525151'}} />
    </div>
    </div>
    </div>
    )
}

export default StoryUpload;
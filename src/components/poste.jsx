import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { setpostLike } from '../slices/likeslice';
import { Player,BigPlayButton,LoadingSpinner } from 'video-react';
import InputEmoji from 'react-input-emoji';
import { addCommentnf,selectPhotoComment,deleteCommentnf,editComment,addToSaved } from "../slices/photoslice";
import { useDispatch,useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Heart from 'react-heart';
import moment from "moment";
import Modal from 'react-modal';
import Select from 'react-select';

const Post = ()=>{
  const [comment,setComment] = useState(null)
  const [share,showShare] = useState(false);
  const [shareImage, setShareImage] = useState(null);
  const [shareVideo, setShareVideo] = useState(null);
  const [edit,setEdit] = useState(false);
  const [hover,setHover] = useState(false);
  const [saved,setSaved] = useState({})
  const [postComment,setPostComment] =useState('')
  const [liked, setLiked] = useState(false);
  const {newsfeed} = useSelector((state)=>state.photo)
  const {selectedphotocomment} = useSelector((state)=>state.photo)
  const dispatch = useDispatch()
  const postliked = useSelector((state) => state.like.postliked);
  const postlikeCount = useSelector((state) => state.like.postlikeCount);
  const {Saved} = useSelector((state)=>state.photo)

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts'));
    if (savedPosts) {
      setSaved(savedPosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(saved));
  }, [saved]);
  const showMenu = (id)=>{
    setHover(id);
  }

  const handleSave = (id)=>{
    console.log("Post saved:", id);

    setSaved(prevSaved =>({
      ...prevSaved,
      [id]: !prevSaved[id]
    }));
  }

  const showEdit = (id)=>{
    setEdit(id);
  }
  const hideMenu = ()=>{
    setHover(null)
  }
  const handleShowComment = (id)=>{
      setComment(id)
  }

  const handleShowShare = (post) => {
         showShare(post)
}
  
  const closeShare = ()=>{
    showShare(false)
  }
  const handleSaved = (id)=>{
    console.log(dispatch(addToSaved(id)))
  }
const handleEditComment = (imageId, commentId, newComment) => {
  console.log(dispatch(editComment({ imageId, commentId, newComment })));
  setEdit(false);
};
const options = [
  { value: 'timeline', label: 'Share in your timeline' },
  { value: 'friendstimeline', label: 'Share in your friends timeline' },
  { value: 'group', label: 'Share in your group' },
  { value: 'page', label: 'Share in your page' }
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white', // Set background color of the control
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#3AB4BC' : 'white', // Set background color of selected option
    color: state.isSelected ? 'white' : 'black',
    cursor: 'pointer', // Add cursor pointer style
    '&:hover': {
      backgroundColor: state.isSelected ? '#3AB4BC' : '#E5E5E5', // Change hover background color
      color: state.isSelected ? 'white' : 'black', // Change hover text color
    },
  }),
};
const handleLikeClick = (postId) => {
  const currentlyLiked = postliked[postId] || false; // Get the current like status
  dispatch(setpostLike({ id: postId, liked: !currentlyLiked }));
};
return(
        <div>
            {newsfeed.map((post)=>{          

                  const handleAddCommentToPost = (imageId, commentInfo) => {
                    console.log(dispatch(addCommentnf({ imageId, commentInfo })));
                  };
                  const selectedPhoto = (event) => {
                    const file = event.target.files[0];
                    const fileObject = { name: file.name };
                    console.log(fileObject);
                    dispatch(selectPhotoComment({ postId: post.id, photo: fileObject }));
                  };
                  
                  const handleDeleteComment = (commentId)=>{
                    const imageId = post.id
                  dispatch(deleteCommentnf({imageId,commentId}))
                  }
                  console.log(selectedphotocomment?.name)
                      const handlePostComment = () => {
                        if (postComment.trim() !== '' || selectedPostPhoto) {
                          const imageId = post.id;
                          (handleAddCommentToPost(imageId,commentInfo));
                          setPostComment('');
                          dispatch(selectPhotoComment({ postId: post.id, photo: null }));
                        } else {
            
                        }
                      };
                      const selectedPostPhoto = selectedphotocomment && selectedphotocomment[post.id];
                      const commentInfo = {
                        commentId: uuidv4(),
                        comment: postComment,
                        userName: 'Peter Parker',
                        profilepic: 'profile.jpg',
                        timestamp: new Date(),
                        image: selectedPostPhoto?.name,
                      };
    const renderMedia = () => {
    if (!post.media || !post.media.type) return null;
    if (post.media.type === 'image') {
        return <img className='w-full h-[32rem]' src={post.media.path} alt='Selected Image' />;
    } else if (post.media.type === 'video') {
        return <Player className='w-full' playsInline>
        <source src={post.media.path} type='video/mp4' />
        <BigPlayButton position="center" /><LoadingSpinner />
    </Player>;
    }
    return null;
};
const inSaved = Saved && Saved.includes(post.id)
const isSaved = saved[post.id] || false;
             return(
                    <div className="rounded-md flex flex-col bg-white mb-8 gap-4 shadow-lg w-full py-2 px-4">
                                <Modal appElement={document.getElementById('root')}
    style={{    overlay: {
      zIndex: 9999
    },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '90%',
          overflowY: 'auto',
          border:'none'
        },}}
  isOpen={share} onRequestClose={closeShare}>
{share && (
    <div className="flex w-full items-center justify-center">
        <div className='w-1/2 h-auto bg-white flex flex-col p-4 gap-4 shadow-lg rounded-md '>
            <div className='flex justify-between items-center justify-center'>
                <span className='font-semibold text-lg'>Share</span>
                <div onClick={closeShare} className='cursor-pointer bg-gray-200 p-1 hover:bg-red hover:text-white rounded-full'>
                    <Icon icon="ic:twotone-close" />
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <img className="rounded-full w-9 h-9" src='profile.jpg' alt={share.dp} />
                <span>Peter parker</span>
            </div>
            <div className="flex gap-4">
                <Select className="w-1/2 text-sm" styles={customStyles} defaultValue={options[0]} options={options} />
                <input className="border rounded-lg text-sm w-full border-gray-400 px-2" placeholder="Search for friends, groups, pages" type="text" />
            </div>
            <input className="p-2 focus:outline-none" placeholder="What's on your mind" />
            <div className="flex flex-col px-4 gap-2">
                <div className="flex items-center gap-2">
                    <img className="w-9 h-9 rounded-full" src={share.dp} alt={share.dp} />
                    <span>{share.name}</span>
                </div>
                <div>{share.caption}</div>
                {share.media && share.media.type === 'image' && (
                    <img className="w-full h-72" src={share.media.path} alt={share.media.path} />
                )}
                {share.media && share.media.type === 'video' && (
                    <div className="w-full">
                        <Player className='w-full'>
                            <source src={share.media.path} type='video/mp4' />
                            <BigPlayButton position="center" />
                        </Player>
                    </div>
                )}
            </div>
            <div className="flex justify-end">
                <button className="p-2 bg-cta text-white rounded-md font-semibold">Share now</button>
            </div>
        </div>
    </div>
)}
  </Modal>
                    <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                    <img className="rounded-full w-11 h-11" src={post.dp} />
                    <div className="flex flex-col">
                        <span className="font-semibold">{post.name}</span>
                        <span className="text-sm text-gray-600">Posted {moment(post.timestamp).fromNow()}</span>
                    </div>
                    </div>
                    <div className="flex items-center">
                    <div onClick={()=>handleSave(post.id)}>{isSaved ? <Icon className="cursor-pointer h-6 w-6 text-cta" icon="material-symbols-light:bookmark-sharp" />:<Icon onClick={()=>{handleSaved(post)}} className="cursor-pointer h-6 w-6 text-gray-600" icon="prime:bookmark" />}</div>

                    <Icon className="w-6 h-6" icon="carbon:overflow-menu-vertical" />
                    </div>
                </div>
                <span>{post.caption}</span>
                <div>
                   {renderMedia()} 
                </div>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1 w-8 items-center">  
 {postlikeCount[post.id] > 0 && (<span>{postlikeCount[post.id]}</span>) }</div>
<Icon onClick={()=>handleShowComment(post.id)} className="cursor-pointer h-6 w-6 text-gray-600" icon="iconamoon:comment-light" /> </div>    
<div>    
<Icon onClick={()=>handleShowShare(post)} className="cursor-pointer h-8 w-8 text-gray-600" icon="mdi-light:share" />
    </div>
</div>

{comment===post.id && (
    <div className="flex flex-col gap-4">
          {selectedPostPhoto && <img className="w-24 h-24" src={selectedPostPhoto.name} />}

    <div className="flex items-center gap-2"><label className="cursor-pointer"><Icon className="w-7 h-7 text-gray-500" icon="mdi:camera-outline" /><input onChange={selectedPhoto} className="absolute opacity-0"  type="file"/></label><InputEmoji onChange={(text)=>setPostComment(text)} placeholder="Add a comment" /><Icon onClick={handlePostComment} className='text-cta cursor-pointer' icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth='2' /></div>
    { post.comments?.map((post) => (
                  <div onMouseEnter={()=>showMenu(post.commentId)} onMouseLeave={hideMenu} key={post.commentId} className='flex border py-2 px-4 rounded-3xl flex-col shadow-md w-full gap-1'>
                            <div className='flex gap-2 justify-between'>
                          <div className='flex gap-2 items-start w-full'>
                            <img className='rounded-full h-6 w-6' src={post.profilepic} alt={post.profilepic} />
                          <div className="flex flex-col gap-2 w-full">
                          <span className='font-semibold'>{post.userName}</span>
                          {edit ===post.commentId ? <div className='flex items-center w-full'><InputEmoji value={post.comment} onChange={(text)=>setPostComment(text)} /><Icon  onClick={() => handleEditComment(post.id, post.commentId, postComment)} className='text-cta cursor-pointer' icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth='2' /></div> : <span>{post.comment}</span>}
                                                    {post.image&&<img className="w-44 h-44" src={post.image} />}
                          <div className='flex items-end gap-2'>
                                     <div className="flex gap-4 items-center">  <div className="flex items-center gap-6">
                                     <Heart
              className="w-5 h-5"
            isActive={postliked[post.commentId] || liked}
              onClick={() => handleLikeClick(post.commentId)}
              animationScale={1.2}
              style={{ cursor: "pointer", borderColor: "orange" }}
            />
<Icon  className="cursor-pointer h-6 w-6 text-gray-600" icon="iconamoon:comment-light" />              
    <span className='text-gray-500 text-sm'>{moment(post.timestamp).fromNow()}</span>
</div>
                            </div>
                          </div>
                          </div>
                          </div>
                          <div className='relative'>
                          {hover === post.commentId &&(
                            <div>
                            <div key={post.commentId} className='absolute w-auto right-0 h-auto gap-2 flex'>
                            <div onClick={()=>showEdit(post.commentId)} className='flex cursor-pointer items-center gap-1 '><Icon className="text-gray-500" icon="material-symbols:edit-outline" height='1.2em' width='1.2em' /></div>
                            <div onClick={()=>handleDeleteComment(post.commentId)} className='flex cursor-pointer hover:text-red items-center gap-1 '><Icon className="text-gray-500 hover:text-red" icon="material-symbols:delete-outline" height='1.2em' width='1.2em' /></div>
                            </div>
                            </div>
                          )}       
                          </div> 
                          </div>
        </div>  
                            ))}
    </div>
)}
</div>             
                )
            })}
     </div>
    )
}

export default Post;
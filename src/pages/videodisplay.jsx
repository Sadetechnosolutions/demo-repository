import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { Icon } from '@iconify/react/dist/iconify.js';
import { Player,BigPlayButton,LoadingSpinner } from 'video-react'
import { setvideoLike } from '../slices/likeslice';
import {useSpring, animated} from 'react-spring'
import InputEmoji from "react-input-emoji";
import { v4 as uuidv4 } from 'uuid';
import {addComment,removeComment} from '../slices/videoslice'
import moment from 'moment';

    const Videodisplay = () => {
    const[videoComment,setVideoComment] = useState('')
    const [localVideoComments, setLocalVideoComments] = useState([]);
    const dispatch = useDispatch()
    const {videocomments} = useSelector((state)=>state.comment)
    const { videoliked,videolikeCount } = useSelector((state) => state.like);
    const[hover,setHover] = useState(false);
    const[showHover,setShowHover] = useState(false);
    const {videos} = useSelector((state)=>state.video)
    const {id} = useParams()
    const isLiked = videoliked[id] || false; // Check if photo is liked based on ID
    const likes = videolikeCount[id] || 0
    const handleLike = () => {
        dispatch(setvideoLike({ id, liked: !isLiked })); // Toggle liked status
      };
    const vid = videos.find((video)=>String(video.id) === id)
    const[key,setKey] = useState(0)
    const iconSpring = useSpring({
        transform: `scale(${hover ? 1 : 1.2})`,
        from: {transform: `scale(${hover ? 0.2: 1.2})`},
        config: { tension: 300, friction: 10 },
        key: key.toString(),
      });

      const handleClick = ()=>{
        setHover(true)
        handleLike()
        setTimeout(() => {
            setHover(false);
            setKey((prevKey) => prevKey + 1); // Change the key to trigger animation update
          }, 300);
      }

    const addVideoComment = (videoId,commentInfo)=>{
      console.log(dispatch(addComment({videoId,commentInfo})))
    }

    const commentInfo = {
      commentId:uuidv4(),
        comment:videoComment,
        userName:'Peter Parker',
        profilePic:'profile.jpg',
        timestamp: new Date(),

    }

    const showoption = (id)=>{
      setShowHover(id)
    }

    const hideoption = ()=>{
      setShowHover(null)
    }

    const handleDeleteComment = (commentId)=>{
     const videoId = vid.id;
     dispatch(removeComment({videoId,commentId}))
     console.log(commentId)
    }



    
    const handleVideoComment = ()=>{
        if(videoComment.trim() !== ''){
        const videoId = vid.id
       addVideoComment(videoId,commentInfo)
        setVideoComment('')
        console.log(videos)
        }
        else{
            console.log('empty')
        }
    }

    useEffect(() => {
      if(!vid){
        return<div>...loading</div>
    }
    else{
        console.log(vid.name)
    }
      // Update localPostComments with current postcomments from Redux
      setLocalVideoComments([...videocomments]);
    }, [vid,videocomments]);
  

    useEffect(() => {
      const interval = setInterval(() => {
        setLocalVideoComments((prevComments) =>
          prevComments.map((comment) => ({
            ...comment,
            timestamp: moment(comment.timestamp).add(1, 'minutes').toDate(),
          }))
        );
      }, 60000);
  
      return () => clearInterval(interval);
    }, []);

    return (
        <>
          <div className='flex w-full'>
            <div className='w-2/3 bg-black h-[775px'>
            <Player controls>
                    <source src={`/${vid.name}`} />
                    <LoadingSpinner />
                    <BigPlayButton position='center' />
                </Player>
            </div>
            <div  className='flex p-4 shadow-lg h-[775px] flex-col w-1/3 gap-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <img className='w-11 h-11 rounded-full' src='profle.jpg' alt={""} />
                  <div>
                    <p>Peter Parker</p>
                    <p className='text-sm'>{vid.postedTime}</p>
                  </div>
                </div>
                <Icon icon='system-uicons:menu-vertical' width='1.2em' height='1.2em' />
              </div>
              <p>{vid.desc}</p>
              <div className='flex gap-1 items-center'>
              <animated.div
      style={iconSpring}
      onClick={()=>setHover(true)}
    >
                <Icon
                  onClick={handleClick}
                  className={`cursor-pointer h-7 w-7 ${isLiked ? 'text-pink ' : 'text-gray-500'}`}
                  icon={isLiked ? "material-symbols-light:favorite" : "material-symbols-light:favorite-outline"}
                  width='1.2em'
                  height='1.2em'
                /></animated.div>
                <span>{likes}</span>
              </div>
              <hr />
              <div className='flex items-center gap-2'>
              <InputEmoji  className='custom-input-emoji' value={videoComment} onChange={(text)=>setVideoComment(text)} placeholder='Add a comment' />
              <Icon onClick={handleVideoComment} className='text-cta cursor-pointer'   icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth='2' />
              </div>
              {vid.comments?.map((post)=>(
                      <div onMouseEnter={()=>showoption(post.commentId)} onMouseLeave={hideoption} key={post.commentId} className='flex border py-2 px-4 rounded-3xl flex-col shadow-md w-full gap-1'>
                        <div className='flex justify-between'>
                      <div className='flex gap-1 items-center'>
                        <img className='rounded-full h-6 w-6' src={post.profilepic} alt={post.profilepic} />
                        <p className='font-semibold'>{post.userName}</p>
                      </div>
                      <div className='relative'>
                      {showHover === post.commentId &&(
                        <div>
                        <div key={post.commentId} className='absolute w-auto right-0 h-auto gap-2 flex'>
                        <div className='flex cursor-pointer items-center gap-1 '><Icon icon="material-symbols:edit-outline" height='1.2em' width='1.2em' /></div>
                        <div onClick={()=>handleDeleteComment(post.commentId)} className='flex cursor-pointer hover:text-red items-center gap-1 '><Icon icon="material-symbols:delete-outline" height='1.2em' width='1.2em' /></div>
                        </div>
                        </div>
                      )}     
                      </div>          
                      </div>
                      <span>{post.comment}</span>
                      <div className='flex items-end gap-2'>
                       <Icon onClick={handleLike} className={`cursor-pointer h-5 w-5 text-pink`}
              icon={isLiked ? "material-symbols-light:favorite" : "material-symbols-light:favorite-outline"} width='1.2em' height='1.2em'/>
              <span className='cursor-pointer hover:underline'>Reply</span>
              <span className='text-gray-500 text-sm'>{moment(post.timestamp).fromNow()}</span>
               <span className='text-gray-500 text-sm'></span>
                        </div>
                      </div>
          ))}
            </div>
          </div>
        </>
      );
}

export default Videodisplay

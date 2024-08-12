import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react/dist/iconify.js';
import { setpostLike } from '../slices/likeslice';
import { v4 as uuidv4 } from 'uuid';
import InputEmoji from 'react-input-emoji';
import { addCommentToImage,deleteComment,editComment } from '../slices/photoslice';
import moment from 'moment';

const Photodisplay = () => {
  const [localPostComments, setLocalPostComments] = useState([]);
  const [hover,setHover] = useState(false);

  const [postComment, setPostComment] = useState('');
  const [edit,setEdit] = useState(false);
  const { postcomments } = useSelector((state) => state.comment);

  const { postliked, postlikeCount } = useSelector((state) => state.like);
  const isClicked = postlikeCount || false
  const { uploaded } = useSelector((state) => state.photo);
  const dispatch = useDispatch();
  const { profilepic } = useSelector((state) => state.photo);
  const { id } = useParams();
  const isLiked = postliked[id] || false;
  const image = uploaded.find((img) => String(img.id) === id);
  const likes = postlikeCount[id] || 0;

  useEffect(() => {
    // Update localPostComments with current postcomments from Redux
    setLocalPostComments([...postcomments]);
  }, [postcomments]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalPostComments((prevComments) =>
        prevComments.map((comment) => ({
          ...comment,
          timestamp: moment(comment.timestamp).add(1, 'minutes').toDate(),
        }))
      );
    }, 60000);

    return () => clearInterval(interval); 
  }, []);

  const showMenu = (id)=>{
    setHover(id);
  }

  const showEdit = (id)=>{
    setEdit(id);
  }

  const handleEditComment = (imageId, commentId, newComment) => {
    console.log(dispatch(editComment({ imageId, commentId, newComment })));
    setEdit(false); // Exit edit mode after submitting edit
  };

  const hideMenu = ()=>{
    setHover(null);
  }

  const handleLike = () => {
    dispatch(setpostLike({ id, liked: !isLiked }));
  };

  const handleAddCommentToImage = (imageId, commentInfo) => {
    console.log(dispatch(addCommentToImage({ imageId, commentInfo })));
  };
  const commentInfo = {
    commentId: uuidv4(),
    comment: postComment,
    userName: 'Peter Parker',
    profilepic: 'profile.jpg',
    timestamp: new Date(),
  };

  const handlePostComment = () => {
    if (postComment.trim() !== '') {
      const imageId = image.id;
      (handleAddCommentToImage(imageId,commentInfo));
      setPostComment('');
    } else {
      console.log('empty');
    }
  };

  const handleDeleteComment = (commentId) => {
    const imageId = image.id;
    dispatch(deleteComment({ imageId, commentId }));
  };
  console.log(image)

  return (
    <>
      <div className='flex w-full'>
        <div className='w-2/3'>
          <img src={`/${image.name}`} alt={image.name} />
        </div>
        <div className='flex p-4 shadow-lg h-[775px] flex-col w-1/3 gap-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img className='w-11 h-11 rounded-full' src={profilepic} alt={""} />
              <div>
                <p>Peter Parker</p>
                <p className='text-sm'>{image.postedTime}</p>
              </div>
            </div>
            <Icon icon='system-uicons:menu-vertical' width='1.2em' height='1.2em' />
          </div>
          <p>{image.desc}</p>
          <div className='flex items-end'>
            <Icon onClick={handleLike}
              className={`cursor-pointer h-7 w-7 text-pink`} icon={isLiked ? "material-symbols-light:favorite" : "material-symbols-light:favorite-outline"} width='1.2em' height='1.2em'/>
          <span>{likes>0 && likes}</span>
          </div>
          <div className='flex items-center gap-1'>
          <InputEmoji className='custom-emoji-picker' onChange={(text)=>setPostComment(text)} placeholder='Add a comment' />
          <Icon onClick={handlePostComment} className='text-cta cursor-pointer' icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth='2' />
          </div>
          {image.comments?.map((post)=>(
                      <div onMouseEnter={()=>showMenu(post.commentId)} onMouseLeave={hideMenu} key={post.commentId} className='flex border py-2 px-4 rounded-3xl flex-col shadow-md w-full gap-1'>
                        <div className='flex justify-between'>
                      <div className='flex gap-1 items-center'>
                        <img className='rounded-full h-6 w-6' src={post.profilepic} alt={post.profilepic} />
                        <p className='font-semibold'>{post.userName}</p>
                      </div>
                      <div className='relative'>
                      {hover === post.commentId &&(
                        <div>
                        <div key={post.commentId} className='absolute w-auto right-0 h-auto gap-2 flex'>
                        <div onClick={()=>showEdit(post.commentId)} className='flex cursor-pointer items-center gap-1 '><Icon icon="material-symbols:edit-outline" height='1.2em' width='1.2em' /></div>
                        <div onClick={()=>handleDeleteComment(post.commentId)} className='flex cursor-pointer hover:text-red items-center gap-1 '><Icon icon="material-symbols:delete-outline" height='1.2em' width='1.2em' /></div>
                        </div>
                        </div>
                      )}       
                      </div>          
                      </div>
                      {edit ===post.commentId ? <div className='flex items-center'><InputEmoji value={post.comment} onChange={(text)=>setPostComment(text)} /><Icon  onClick={() => handleEditComment(image.id, post.commentId, postComment)} className='text-cta cursor-pointer' icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth='2' /></div> : <span>{post.comment}</span>}
                      <div className='flex items-end gap-2'>
                      <Icon onClick={handleLike} className={`cursor-pointer h-5 w-5 text-pink`}
              icon={isClicked ? "material-symbols-light:favorite" : "material-symbols-light:favorite-outline"} width='1.2em' height='1.2em'/> 
              <span className='cursor-pointer hover:underline'>Reply</span>
               <span className='text-gray-500 text-sm'>{moment(post.timestamp).fromNow()}</span>
                        </div>
                      </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Photodisplay;

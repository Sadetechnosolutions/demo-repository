import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import { setpostLike } from '../slices/likeslice';
import InputEmoji from 'react-input-emoji';
import { addCommentnf, selectPhotoComment, deleteCommentnf, editComment, addToSaved } from "../slices/photoslice";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from './dropdownmenu';
import { v4 as uuidv4 } from 'uuid';
import Heart from 'react-heart';
import moment from "moment";
import Modal from 'react-modal';
import Operation from 'antd/es/transfer/operation';
import { comment } from 'postcss';
import axios from 'axios';

const Post = () => {
  const [filled, setFilled] = useState(false);
  const [comment, setComment] = useState(null);
  const [share, showShare] = useState(false);
  const [shareImage, setShareImage] = useState(null);
  const [shareVideo, setShareVideo] = useState(null);
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(null);
  const [saved, setSaved] = useState({});
  const [postComment, setPostComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null); // Manage dropdown visibility
  // const { newsfeed = [] } = useSelector((state) => state.photo);
  // const { selectedphotocomment } = useSelector((state) => state.photo);
  // const postliked = useSelector((state) => state.like.postliked);
  // const postlikeCount = useSelector((state) => state.like.postlikeCount);
  // const { Saved } = useSelector((state) => state.photo);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const [user, setUser] = useState();
  const [deletePopup,setDeletePopup] = useState(false)
  const [deleteId,setDeleteId] = useState('')
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [displayComments,setDisplayComments] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [replyInputVisible, setReplyInputVisible] = useState({}); 
  const [replyId,setReplyId] = useState('');
  const [nestedVisibleReplies, setNestedVisibleReplies] = useState({});
  const [like,setLike] = useState(false);
  const [postLiked,setPostLiked] = useState({})
  const [likeCount,setLikeCount] = useState({});
  const [users,setUsers] = useState()

  const toggleFill = () => {
    setFilled(prev => !prev);
  };

  const openDelete = ()=>{
    setDeletePopup(true)
  }                   

  const closeDelete = ()=>{
    setDeletePopup(false)
  }
  const toggleReplies = (commentId) => {
    setVisibleReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));

    
  };
  const renderReplies = (replies, postId, parentCommentId = null) => {
    return replies.slice().reverse().map(reply => (
      <div key={reply.id} className='flex border py-2 px-4 rounded-3xl flex-col shadow-md w-full gap-2'>
        <div className='flex gap-1'>
          <img className='w-9 h-9 rounded-full' src={reply.profilePic} alt={reply.profilePic} />
          <span>{user?.name}</span>
        </div>
        <span>{reply.textContent}</span>
        <div className='flex w-auto justify-between'>
        <Icon 
          onClick={() => toggleReplyInput(reply.id, postId)} 
          className="cursor-pointer h-6 w-6 text-gray-600" 
          icon="iconamoon:comment-light" 
        />
    
        {replyInputVisible[reply.id] && (
          <div className="flex items-center bg-black gap-2 mt-2">
            <InputEmoji
              value={postComment}
              onChange={(text) => setPostComment(text)}
              placeholder="Write a reply..."
            />
            <Icon 
              onClick={() => handleComment(reply.id, postId)} 
              className='text-cta cursor-pointer' 
              icon="majesticons:send" 
              width="1.5em" 
              height="1.6em" 
              strokeWidth='2' 
            />
          </div>
        )}
    
        {/* Toggle visibility of nested replies */}
        <span 
          onClick={() => setNestedVisibleReplies(prev => ({
            ...prev,
            [reply.id]: !prev[reply.id]
          }))}
          className='cursor-pointer'
        >
          {reply.replies && reply.replies.length > 0 && (
            <span>{nestedVisibleReplies[reply.id] ? 'Hide replies' : 'View replies'} ({reply.replies.length})</span>
          )}
        </span>
        </div>
        {/* Recursively render nested replies */}
        {nestedVisibleReplies[reply.id] && reply.replies && reply.replies.length > 0 && (
          <div className="ml-4">
            {renderReplies(reply.replies, postId, reply.id)}
          </div>
        )}
      </div>
    ));
  };
  

  const toggleReplyInput = (commentId,replyid) => {
    setReplyInputVisible(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
    setReplyId(commentId)
    setSelectedPostId(replyid)
  };
  
  // Fetch user data
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
        setUser(data);
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    if (shouldRefetch) {
      fetchUserData(); // Refetch data
      setShouldRefetch(false); // Reset flag
    }
  }, [shouldRefetch]);
  
  useEffect(() => {
    if (userId) {
      fetchUserName();
    }
  }, [userId]);

  // Fetch posts
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await fetch(`http://localhost:8080/posts/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Handle saved posts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts'));
    if (savedPosts) {
      setSaved(savedPosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(saved));
  }, [saved]);

  // Handle dropdown menu actions
  const handleEdit = (postId) => {
    console.log('Edit post with ID:', postId);
    setEdit(postId);
  };

  const handleDelete = (postId) => {
    console.log('Delete post with ID:', postId);
    setDeleteId(postId)
  };

  const toggleDropdown = (postId) => {
    setShowDropdown(prev => (prev === postId ? null : postId)); // Toggle visibility
  };

  const handleSave = (id) => {
    setSaved(prevSaved => ({
      ...prevSaved,
      [id]: !prevSaved[id]
    }));
  };

  const toggleComment = (postId) => {
    setComment(prev => {
      if (prev === postId) {
        return null;
      } else {
        setSelectedPostId(postId)
        fetchComments(postId);  // Ensure postId is valid and passed correctly
        return postId;
      }
    });
  };
  
  const fetchLikes = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const response = await fetch(`http://localhost:8080/likes/post/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        // Check if the logged-in user is in the list of users who liked the post
        const userHasLiked = data.some(like => like.userId === userId);
        setLike(prev => ({
          ...prev,
          [postId]: userHasLiked
        }));
      } else {
        console.error('Failed to fetch likes:', response.status);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  useEffect(() => {
    if (userData.length > 0) {
      userData.forEach(post => {
        if (post.postId) {
          fetchComments(post.postId); // Fetch comments for each post
          fetchLikes(post.postId); // Fetch likes for each post
          likesCount(post.postId); // Fetch like counts for each post
        }
      });
    }
  }, [userData]);
  

  const handleShowShare = (post) => {
    showShare(post);
  };

  const closeShare = () => {
    showShare(false);
  };

  const handleSaved = (id) => {
    console.log(dispatch(addToSaved(id)));
  };

  const handleEditComment = (imageId, commentId, newComment) => {
    console.log(dispatch(editComment({ imageId, commentId, newComment })));
    setEdit(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8080/posts/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setShouldRefetch(true);
        closeDelete();
        setDeleteId('');
      } else {
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while attempting to submit.');
    }
  };

  const handleComment = async (e) => {
    const parentComment = displayComments[selectedPostId]?.find(comment => comment.id === replyId);
    const jsonData = {
      postId: selectedPostId,
      parentId: replyId,
      repliedToUserId: parentComment ? parentComment.userId : '',
      userId: userId,
      textContent: postComment
    };
    try {
      const response = await fetch('http://localhost:8080/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      if (response.ok) {
        setPostComment('');
        setSelectedPostId('');
        setReplyId('');
        toggleReplies(replyId);  // Close the reply input
      } else {
        console.log('An error occurred. Please try again later.');
        setPostComment('');
        setSelectedPostId('');
        setReplyId('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setPostComment('');
      setSelectedPostId('');
      setReplyId('');
    }
  };

  const handleLikes = async (postId) => {
    const jsonData = {
      postId:postId,
      userId:userId
    };
    try {
      const response = await fetch(`http://localhost:8080/likes/toggle?postId=${postId}&userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });
  
      if (response.ok) {
        setSelectedPostId('') // Close the reply input
      } else {
        console.log('An error occurred. Please try again later.');
        setSelectedPostId('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSelectedPostId('');
    }
  };

  const fetchComments = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in localStorage');
      }
  
      const response = await fetch(`http://localhost:8085/comments/post/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch comments: ${response.status} ${errorText}`);
      }
  
      const data = await response.json();
      setDisplayComments(prevComments => ({
        ...prevComments,
        [postId]: data
      }));
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  const likesCount = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/likes/post/${postId}/count`);
      if (response.ok) {
        const data = await response.json();
        setLikeCount(prevCounts => ({
          ...prevCounts,
          [postId]: data
        }));
      }
    } catch (error) {
      console.error('Error fetching like count:', error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/auth/users/descending');
      const usersData = response.data.map(user => ({
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
  useEffect(() => {
    if (userData.length > 0) {
      userData.forEach(post => {
        if (post.postId) {
          fetchComments(post.postId); // Fetch comments for each post
        }
      });
    }
  }, [userData]);

  useEffect(() => {
    if (userData.length > 0) {
      userData.forEach(post => {
        if (post.postId) {
          fetchComments(post.postId); // Fetch comments for each post
          likesCount(post.postId); // Fetch like counts for each post
        }
      });
    }
  }, [userData]);
  
  
  console.log(postComment)
  const handleLike = async (postId) => {
    await handleLikes(postId);
    await fetchLikes(postId); // Re-fetch to update like state
    await likesCount(postId); // Fetch and set like count for the specific post
  };
  
  
  const isLiked = (postId) => like[postId] || false;
  return (
    <form onSubmit={handleSubmit} className="rounded-md flex flex-col bg-white gap-16 shadow-lg w-full py-2 px-4">
      {userData?.map((post) =>{ 
                     const postTime = () => {
                      const pastDate = moment(post.createdAt);
                      const now = moment();
                
                      const diffInDays = now.diff(pastDate, 'days');
                      const diffInHours = now.diff(pastDate, 'hours');
                      const diffInMinutes = now.diff(pastDate, 'minutes');
                
                      let displayText = '';
                
                      if (diffInDays > 0) {
                        displayText = `${diffInDays}d${diffInDays > 1 ? ' ago' : ''}`;
                      } else if (diffInHours > 0) {
                        displayText = `${diffInHours}h${diffInHours > 1 ? ' ago' : ''}`;
                      } else if (diffInMinutes > 0) {
                        displayText = `${diffInMinutes}m${diffInMinutes > 1 ? ' ago' : ''}`;
                      } else {
                        displayText = 'Just now';
                      }
                
                      return displayText;
                    };
                
                    const posttime = postTime();
        return(
        <div className='w-3/5 flex flex-col gap-4 shadow-lg py-4 px-4 relative' key={post.postId}>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img className="rounded-full w-11 h-11" src={`http://localhost:8086${post?.profileImagePath}`} alt="Profile" />
              <div className="flex flex-col">
                <span className="font-semibold">
        
      </span>
                <span className="text-sm text-gray-600">{posttime}</span>
              </div>
            </div>
            <div className="flex flex-col items-center relative"> {/* Ensure dropdown menu is positioned correctly */}
              <Icon
                className="w-6 h-6 cursor-pointer"
                icon="carbon:overflow-menu-vertical"
                onClick={() => toggleDropdown(post.postId)} // Toggle dropdown for specific post
              />
              {showDropdown === post.postId && (
                <DropdownMenu
                  onEdit={() => handleEdit(post.postId)}
                  onDelete={() => {handleDelete(post.postId);openDelete()}}
                  onClose={() => setShowDropdown(null)} // Close dropdown
                />
              )}
            </div>
          </div>
          <span>{post.description}</span>
          {post.postType == 'IMAGE' ? (
            <img className='w-full h-[40rem]' src={`http://localhost:8086${post.imageUrl}`} alt={`http://localhost:8086${post.imageUrl}`}  />
          ) : post.postType == 'VIDEO' ? (
            <video className='w-full h-[40rem]' controls>
              <source src={`http://localhost:8086${post.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
          <div className='flex gap-4 items-center'>
          <Icon onClick={()=>{handleLike(post.postId)}}
              className={`cursor-pointer h-7 w-7 text-pink`} icon={isLiked(post.postId) ? "material-symbols-light:favorite" : "material-symbols-light:favorite-outline"} width='1.2em' height='1.2em'/> {likeCount[post.postId] || 0}
          <Icon onClick={() => toggleComment(post.postId)} className="cursor-pointer h-6 w-6 text-gray-600" icon="iconamoon:comment-light" /></div>

          {comment === post.postId && (   <div className="flex items-center gap-2"><label className="cursor-pointer"><Icon className="w-7 h-7 text-gray-500" icon="mdi:camera-outline" /><input  className="absolute opacity-0" type="file" /></label><InputEmoji onChange={(text) => setPostComment(text)} placeholder="Add a comment" /><Icon onClick={handleComment} className='text-cta cursor-pointer' icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth='2' /></div>)}
          {displayComments[post.postId]?(
  displayComments[post.postId].map((comment) => {

    return(
    <div>
<div key={comment.id} className='flex border py-2 px-4 rounded-3xl flex-col shadow-md w-full gap-2'>
<div className='flex justify-between'>
<div className='flex gap-2 items-center'>
<img className='rounded-full h-9 w-9' src={post.profilepic} alt={post.profilepic} />
<div className='flex flex-col'>
<p className='font-semibold'>{user.name}</p>
<span className='text-sm'></span>
</div>
</div>
<div className='relative'>
</div>          
</div>
<span>{comment.textContent}</span>
{/* {edit ===post.commentId ? <div className='flex items-center'><InputEmoji value={post.comment} onChange={(text)=>setPostComment(text)} /><Icon  onClick={() => handleEditComment(image.id, post.commentId, postComment)} className='text-cta cursor-pointer' icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth='2' /></div> : <span>{post.comment}</span>} */}
<div className='flex items-end gap-2'>
{/* <Icon onClick={handleLike} className={cursor-pointer h-5 w-5 text-pink}
icon={isClicked ? "material-symbols-light:favorite" : "material-symbols-light:favorite-outline"} width='1.2em' height='1.2em'/>  */}
<div className='flex items-center w-full justify-between'>
<Icon onClick={() => toggleReplyInput(comment.id,post.postId)} className="cursor-pointer h-6 w-6 text-gray-600" icon="iconamoon:comment-light" /><span onClick={() => toggleReplies(comment.id)} className='cursor-pointer'>{comment.replies.length>0?<span>{visibleReplies[comment.id] ? 'Hide replies' : 'View replies'} ({comment.replies.length})</span>:<span></span>}</span>
</div>
<span className='text-gray-500 text-sm'></span>
</div>

{visibleReplies[comment.id] && renderReplies(comment.replies, post.postId)}
{replyInputVisible[comment.id] && (
                  <div className="flex items-center gap-2 mt-2">
                    <InputEmoji
                      value={postComment}
                      onChange={(text) => setPostComment(text)}
                      placeholder="Write a reply..."
                    />
                    <Icon onClick={handleComment} className='text-cta cursor-pointer' icon="majesticons:send" width="1.5em" height="1.6em" strokeWidth='2' />
                  </div>
                )}       
</div>

</div>
  )})
) : (
  <div className="text-gray-500">No comments yet</div>
)}

        </div>
      )})}
              <Modal  appElement={document.getElementById('root')}
style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-40%, -20%)',
          width: '80%',
          height: '60%',
          overflowY: 'auto',
          border:'none'
        },}}
        isOpen={deletePopup} onRequestClose={closeDelete}>
      <div className='relative bg-white h-36 ml-72 w-1/3 rounded-md flex rounded-lg shadow-lg flex-col items-center justify-center gap-4'>
      <span className='text-lg font-semibold'>Are you sure you want to delete</span>
      <div className='flex w-full justify-center gap-4'><button onClick={closeDelete} className='w-16 px-2 rounded-md hover:bg-gray-100 bg-gray-200 py-1'>Cancel</button><button onClick={handleSubmit} className='w-16 px-2 bg-red text-white hover:opacity-85 rounded-md py-1'>Yes</button></div>
      <Icon onClick={closeDelete} className='absolute cursor-pointer top-2 right-2' icon="mdi:remove" />
    </div>
 </Modal>
    </form>
  );
};

export default Post;
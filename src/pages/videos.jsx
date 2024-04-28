import React,{useState} from 'react'
import { Player,LoadingSpinner,BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import '../styles.css'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSelector,useDispatch } from 'react-redux';
import Modal from 'react-modal';
import PostVideo from '../components/uploadvideo';
import Uploadvideofolder from '../components/uploadvideofolder';
import { IoClose } from 'react-icons/io5';
import Createvideoalbum from '../components/createvideoalbum';
import { selectVideo } from '../slices/videoslice';
import { Link } from 'react-router-dom';

const Videos = () => {
  const dispatch = useDispatch();
  const [uploadVideo, showuploadVideo] = useState(false);
  const [video,showVideo] = useState(false);
  const [Folder,showUploadFolder] = useState(false);
  const [createAlbum,showCreateAlbum] = useState(false);

  const selectedVideo = (event) => {
    const file = event.target.files[0];
    const fileObject = { name: file.name };
    dispatch(selectVideo(fileObject));
    openPostVideo();
};

  const openCreateAlbum = ()=>{
    showCreateAlbum(true);
    closeuploadVideo()
  }
  const openPostVideo = ()=>{
    showVideo(true);
    closeuploadVideo();
  }
  const openUploadFolder = ()=>{
    showUploadFolder(true);
    closeuploadVideo();
  }
  
  const openuploadVideo = () => {
    showuploadVideo(true);
  };

  const closeuploadVideo = () => {
    showuploadVideo(false);
  };

  const closePopups = () => {
    showuploadVideo(false);
    showVideo(false);
    showUploadFolder(false);
    showCreateAlbum(false);
  };

  const {videos} = useSelector((state)=>state.video)
  return (
    <div className='flex items-center justify-center w-full '>
          <Modal appElement={document.getElementById('root')} style={{
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
 isOpen={uploadVideo} onRequestClose={closeuploadVideo}>
        <div className='flex  w-full items-center justify-center'>
      <div className='w-1/2 h-96 flex flex-col p-4 gap-4 shadow-lg rounded-md bg-white'>
        <div className='flex justify-between p-2 items-center justify-center'><span className='font-semibold text-lg'>Upload </span><div onClick={closeuploadVideo} className='cursor-pointer bg-gray-200 p-1 hover:bg-red hover:text-white rounded-full'><IoClose className='h-5 w-5 cursor-pointer'/></div></div>
        <div className='w-full h-full flex flex-col items-center gap-6 justify-center'>
        <div className='p-2 cursor-pointer border flex items-center justify-center gap-1 w-1/2 rounded-md border-cta text-cta hover:bg-cta hover:text-white'>
            <label className='cursor-pointer'>
              <span className='flex items-center gap-1'><Icon icon="material-symbols:image-outline" width="1.2em" height="1.2em" />Upload Video</span>
              <input id='uploadVideo' onChange={selectedVideo} type='file' accept='video/*' className='absolute  opacity-0 cursor-pointer' />
            </label>
          </div>
      <button onClick={openUploadFolder} className='p-2 border flex items-center justify-center gap-1 w-1/2 rounded-md border-cta text-cta hover:bg-cta hover:text-white'><Icon icon="ph:folder-duotone" width="1.2em" height="1.2em" /><span>Upload Folder</span></button>
      <button onClick={openCreateAlbum} className='p-2 border flex items-center justify-center gap-1 w-1/2 rounded-md border-cta text-cta hover:bg-cta hover:text-white'><Icon icon="ic:twotone-add" width="1.2em" height="1.2em"/><span>Create Album</span></button>
      </div>
      </div>
    </div>
    </Modal>
    <Modal appElement={document.getElementById('root')} style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-50%, -50%)',
          width: '80%', // Adjust width as needed
          height: '80%', // Limit height to 80% of viewport height
          overflowY: 'auto',
          border:'none'
        },}}
 isOpen={video} onRequestClose={closePopups}>
  <PostVideo close={closePopups} />
  </Modal>
  <Modal appElement={document.getElementById('root')} style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-50%, -50%)',
          width: '80%', // Adjust width as needed
          height: '80%', // Limit height to 80% of viewport height
          overflowY: 'auto',
          border:'none'
        },}}
 isOpen={Folder} onRequestClose={closePopups}>
  <Uploadvideofolder close={closePopups} />
  </Modal>
  <Modal appElement={document.getElementById('root')} style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundColor:'transparent',
          transform: 'translate(-50%, -50%)',
          width: '80%', // Adjust width as needed
          height: '80%', // Limit height to 80% of viewport height
          overflowY: 'auto',
          border:'none'
        },}}
 isOpen={createAlbum} onRequestClose={closePopups}>
  <Createvideoalbum close={closePopups} />
  </Modal>
      <div className='w-5/6 p-2 rounded-md shadow-lg'>
        <div className='p-2'>
        <p className='text-lg font-semibold'>Videos ({videos.length})</p>
        </div>
        {/* <div className='flex flex-wrap gap-8 p-2'>
          <div className='w-52 h-[120px] cursor-pointer flex items-center justify-center border rounded-md bg-gray-50'>
            <label className='cursor-pointer' ><span className='flex flex-col items-center'><Icon className='text-cta' icon="zondicons:add-solid" width="1.2em" height="1.2em"   />Upload</span>
              <input className=' absolute opacity-0' accept='video/*' type='file'/>
            </label>
          </div> */}
          <div className='flex flex-wrap gap-8 p-2'>
          <div onClick={openuploadVideo} className='w-52 flex bg-gray-50 cursor-pointer items-center justify-center'>
            <label className='cursor-pointer'>
              <span className='flex flex-col items-center gap-2'><Icon className='text-cta' icon="zondicons:add-solid" width="1.2em" height="1.2em"   />Upload</span>
            </label>
          </div>
          
           {videos.slice().reverse().map((video)=>(
            <div key={video.id}>
                <Link to={`/videos/${video.id}`}><div className='w-52 rounded-md'>
            <Player controls>
                <source src={video.name} />
                <LoadingSpinner />
                <BigPlayButton position='center' />
            </Player>
            </div></Link>
            </div>
           ))}
           </div>
           </div>
        </div>

  )
}

export default Videos

import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { selectPhoto } from '../slices/photoslice'
import { useDispatch,useSelector } from 'react-redux'
import Postphoto from '../components/uploadphoto'
import { IoClose } from "react-icons/io5";
import Modal from 'react-modal';
import Uploadfolder from '../components/uploadfolder'
import Createalbum from '../components/createalbum'
import { NavLink } from 'react-router-dom'

const Photos = () => {
  const [uploadPhoto, showuploadPhoto] = useState(false);
  const [postPhoto,showPost] = useState(false);
  const [Folder,showUploadFolder] = useState(false);
  const [createAlbum,showCreateAlbum] = useState(false);
  const openCreateAlbum = ()=>{
    showCreateAlbum(true);
    closeuploadPhoto()
  }

  const {uploaded} = useSelector((state)=>state.photo)

  const dispatch = useDispatch();

  const openPostPhoto = ()=>{
    showPost(true);
    closeuploadPhoto();
  }
  const openUploadFolder = ()=>{
    showUploadFolder(true);
    closeuploadPhoto()
  }

  const openuploadPhoto = () => {
    showuploadPhoto(true);
  };

  const closePopups = ()=>{
    showUploadFolder(false);
    showPost(false);
    showuploadPhoto(false);
    showCreateAlbum(false);
  }

  const closeuploadPhoto = () => {
    showuploadPhoto(false);
  };
  const selectedPhoto = (event) => {
      const file = event.target.files[0];
      const fileObject = { name: file.name };
      console.log(fileObject);
     dispatch(selectPhoto(fileObject));
      openPostPhoto();
  };

  return (
    <>
    <div className='w-full flex items-center justify-center'>
    <Modal appElement={document.getElementById('root')}
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
  isOpen={uploadPhoto} onRequestClose={closeuploadPhoto}>
        <div className='flex  w-full items-center justify-center'>
      <div className='w-1/2 h-96 flex flex-col p-4 gap-4 shadow-lg rounded-md bg-white'>
        <div className='flex justify-between p-2 items-center justify-center'><span className='font-semibold text-lg'>Upload</span><div onClick={closeuploadPhoto} className='cursor-pointer bg-gray-200 p-1 hover:bg-red hover:text-white rounded-full'><IoClose className='h-5 w-5 cursor-pointer'/></div></div>
        <div className='w-full h-full flex flex-col items-center gap-6 justify-center'>
        <div className='p-2 cursor-pointer border flex items-center justify-center gap-1 w-1/2 rounded-md border-cta text-cta hover:bg-cta hover:text-white'>
            <label className='cursor-pointer'>
              <span className='flex items-center gap-1'><Icon icon="material-symbols:image-outline" width="1.2em" height="1.2em" />Upload Image</span>
              <input id='uploadphoto' onChange={selectedPhoto} type='file' accept='image/jpeg, image/png' className='absolute  opacity-0 cursor-pointer' />
            </label>
          </div>
      <button onClick={openUploadFolder} className='p-2 border flex items-center justify-center gap-1 w-1/2 rounded-md border-cta text-cta hover:bg-cta hover:text-white'><Icon icon="ph:folder-duotone" width="1.2em" height="1.2em" /><span>Upload Folder</span></button>
      <button onClick={openCreateAlbum} className='p-2 border flex items-center justify-center gap-1 w-1/2 rounded-md border-cta text-cta hover:bg-cta hover:text-white'><Icon icon="ic:twotone-add" width="1.2em" height="1.2em"/><span>Create Album</span></button>
      </div>
      </div>
    </div>
    </Modal>
    <Modal appElement={document.getElementById('root')}
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
          height: '80%',
          overflowY: 'auto',
          border:'none'
        },}}
 isOpen={postPhoto} onRequestClose={closePopups}>
  <Postphoto close={closePopups} />
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
          width: '80%',
          height: '80%', 
          overflowY: 'auto',
          border:'none'
        },}}
 isOpen={Folder} onRequestClose={closePopups}>
  <Uploadfolder close={closePopups} />
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
          width: '80%',
          height: '80%', 
          overflowY: 'auto',
          border:'none'
        }}}
 isOpen={createAlbum} onRequestClose={closePopups}>
  <Createalbum close={closePopups} />
  </Modal>
        <div className='flex flex-col w-5/6 shadow-lg drop'>
        <div className='font-semibold text-lg p-4'>Photos ({uploaded.length})</div>
        <div className='flex flex-wrap p-2 gap-8'>
          <div onClick={openuploadPhoto} className='w-72 flex bg-gray-50 cursor-pointer items-center justify-center'>
            <label className='cursor-pointer'>
              <span className='flex flex-col items-center gap-2'><Icon className='text-cta' icon="zondicons:add-solid" width="1.2em" height="1.2em"   />Upload</span>
            </label>
          </div>
        {uploaded.slice().reverse().map((photo)=>{
          return(
          <div key={photo.id} className='inline-block cursor-pointer relative overflow-hidden'>
  <NavLink key={photo.id} to={`/photos/${photo.id}`}><div style={{backgroundImage:`url(${photo.name})`}} className='w-72 h-56 rounded-md cursor-pointer bg-cover bg-no-repeat bg-center transition-transform duration-300 hover:scale-110'>
    {photo.name? null : <p className='bg-black text-semibold'>{photo.desc}</p>}
  </div></NavLink>
  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-80 transition-opacity duration-300'>
    <div className='flex items-center bg-black bg-opacity-60  justify-between px-6 py-4 text-lg'>
      <div className='flex items-center gap-1'>
        <Icon className='text-cta' icon="ph:heart-fill" width="1.4em" height="1.4em" />
        <span className='text-sm text-white'>{photo.likes ? photo.likes : 0}</span>
      </div>
      <span className='text-sm text-white'>{photo.postedTime}</span>
    </div>
  </div>
</div>
)})}
        </div>
        </div>
    </div>
    </>
  )
}

export default Photos;

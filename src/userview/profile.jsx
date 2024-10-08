import React from 'react'
import { Icon } from '@iconify/react';
import {Tooltip } from 'react-tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import Videocomp from '../components/videocomp';
import Photoscomp from '../components/photoscomp';
import Friendscomp from './friends';

const ProfileView = () => {
  const navigate = useNavigate()
  const {userID} = useParams()

  const openPhotos = ()=>{
    navigate(`/photosview/${userID}`,window.scrollTo(0, 0))
  }
  const personal = {
      profile: [
        { id: 1,name:'Peter Parker',aboutme:'Hi, I’m Peter Parker, I’m 36 and I work as a Professional Cinematographer from Ontario, Canada, my proclaimed works are “dewwater” and "Sunbeast"',birthday:'December 17, 1985', phno: '+1-989-232435234', bloodgroup: 'B+',gender:'Male',country:'San Francisco, US',occupation:'Cinematographer',joined:'December 20,2021', email:'peterparker07@design.com' },
      ]
    }

    const general = {
      profile: [
        { id: 1,hobbies:'I like to ride the bicycle, swimming, and working out. I also like reading design magazines, and searching on internet, and also binge watching a good hollywood Movies while it’s raining outside.',Education:'Master of computer science, sixteen years degree From Oxford Uniersity, London ',Interests:[{id:'1',activity:'Swimming'},{id:'2',activity:'Photography'},{id:'3',activity:'Street Art'},{id:'4',activity:'Anime'},{id:'4',activity:'Anime'},{id:'4',activity:'Anime'},],  Workexperience: [{id:1,work:'Assistant Cinematographer,',experience:'Assisted in camera setup and various operations'},{id:2,work:'Cinematographer,', experience:'Camera operations for production, shot division decisions and ensuring high quality visuals'}],}
      ]
    }
    const social = {
      media:[{
        id:1,
        icon:<Icon icon="mage:facebook" width="1.2em" height="1.2em" />
      },
    {
      id:2,
      icon:<Icon icon="prime:twitter" width="1.2em" height="1em" />
    },
  {
    id:3,
    icon:<Icon icon="ri:instagram-fill" width="1.2em" height="1.2em" />
  },
{
  id:4,
  icon:<Icon icon="mdi:youtube" width="1.2em" height="1.2em" />
}]
    }

  return (
    <>
    <div className='md:flex bg-black  sm:flex xs:flex-col gap-4 w-full justify-center'>
  <div className='flex py-4 px-6 drop bg-white shadow-lg  rounded-md h-[860px] sm:w-1/3 flex-col'>
    <div className='flex gap-2 items-center justify-between py-4 border-b border-gray-170 '>
      <span className='font-semibold text-lg'>Personal Info</span>
    </div>
    <div>
      {personal.profile.map((profile) => (
        <div key={profile.id} className='flex flex-col text-sm cursor-pointer justify-between gap-6 py-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="ic:round-person" width="1.2em" height="1.2em"  /> <span>About Me:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className='text-sm cursor-pointer'>{profile.aboutme}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="heroicons:cake-16-solid" width="1.2em" height="1.2em" /> <span>Birthday:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className='text-sm cursor-pointer'>{profile.birthday}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="solar:phone-bold" width="1.2em" height="1.2em"  /> <span>Phone Number:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className='text-sm cursor-pointer '>{profile.phno}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-end px-4 bg-none border-cta text-cts hover bg-cta hover:text-white'>
            <p className='flex gap-2 text-white bg-blsck cta hover:bg-cta '><span></span></p>
            </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="fontisto:blood-drop" width="1em" height="1em" /> <span>Blood Group:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer'>{profile.bloodgroup}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="el:person" width="1.2em" height="1.2em" /> <span>Gender:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer'>{profile.gender}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="entypo:globe" width="1em" height="1em" /> <span>Country:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer'>{profile.country}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="ion:briefcase" width="1.2em" height="1.2em"  /> <span>Occupation:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className='cursor-pointer '>{profile.occupation}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="fa6-solid:handshake" width="1.2em" height="1.2em" /> <span>Joined:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer '>{profile.joined}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex font-semibold items-center gap-1.5'>
            <Icon icon="ic:round-email" width="1.2em" height="1.2em" /> <span>Email & Website:</span>
            </div>
            <div className='flex flex-col'>
              <div className='px-6 text-md '>
                <span className=' cursor-pointer text-cta'>{profile.email}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  <div style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }} className='flex xs:flex-col text-sm flex-col overflow-auto overflow-x-hidden h-[860px] gap-8'>
  <div className='flex  px-6 drop py-4  shadow-lg rounded-md h-auto w-[800px] bg-white flex-col'>
  <div className='flex gap-2 items-center= justify-between py-4 border-b border-gray-170 '>
      <span className='font-semibold  text-lg'>General Info</span>
    </div>
    <div className='flex  py-6 gap-8'>
    {general.profile.map((profile)=>(
      <div key={profile.id} className='sm:flex xs:flex-col'>
      <div className='flex flex-col gap-8 w-1/2'>
          <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="tabler:puzzle-filled" width="1.2em" height="1.2em" /><span>Hobbies</span>
          </div>
          <div className='flex flex-col'>
            <div className=' text-md '>
              <span className=' cursor-pointer'>{profile.hobbies}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="fluent:calendar-work-week-28-filled" width="1.2em" height="1.2em"/> <span>Interests</span>
          </div>
          <div className='flex w-full flex-col'>
            <div className='w-full flex-wrap flex gap-4 text-md '>
            {profile.Interests.map((interest) => (
      <div key={interest.id} className='flex  px-2 py-1 w-auto justify-center items-center rounded-md border border-cta cursor-pointer text-cta'>
        {interest.activity}
      </div>
    ))}
            </div>
          </div>
        </div>
        </div>
        <div className='flex w-1/2 flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="zondicons:education" width="1.2em" height="1.2em" /> <span>Education</span>
          </div>
          <div className='flex flex-col'>
            <div className=' text-md '>
              <span className=' cursor-pointer'>{profile.Education}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex font-semibold items-center gap-1.5'>
          <Icon icon="ic:round-email" width="1.2em" height="1.2em" /> <span>Work Experience</span>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col text-md gap-6 '>
              {profile.Workexperience.map((profession)=>(
<div key={profession.id} className='flex flex-col'>
<span className='text-cta cursor-pointer'>{profession.work}</span>
<span>{profession.experience} of experience</span>
</div>
)) 
  }
            </div>
          </div>
        </div>
        </div>
        </div>
    ))}
    </div>
   <div className='flex items-start gap-8'>
   <div className='flex w-[800px] flex-col gap-4 '>
    <div className='flex gap-2 items-center'>
   <Icon icon="teenyicons:share-solid" width="1em" height="1em" /><span className='font-semibold'>Social Media</span>
   </div>
   <div className='flex gap-4'>
{social.media.map((socialmedia)=>(

<div className='bg-gray-200 p-2 hover:bg-cta hover:text-white cursor-pointer items-center duration-500 ease-in-ease-out rounded-full'>{socialmedia.icon}</div>

)
)}
   </div>
   </div>
      {/* <div className='flex w-[800px] flex-col gap-2 '>
    <div className='flex gap-2 items-center'>
   <Icon icon="teenyicons:share-solid" width="1em" height="1em" /><span className='font-semibold'>Badges</span>
   </div>
   <div className='flex gap-4'>
<span className=''>{}</span>
   </div>
   </div> */}
   
   </div>
  </div>
  
  <Friendscomp />
  <Photoscomp seeallPhotos={openPhotos}/>
  <Videocomp />
  </div>
  <Tooltip id="my-tooltip "  />
</div>
</>

  )
}

export default ProfileView;






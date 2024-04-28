import React, { useState } from 'react'
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import Languages from '../components/languages';
import { NavLink } from 'react-router-dom';

const Signin = () => {
    const [languages,setLanguages] = useState(false);
    const [active,setActive] = useState(false);

    const handleShowLanguages = ()=>{
        setLanguages(!languages);
    }
    const handleActive = ()=>{
        setActive(!active);
    }
    const info = [
    {
        id:1,
        heading:"Destiny ©2021"
    },
    {
        id:2,
        heading:"Sign up",
        path:"/signup"
    },
    {
        id:3,
        heading:"Sign in"
    },
    {
        id:4,
        heading:"Create ad"
    },
    {
        id:5,
        heading:"Create page"
    },
    {
        id:6,
        heading:"User Agreement"
    },
    {
        id:7,
        heading:"Privacy policy"
    },
    {
        id:8,
        heading:"Community Guidelines"
    },
    {
        id:9,
        heading:"Cookie policy"
    },
    {
        id:10,
        heading:"Copyright policy"
    },]
    return (
        <>
         <div style={{fontFamily:'revert-layer'}}  className="bg-[image-url]  min-h-screen justify-center justify-between items-center bg-gradient-to-tr from-span-start to-span-end pt-20 pr-40 pl-40 flex flex-col ">
          <div  className='w-full text-font-mono flex items-center justify-between mb-40'>
            <div className='flex flex-col w-1/3'>
              <img className='w-85 h-38' src='logo.png' alt='logo' />
            </div>
            <div className='flex flex-col bg-white px-4 rounded-md justify-center items-center md:w-2/5 py-6'>
              <div className='flex mt-6 wd-full items-center gap-5 mb-6'>
          <div className='flex gap-2'>
          <input className='checked:bg-blue-500  form-radio' type="radio" name="option" checked={true} value="Individual" />
          <label>Individual</label>
          </div><span>|</span>
          <div className='flex gap-2'>
            <input type="radio" name="option" value="Identifier"/>
            <label>Identifier</label>
          </div>
          <div className='flex items-center relative'>
              <div className='flex flex-col'>
              <div className='flex items-center'>
              <p>Language</p>
              <div className=''>{active ? <FaCaretUp onClick={()=>{handleActive(); handleShowLanguages()}} /> : <FaCaretDown  onClick={()=>{handleActive(); handleShowLanguages()}}  />}</div>
              </div>
              {languages && <Languages />}
              </div>
              </div>
          </div>
          <div className='flex flex-col w-full md:w-3/4 lg:w-3/9 gap-3 mb-8'>
          <div className='flex gap-2 flex-col'>
          <label className='text-md'>Username <span className='text-red'>*</span></label>
          <input className=" px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type='text' required placeholder='Enter your username' />
          </div>
          <div className='flex gap-2 flex-col'>
          <label className='text-md'>Password <span className='text-red'>*</span></label>
          <input className=" px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type='password' required placeholder='Enter your password' />
          </div>
          <NavLink to='/forgotpassword'><p className='mb-5 text-sm hover:underline'>Forgot your password?</p></NavLink>
          <div className='flex flex-col text-center w-full gap-3' >
          <button className="px-4 py-2 items-center border border-gray-300 bg-gradient-to-tr from-span-start w-full to-span-end text-white-800 hover:bg-custom-hover text-white font-semibold rounded-md">Sign In</button>
          <p>I am a new member <NavLink to='/signup'><span className='text-highlight font-semibold hover:text-button cursor-pointer'>Sign Up Here</span></NavLink></p>
          </div>
          </div>
            </div>
          </div>
          <div className="flex flex-col w-full sm:items-center py-4 sm:gap-2 md:flex-row md:justify-center md:gap-3.5">
  {info.map((detail, index) => (
    <React.Fragment key={index}>
      <NavLink to={detail.path}><p className="cursor-pointer hover:text-white">{detail.heading}</p></NavLink>
      {index !== info.length - 1 && <span className="hidden md:inline-block">|</span>}
    </React.Fragment>
  ))}
</div>
         </div>
        </>
      );
}

export default Signin;

import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Resetpassword = () => {
  const navigate =useNavigate()
  const gotoSignin=()=>{
    navigate('/');
  }
  return (
    <>
    <div className='min-h-screen bg-gradient-to-tr from-span-start to-span-end text-center flex flex-col items-center justify-center'>
      <div className='border border-gray bg-white w-1/3 rounded-md'>
      <div className='mb-2 p-4 border-b'>Reset password</div>
      <div className='flex items-center flex-col p-6'>
      <p className='mb-4'>Enter your new password</p>
      <div className='flex mb-6 w-1/2 items-center flex-col gap-4'>
        <input className='px-3 py-2 text-sm border w-full border-gray rounded-md' type='text' placeholder='Enter your password'/>
        <input className='px-3 py-2 text-sm border w-full border-gray rounded-md' type='text' placeholder='Confirm your password'/>
      </div>
      <div className='flex gap-3'>
        <NavLink to='/'><button className='bg-gray border border-gray text-black hover:border-gray-400 py-2 px-4 rounded-md'>Cancel</button></NavLink>
        <button onClick={gotoSignin} className='bg-gradient-to-tr from-span-start to-span-end text-white py-2 px-4 rounded-md'>Confirm</button>
      </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Resetpassword

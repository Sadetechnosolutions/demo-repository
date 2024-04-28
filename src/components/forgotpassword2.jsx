import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forgotpassword2 = () => {
    const[input,setInput] = useState('');
    const[error,setError] = useState('')
    const navigate = useNavigate();

    const back = ()=>{
        navigate('/forgotpassword')
    }
    const reset = ()=>{
        if(input.length ===6){
            navigate('/resetpassword');
        }
        else if(input===''){
          setError('Please enter OTP that has sent to your Mobile and Email.');
        }
        else{
            setError('You have entered wrong code. Please try again. ');
        }
    }
  return (
    <>
      <div className='min-h-screen bg-gradient-to-tr from-span-start to-span-end flex items-center justify-center'>
        <div className='border  border-gray bg-white rounded-md w-1/3 h-1/2' >
        <div className='mb-2 text-center p-4 border-b'>Forgot password</div>
        <div className='flex flex-col p-6'>
        <div className='flex flex-col gap-2'>
        <div className='flex flex-col text-center items-center gap-1 mb-2'>
          <div className='flex flex-col gap-2'>
          <p>OTP</p>
          <input className='px-3 py-2 text-sm border w-full border-gray rounded-md focus:border-gray' type='number' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Enter your code' />
          </div>
          <div className='text-red'>{error}</div>
          </div>
          <div className='flex justify-center gap-3'>
          <button onClick={back} className='border border-gray bg-gray-100 text-black hover:border-gray-400 rounded-md py-2 px-4' >Back</button>
         <button onClick={reset} className='bg-gradient-to-tr from-span-start to-span-end py-2 px-4 text-white rounded-md'>Verify</button>
        </div>
      <div className='text-center'>
          <p className='inline underline-offset cursor-pointer text-sm text-gray-700'>Resend code</p>
          </div>
      </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default Forgotpassword2

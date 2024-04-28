import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Forgotpassword = () => {
  const [input, setInput] = useState('');
  const [error,setError] = useState('')
  const navigate= useNavigate();
  const gotoSignin = ()=>{
  navigate("/");
  }

const handleSendCode = () => {
  if (isValidEmail(input) || isValidMobileNumber(input)) {
    console.log('Sent code for email reset');
    navigate('/forgotpassword2')
  } 
  else if(input===''){
    setError('Please enter your Email/ Phone number');
  }
  else{
    setError('Invalid Email/ Phone number')
  }
};
function isValidMobileNumber(input) {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(input);
}

const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
  return (
    <>
      <div className='min-h-screen bg-gradient-to-tr from-span-start to-span-end flex items-center justify-center'>
        <div className='border items-center justify-center text-center bg-white border-gray rounded-md w-1/3 h-1/2' >
        <div className='mb-2 p-4 border-b'>Forgot password</div>
        <div className='flex flex-col p-6'>
        <p className='mb-4'>Reset your password in two quick steps</p>
        <div className='flex flex-col items-center gap-2'>
        <div className='flex w-1/2 flex-col gap-1 mb-2'>
          <p>Email/ Phone number</p>
          <input className='px-3 py-2 text-sm border w-full  border-gray rounded-md focus:border-gray' type='text' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Enter your Email/ Phone number' />
          </div>
          <div className='flex  gap-3'><button onClick={gotoSignin} className='border border-gray hover:border-gray-400 bg-gray-100 py-2 px-4 text-black rounded-md' >Back</button><button onClick={handleSendCode} className='bg-gradient-to-tr from-span-start to-span-end text-white py-2 px-4 rounded-md'>Send code</button></div>
          <div className='text-red'>{error}</div>
      </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Forgotpassword;

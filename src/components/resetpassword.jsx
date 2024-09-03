import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';

const Resetpassword = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.some(field => field === '') || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    const payload = {
      otp: otp.join(''),
      password,
      confirmPassword
    };
    try {
      const response = await fetch('http://localhost:8081/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        toast.success('Password has been changed successfully');
        setTimeout(() => navigate('/'), 5000);
        setOtp(Array(6).fill(''));
        setConfirmPassword('');
        setPassword('');
      } else {
        toast.error('Failed to submit data');
        console.error('Failed to submit data:', await response.text());
        setOtp(Array(6).fill(''));
        setConfirmPassword('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('An error occurred while resetting the password.');
    }
  };

  return (
    <>
      <div className='min-h-screen bg-gradient-to-tr from-span-start to-span-end text-center flex flex-col items-center justify-center'>
        <form onSubmit={handleVerifyOtp} className='border border-gray bg-white w-1/3 rounded-md'>
          <div className='mb-2 p-4 border-b'>Res Password</div>
          <p>OTP</p>
          <div className='flex gap-2'>
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                className='px-3 py-2 text-sm border w-12 border-gray rounded-md focus:border-gray text-center'
                type='text'
                maxLength='1'
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                value={value}
                placeholder='0'
              />
            ))}
          </div>
          <div className='flex items-center flex-col p-6'>
            <p className='mb-4'>Enter your new password</p>
            <div className='flex mb-6 w-1/2 items-center flex-col gap-4'>
              <input
                className='px-3 py-2 text-sm border w-full border-gray rounded-md'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className='px-3 py-2 text-sm border w-full border-gray rounded-md'
                type='password'
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='flex gap-3'>
              <NavLink to='/'><button className='bg-gray border border-gray text-black hover:border-gray-400 py-2 px-4 rounded-md'>Cancel</button></NavLink>
              <button type='submit' className='bg-gradient-to-tr from-span-start to-span-end text-white py-2 px-4 rounded-md'>Confirm</button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Resetpassword;

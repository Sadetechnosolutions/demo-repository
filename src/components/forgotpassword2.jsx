import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpassword2 = () => {

  const [otp, setOtp] = useState(Array(6).fill(''));


    const navigate = useNavigate();

    const back = ()=>{
        navigate('/forgotpassword')
    }
    const handleChange = (e, index) => {
      const { value } = e.target;
      if (/^[0-9]?$/.test(value)) { // Ensure value is a digit or empty
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);

          // Move focus to the next input if there is a value
          if (value && index < otp.length - 1) {
              document.getElementById(`otp-${index + 1}`).focus();
          }
      }
  };

  const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
          // Move focus to the previous input if the current input is empty and backspace is pressed
          document.getElementById(`otp-${index - 1}`).focus();
      }
  };
  
    // const reset = ()=>{
    //   const otpCode = otp.join('');
    //     if(otpCode.length ===6){
    //         navigate('/resetpassword');
    //     }
    //     else if(otpCode===''){
    //       setError('Please enter OTP that has sent to your Mobile and Email.');
    //     }
    //     else{
    //         setError('You have entered wrong code. Please try again. ');
    //     }
    // }
    const handleVerifyOtp = async (e) => {
      e.preventDefault();
      if (otp.some(field => field === '')) {
        toast.error('Please enter the complete OTP.');
        return;
      }
      const payload = {
          otp: otp.join('')  // Assuming OTP is an array of strings
        };

      try {
  
        console.log('Sending data:', JSON.stringify(payload));
        const response = await fetch('http://localhost:8081/api/auth/verifyOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          credentials: 'include'
        });
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
  
        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem('token', token);
          console.log('Form data submitted successfully');
          // navigate('/resetpassword');
        } 
        else {
          console.error('Failed to submit data:', await response.text());
        }
      } catch (error){
        console.error('Error submitting data:', error);
      }
    };
  return (
    <>
      <div className='min-h-screen bg-gradient-to-tr from-span-start to-span-end flex items-center justify-center'>
        <form onSubmit={handleVerifyOtp} className='border  border-gray bg-white rounded-md w-1/3 h-1/2' >
        <div className='mb-2 text-center p-4 border-b'>Forgot password</div>
        <div className='flex flex-col p-6'>
        <div className='flex flex-col gap-2'>
        <div className='flex flex-col text-center items-center gap-1 mb-2'>
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
          </div>
          <div className='flex justify-center gap-3'>
          <button onClick={back} className='border border-gray bg-gray-100 text-black hover:border-gray-400 rounded-md py-2 px-4' >Back</button>
         <button type='submit' className='bg-gradient-to-tr from-span-start to-span-end py-2 px-4 text-white rounded-md'>Verify</button>
        </div>
      <div className='text-center'>
          <p className='inline underline-offset cursor-pointer text-sm text-gray-700'>Resend code</p>
          </div>
      </div>
      </div>
      </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Forgotpassword2

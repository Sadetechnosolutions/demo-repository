import React,{useState} from 'react'
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import Languages from '../components/languages';
import { NavLink } from 'react-router-dom';
import Phonecode from '../components/phonecode';

const Signup = () => {
  const [user,setUser] = useState({ username: '', email: '', phoneNumber:'', password:'', confirmPassword:'' });
  const [passwordError,setPasswordError] = useState(false)
  const handleSubmit = async(e) => {
    if (user.password !== user.confirmPassword) {
      setPasswordError('Password doesnt match');
      e.preventDefault();
      return;
    }
    else{
      setPasswordError('');
    }
    e.preventDefault();

    try {
      console.log(user)
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        console.log('Form data submitted successfully');

      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  }
        const [languages,showLanguages] = useState(false);
        const [language,setLanguage] = useState(null)
        const [phoneCode,showPhoneCode] = useState(false)
        const [active,setActive] = useState(false);
        const[country,SetCountry] = useState(null);
        
        const handleSelectPhoneCode = (code)=>{
            SetCountry(code);
            showPhoneCode(false);
        }
        const handleChanges = (e) => {
          setUser({ ...user, [e.target.name]: e.target.value });
        };
        
        // const handleChanges = (e) => {
        //   const { name, value } = e.target;
        //   setUser({ ...user, [name]: value });
        // };
       
        const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value,
          }));
        };

        const handleSelectLanguage = (lang)=>{
          setLanguage(lang);
          setActive(false);
          showLanguages(false);
        }
        const handleShowLanguages = ()=>{
            showLanguages(!languages);
        }
        const handleShowPhoneCode = ()=>{
          showPhoneCode(!phoneCode);
        }

        const info = [
        {
            id:1,
            heading:"Destiny ©2021"
        },
        {
            id:2,
            heading:"Sign up"
        },
        {
            id:3,
            heading:"Sign in",
            path:"/"
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
  <div style={{fontFamily:'revert-layer'}} className="min-h-screen bg-gradient-to-tr items-center justify-center from-span-start to-span-end flex flex-col">
    <div className="w-full flex flex-col sm:gap-2 md:flex-row items-center justify-between pr-6 md:pr-40 pl-6 md:pl-40 mb-5">
      <div className="flex flex-col w-full md:w-1/3 gap-3 justify-center  text-center items-center md:items-center">
        <div>
        <img className="w-55 h-38" src="logo.png" alt="logo" />
        </div>
        <div className="text-center items-center md:text-center">
          <p className="text-black font-mono font-bold mb-1 text-4xl">Welcome To Destiny </p>
          <span className="text-lg text-span">- Are You Ready To Fulfil Your Destiny -</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col bg-white mt-16 rounded-md justify-center items-center  md:mb-14 md:w-2/5 py-8">
        <div className="flex w-full mt-2 md:w-3/6 justify-center relative text-center gap-5 mb-4">
          <div className="flex items-center gap-2">
            <input type="radio"  onChange={handleChange} name="option" checked={true} value="Individual" />
            <label>Individual</label>
          </div>
          <span>|</span>
          <div className="flex items-center gap-2">
            <input type="radio" onChange={handleChange} name="option" value="Identifier" />
            <label>Identifier</label>
          </div>
          <div className="flex items-center">
            <div className="flex justify-center flex-col">
              <div className="flex items-center justify-center">
                <div>
                <p>{language ? language.name : 'Language'}</p>
                </div>
                <div >
                  {active ? <FaCaretUp onClick={() => { setActive(false); handleShowLanguages() }} /> : <FaCaretDown  onClick={() => { setActive(true); handleShowLanguages() }} />}
                </div>
              </div>
              {languages && <Languages selectLanguage = {handleSelectLanguage} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-full md:w-3/3 lg:w-3/9">
          <div className="flex gap-2 flex-col w-3/4">
            <label className="text-md">Username <span className='text-red'>*</span></label>
            <input id='username' name='username' onChange={handleChanges} value={user.username} className="px-3 py-2 w-full text-sm border border-span-300 rounded-md focus:outline-none" type="text" maxLength={25} required placeholder="Enter your username" />
          </div>
          <div className="flex gap-2 flex-col w-3/4">
            <label className="text-md"> Email <span className='text-red'>*</span></label>
            <input id='email' name='email' onChange={handleChanges} value={user.email} className="px-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type="email" required placeholder="Enter your email" />
          </div>
          <div className="flex gap-2 flex-col w-3/4">
            <label className="text-md">Phone Number <span className='text-red'>*</span></label>
            <div className='flex items-center gap-2'>
            <div onClick={handleShowPhoneCode} className='border cursor-pointer border-gray-300 rounded-md px-2 py-2.5'><img className='w-6 h-4' src={country ? country.flag : 'india.jpg'} alt=''/></div>
            <input id='phoneNumber' name='phoneNumber' onChange={handleChanges} value={user.phoneNumber} className="px-3 py-2 text-sm w-full border border-gray-300 appearance-none rounded-md focus:outline-none focus:border-gray" type="text" required placeholder="Enter your mobile number" />
            </div>
            {phoneCode && <Phonecode setFlag = {handleSelectPhoneCode} />}
          </div>
          <div className="flex gap-2 flex-col w-3/4 gap-1">
            <label className=" md:text-md">Password <span className='text-red'>*</span></label>
            <input id='password' name='password' onChange={handleChanges} value={user.password} className="px-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type="password" required placeholder="Enter your password" />
          </div>
          <div className="flex gap-2 flex-col mb-2 w-3/4 gap-1">
            <label className="text-md">Confirm <span className='text-red'>*</span></label>
            <input id='confirmPassword' name='confirmPassword' onChange={handleChanges} value={user.confirmPassword} className="px-3 py-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="password" required placeholder="Confirm your password" />
          </div>
        <div className='flex w-3/4 text-center mt-4 flex-col'>
        <button className="px-4 py-2 border w-full border-gray-300 bg-gradient-to-tr from-span-start to-span-end text-white-800 mb-2  text-white font-semibold rounded-md">Sign Up</button>
        <p>I am a new member <NavLink to="/"><span className="text-highlight font-semibold cursor-pointer">Sign In Here</span></NavLink></p>
        {passwordError && <span className="text-red text-sm">Passwords do not match!</span>}
        </div>
        </div>
      </form>
    </div>
    <div className="flex flex-col w-full sm:items-center sm:gap-2 md:flex-row md:justify-center md:gap-3.5">
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

export default Signup;

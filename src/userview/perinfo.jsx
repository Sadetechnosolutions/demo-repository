import React from "react";
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import Formbar from "./formbar";
import GeneralInfo from "./geninfo";
import { useNavigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import { updatePhoto,changecoverPhoto,updateCover,changePhoto } from '../slices/photoslice';
import { setFormData } from "../slices/formslice";
import Phonecode from "../components/phonecode";

const PersonalInfo = ({ GetInfo, formData, updateFormData,onNext   })=>{
    const dispatch = useDispatch()
    const [file, setFile] = useState(null);
    const [value, onChange] = useState((new Date()));
    const [phoneCode,showPhoneCode] = useState(false)
    const [countryCode,setCountryCode] = useState('');
    const [countries,ShowCountries] = useState(false);
    const [country,SetCountry] = useState('');
    const [displayName,setDisplayName] = useState('');
    const [aboutYourself,setAboutYourself] = useState('');
    const [bloodGroup,setBloodGroup] = useState('');
    const [gender,setGender] = useState('');
    const [profession,setProfession] = useState('');
    const [website,setWebsite] = useState('');
    const [active,SetActive] = useState(false);
    const {selectedprofilepic} = useSelector((state)=>state.photo)
    const {profilepic} = useSelector((state)=>state.photo)
    const {selectedcoverpic} = useSelector((state)=>state.photo)
    const {coverpic} = useSelector((state)=>state.photo)
    const Navigate = useNavigate()
    const handleShowCountry = ()=>{
        ShowCountries(!countries);
    }

    const handleShowPhoneCode = ()=>{
        showPhoneCode(!phoneCode);
      }
        
    const handleSelectPhoneCode = (code) => {
        setCountryCode(code)
        dispatch(setFormData({ countryCode: code.code }));
        showPhoneCode(false);
    };
    const open = ()=>(
        Navigate('/')
    )
    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
      };
      const handleSetCountry = (country) => {
        updateFormData({ country: country.name });
        ShowCountries(false);
        SetActive(!active)
    };
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
                dispatch(changePhoto(selectedFile)); 
                setFile(selectedFile);
                dispatch(updatePhoto(selectedFile))
        }
    };

    const handlechangeCover = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
   
                dispatch(changecoverPhoto(selectedFile)); 
                setFile(selectedFile); 
                dispatch(updateCover(selectedFile))
        
        }
    };
    const handleDateChange = (date) => {
        updateFormData({ birthday: date })
      };
    
      // Handle radio button change
      const handleRadioChange = (e) => {
        updateFormData({ gender: e.target.value });
      };

    const data = [{id:'1',name:'India'},{id:'2',name:'Afganisthan'}]
    return(
<div className="h-[58rem] flex  items-center justify-center">
    <div className="w-1/2 px-8 py-6 h-[56rem] bg-white gap-3 rounded-lg flex flex-col">
    <div style={{ backgroundImage: `url(${coverpic?.name})` }} className={`flex flex-col relative w-full h-48 bg-cover bg-center bg-no-repeat gap-4 justify-end ${coverpic?'':'bg-gray-200'}`}>
                    <div className='absolute right-0 top-0 p-2'>
                        <div className='flex gap-2 items-center rounded-md cursor-pointer px-2 py-1 bg-white bg-opacity-40'>                     
                            <input type="file" accept="image/*" onChange={handlechangeCover} style={{ display: 'none' }} id="cover-photo-input" />
                            <label htmlFor="cover-photo-input" className='flex items-center gap-2 cursor-pointer'>
                            <span className='font-semibold'>Upload cover photo</span> <Icon icon="mdi:camera" width="1.2em" height="1.2em" />
                            </label>
                        </div>
                    </div>
                    <div className='flex relative  w-max items-center'>
                        <div>
                            <img className={`w-28 border-4 border-white ${profilepic?'':'bg-gray-200'} h-28 rounded-full`} alt='' src={profilepic?.name} />
                        </div>
                        <div className='absolute justify-end bottom-0 right-0 flex text-cta hover:bg-cta hover:text-white border border-cta cursor-pointer items-center justify-center py-1.5 w-min px-1.5 rounded-full bg-white'>
                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="profile-photo-input" />
                            <label htmlFor="profile-photo-input" className='cursor-pointer'>
                                <Icon icon="mdi:camera" width="1.2em" height="1.2em" />
                            </label>
                        </div>
                    </div>
                </div>
<div className="flex flex-col gap-2">
    <label className=" font-semibold">Display Name</label>
    <input required  name="displayName" value={formData.displayName} onChange={handleChange} className="p-2 rounded-md w-full border border-gray-600" placeholder="Enter your Name to display" />
</div>
<div className="flex flex-col gap-2">
    <label className=" font-semibold">About Yourself</label>
<textarea name="aboutYourself" value={formData.aboutYourself} onChange={handleChange} className="px-2 border  rounded-md border-gray-600 h-28" placeholder="write about yourself" />
</div>
<div className="flex justify-between">
    <div className='flex flex-col w-1/2 gap-3'>
        <label className=" font-semibold">Birthday</label>
      <DatePicker className='custom-date-picker' name="birthday" onChange={handleDateChange}  value={formData.birthday} />
    </div>
    <div className='flex flex-col gap-2'>
    <label className=" w-full font-semibold"> Blood Group <span className='text-red'>*</span></label>
            <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}  className="px-3 py-2 w-full text-sm border border-gray-600 rounded-md focus:outline-none focus:border-gray" type="text" required placeholder="Enter your blood group" />
    </div>
    </div>
    <div className="flex justify-between">
<div className='flex flex-col gap-2'>
    <label className="font-semibold"> Gender <span className='text-red'>*</span></label>
    <div className='flex items-center gap-4'>
    <div className="flex items-center gap-2">
    <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleRadioChange} />
    <label>Male</label>
    </div>
    <div className='flex items-center gap-2'>
    <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleRadioChange}  /><label>Female</label>
    </div>
    <div className='flex items-center gap-2'>
    <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleRadioChange}  /><label>Other</label>
    </div>
    </div>
    </div>
    <div className='flex flex-col gap-2'>
    <label className=" font-semibold"> Country <span className='text-red'>*</span></label>
    <div className='flex items-center rounded-md'><input required name="country" onChange={handleChange} className='w-72 px-3 py-2 border rounded-md border-gray-600' value={formData.country} type="text"  placeholder="Select your Country" /><div className='absolute ml-64'>{active ? <FaCaretUp onClick={()=>{SetActive(false);handleShowCountry()}} /> :<FaCaretDown onClick={()=>{SetActive(true);handleShowCountry()}} />}</div></div>
    {countries && (
        <>
        <div className='mt-20 absolute duration-500 ease-in-ease-out slide-in-down w-80 flex flex-col bg-white'>
        {data.map((country)=>(
            <div key={country.id}>
            <div className='w-full' key={country.id}>
                <div className='cursor-pointer p-2 border border-gray-50 hover:bg-gray-100 w-72' onClick={()=>{handleSetCountry(country)}}>{country.name}</div></div>
            </div>
        ))}
        </div>
        </>
    )}
    </div>
    </div>
    <div className="flex justify-between">
    <div className="flex gap-2 flex-col w-3/4">
    <label className="text-md">Phone Number <span className='text-red'>*</span></label>
    <div className='flex items-center gap-2'>
        <div onClick={handleShowPhoneCode} className='border cursor-pointer border-gray-300 rounded-md px-2 py-2.5'>
            <img className='w-6 h-4' src={countryCode ? countryCode.flag : 'india.jpg'} alt='' />
        </div>
        <input 
            id='phno' 
            name='phno' 
            onChange={(e) => {
                // Enforce max length and numeric value
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                }
            }} 
            value={formData.phno} 
            className="px-3 py-2 text-sm border border w-5/6 border-gray-600 appearance-none rounded-md focus:outline-none focus:border-gray" 
            type="text" 
            inputMode="numeric" // Use numeric keyboard on mobile
            required 
            placeholder="Enter your mobile number" 
            maxLength="10" // Limit the input to 10 characters
        />
    </div>
    {phoneCode && <Phonecode setFlag={handleSelectPhoneCode} />}
</div>

    <div className="flex flex-col gap-2">
    <label className=" font-semibold">Your Gmail</label>
    <input name="gmail" type="email" value={formData.gmail} onChange={handleChange} className="p-2 rounded-md w-full border border-gray-600" placeholder="Enter your mail" />
</div>
</div>


<div className="mt-11 w-full relative"><button onClick={onNext} className="px-3 py-1.5 w-20 absolute right-0 border rounded-md border-cta text-lg bg-cta hover:bg-cta hover:opacity-75 text-white cursor-pointer">Next</button></div>
    </div>
</div>
    )
}

export default PersonalInfo;

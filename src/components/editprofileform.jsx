import React,{useState} from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

const Editformprofile = ()=>{
    const [countries,ShowCountries] = useState(false);
    const [country,SetCountry] = useState('');
    const [active,SetActive] = useState(false);

  
    const handleShowCountry = ()=>{
        ShowCountries(!countries);
    }
    
    const handleSetCountry = (country)=>{
        SetCountry(country.name)
        SetActive(false);
        ShowCountries(false);
    }

    const data = [{id:'1',name:'india'},{id:'2',name:'Afganisthan'}]
    return(
    <form className=" w-1/2 flex-flex-col px-4 py-2">
        <div className=" flex flex-col gap-6">
        <span className="text-xl font-semibold">Edit profile</span>
    <div className="flex flex-col gap-4">
        <label>Display Name</label>
        <input type="text" className="px-2 h-9 bg-gray-100 rounded-md" placeholder="" />
    </div>
    <div className="flex flex-col gap-2">
        <div className="flex gap-1"><label>User Name</label><span className='text-red'>*</span></div>
        <input type="text" className="px-2 h-9 bg-gray-100 rounded-md" placeholder="" />
    </div>
    <div className="flex flex-col gap-2">
        <label>About your Profile</label>
        <textarea type="text" className="px-2 bg-gray-100 h-48 rounded-md" placeholder="" />
    </div>
    <div className="flex flex-col gap-2">
    <div className="flex gap-1"><label>Email Address</label><span className='text-red'>*</span></div>        <input type="e-mail" className="px-2 h-9 bg-gray-100 rounded-md" placeholder="" />
    </div>
    <div className='flex flex-col gap-2'>
    <label className="text-md"> Gender</label>
    <div className='flex items-center gap-4'>
    <div className="flex items-center gap-2">
    <input type="radio" name="option" value="Male" />
    <label>Male</label>
    </div>
    <div className='flex items-center gap-2'>
    <input type="radio" name="option" value="Female"  /><label>Female</label>
    </div>
    <div className='flex items-center gap-2'>
    <input type="radio" name="option" value="Other"  /><label>Other</label>
    </div>
    </div>
    </div>

    <div className='flex flex-col gap-2'>
    <label className="text-md"> Country </label>
    <div className='flex items-center'><input className='w-72 px-3 py-2 border border-gray-300' value={country} type="text" required placeholder="Select your Country" /><div className='absolute ml-64'>{active ? <FaCaretUp onClick={()=>{SetActive(false);handleShowCountry()}} /> :<FaCaretDown onClick={()=>{SetActive(true);handleShowCountry()}} />}</div></div>
    {countries && (
        <>
        <div className='mt-20 absolute duration-500 ease-in-ease-out slide-in-down w-80 flex flex-col bg-white'>
        {data.map((country)=>(
            <div key={country.id}>
            <div className='w-full' key={country.id}>
                <div className='cursor-pointer p-2 border border-gray-50 hover:bg-gray-100 w-72' onClick={()=>handleSetCountry(country)}>{country.name}</div></div>
            </div>
        ))}
        </div>
        </>
    )}
    </div>
    <div className="flex gap-2 justify-end"><button className="p-2 rounded-md bg-gray-100">Cancel</button><button className="p-2 bg-cta rounded-md text-white">Submit</button></div>
    </div>
    </form>
    )
}

export default Editformprofile;
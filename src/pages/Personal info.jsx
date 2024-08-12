import React,{useState} from 'react'
import { IoClose } from "react-icons/io5";

const Personalinfo = ({close}) => {
    const[interest,setInterest] = useState('') ;
    const[interestList,setInterestList] = useState([]);

    const deleteInterest = (id)=>{
      const newtodos = interestList.filter((todo)=> {return todo !== id});
      setInterestList(newtodos);
     }

    const addInterest = ()=>{
      if(interest===''){
      console.log('empty')
      }
      else{
      setInterestList([...interestList,interest]);
      console.log(interestList);
      setInterest('')
      }
    }

    const handleSubmit = ()=>{
        console.log('');
    }

  return (
    <div className='flex flex-col w-full h-auto items-center '>
        <form onSubmit={handleSubmit} className="absolute flex flex-col gap-4 bg-white h-auto mt-16 rounded-md px-10  md:mb-14 md:w-1/2 py-8">
        <div className='flex items-center justify-end gap-64'> <p className="text-xl font-semibold">General Information</p><div onClick={close} className='cursor-pointer bg-gray-200 p-1 hover:bg-red hover:text-white rounded-full'><IoClose className='h-5 w-5 cursor-pointer'/></div></div>
          <div className='flex flex-col gap-4'>
    <label>Hobbies</label>
    <textarea className="px-3 w-auto h-20 items-end text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type="text" required placeholder="What are your hobbies" />
    </div>
    <div className='flex flex-col h-28 gap-2'>
      <label>Interests</label>
    <div className='flex items-center gap-4'><input value={interest} onChange={(e)=>{setInterest(e.target.value)}} className='px-3 py-2 w-full text-sm border border-gray-300 rounded-md' type='text' placeholder='What are you interested in' /> <button type='button' className='border rounded-md text-cta hover:bg-cta hover:text-white px-4 py-2 border-cta'   onClick={(e) => {
    e.preventDefault();
    addInterest();
  }}>Add</button>
    </div>
    <div className='flex flex-wrap gap-4 w-full'>
    {interestList.map((interest,index)=>(
      <div className='flex justify-center items-center w-min py-2 px-3 rounded-md gap-2 bg-cta text-white' key={index}>
          {interest} <IoClose className='cursor-pointer' onClick={()=>{deleteInterest(interest)}} />
      </div>
    ))}
    </div>
    </div>
    <div className='flex flex-col gap-8'>
    <div className='flex flex-col gap-3'>
    <label>Education</label>
    <label className='text-sm'>Field of study</label>
    <input className="px-3 py-2 items-end text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type="text" required placeholder="Field of study" />
    <label className='text-sm'>University</label>
    <input className="px-3 py-2 items-end text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type="text" required placeholder="Enter your University name" />
    </div>
    <div className='flex flex-col gap-4'>
    <label className='text-sm'>Field of study</label>
    <input className="px-3 py-2 items-end text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type="text" required placeholder="Field of study" />
    <label className='text-sm'>University</label>
    <input className="px-3 py-2 items-end text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type="text" required placeholder="Enter your University name" />
    </div>
    <div className='flex flex-col gap-3'>
    <label className='text-sm'>Experience</label>
    <input className="px-3 py-2 items-end text-sm border border-gray-300 rounded-md focus:outline-none focus:border-gray" type="text" required placeholder="Enter your Work Experience" />
    </div>
    </div>
    <div className='mt-8 w-full flex gap-6 justify-center'>
    <button onClick={close} className=' px-4 py-2 bg-gray-200 text-black rounded-md'>Cancel</button>
    <button className=' px-4 py-2 bg-cta rounded-md text-white'>Submit</button>
    </div>
    </form>
    </div>
  )
}

export default Personalinfo

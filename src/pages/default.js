import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import Languages from '../components/languages';

const Default = ()=>{
    const navigate = useNavigate()
    const [languages,setLanguages] = useState(false);
    const [language,setLanguage] = useState(null);
    const [active,setActive] = useState(false);

    const handleSelectLanguage = (lang)=>{
        setLanguage(lang);
        setActive(false);
        handleShowLanguages(false);
      }

    const individual = ()=>{
        navigate('/signin')
    }

    const identifier = ()=>{
        navigate('/signup')
    }

    const handleShowLanguages = ()=>{
        setLanguages(!languages);
    }
    const handleActive = ()=>{
        setActive(!active);
    }
    return(
        <div className="bg-gradient-to-tr from-span-start to-span-end  relative h-screen max-w-[30rem] w-full flex flex-col items-center justify-center ">
            <div className="absolute top-8">
                <img className="w-64 h-16" src="logo.png" />
            </div>
        <div className="relative flex flex-col rounded-md w-5/6 h-64 items-center justify-center bg-white gap-6">
        <div className='absolute top-4 right-4 text-xs flex items-center'>
              <div className='flex flex-col'>
              <div className='w-16 flex justify-end items-center'>
              <p className=''>{language ? language.name : 'English'}</p>
              <div className=''>{active ? <FaCaretUp onClick={()=>{handleActive(); handleShowLanguages()}} /> : <FaCaretDown  onClick={()=>{handleActive(); handleShowLanguages()}}  />}</div>
              </div>
              {languages && <Languages selectLanguage = {handleSelectLanguage} />}
              </div>
              </div>
            <button onClick={individual} className="px-4 py-2.5 w-1/2 items-center hover:opacity-80 bg-gradient-to-tr text-sm from-span-start to-span-end text-white-800 hover:bg-custom-hover text-white font-semibold rounded-md">
                Individual
            </button>
            <button onClick={identifier} className="px-4 py-2.5 w-1/2 items-center hover:opacity-80 bg-gradient-to-tr text-sm from-span-start  to-span-end text-white-800 hover:bg-custom-hover text-white font-semibold rounded-md">
                Identifier
            </button>

        </div>
        </div>
    )
}

export default Default;
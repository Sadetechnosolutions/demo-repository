import React from 'react'
const Languages = ({selectLanguage}) => {
    const language = [
        {
            id:1,
            name:"English"
        },
        {
            id:2,
            name:"Tamil"
        },
        
        ]
  return (
    <>
      <div>
    <div className='border slide-in-down flex cursor-pointer flex-col px-2 text-left absolute bg-white gap-3 w-20 h-auto'>
    {language.map((languages)=>(<div onClick={()=>{selectLanguage(languages)}} className='wd-32 py-2' >{languages.name}</div>))}
    </div>
      </div>
    </>
  )
}

export default Languages;


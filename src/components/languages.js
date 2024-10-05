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
    <div className='border slide-in-down  flex cursor-pointer rounded-md flex-col px-2 text-left absolute bg-white w-20 '>
    {language.map((languages)=>(<div onClick={()=>{selectLanguage(languages)}} className='py-1' >{languages.name}</div>))}
    </div>
      </div>
    </>
  )
}

export default Languages;


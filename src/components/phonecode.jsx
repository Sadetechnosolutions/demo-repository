import React from 'react'

const Phonecode = ({setFlag}) => {
    const country = [{
        id:1,
        name:'India',
        flag:'india.jpg',
        code:'+91'
    },
    {
        id:2,
        name:'Afghanisthan',
        flag:'afghanisthan.webp',
        code:'+93',
    },
    ]

  return (
    <>
    <div>
    <div className='flex flex-col w-inherit py-2 gap-2 absolute text-left bg-white'>
    {country.map((countries) => (
        <div onClick={()=>{setFlag(countries)}} key={countries.id} className='flex cursor-pointer bg-white px-2 items-center gap-2'>
            <img className='w-5 h-4' alt='' src={countries.flag} />
            <div>{countries.name}</div>
            <div>{countries.code}</div>
        </div>
    ))}
</div>
</div>
    
    </>
  )
}

export default Phonecode;

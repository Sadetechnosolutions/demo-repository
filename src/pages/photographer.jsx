import React, { useEffect } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import ProgressBar from "@ramonak/react-progress-bar";
import '../progressstyle.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Chrono } from "react-chrono";
import '../styles.css'


const Photographer = () => {
    const call=<Icon icon="fa6-solid:phone" />
    const address= <Icon icon="mdi:address-marker" width='1.4em' height='1.4em'  />
    const mail = <Icon icon="material-symbols:mail" width='1.4em' height='1.4em' />
    const linkedin = <Icon className='md:w-5 sm:w-4 md:h-5' icon="bi:linkedin"  />
    useEffect(() => {
      const handleScroll = () => {
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
          window.removeEventListener("scroll", handleScroll);
      };
  }, []);

    const footer=[{
      id:1,
      icon: call,
      text:'Call me!',
      value:'(+81) 946 159 90'
    },{
      id:2,
      icon: mail,
      text:'Mail!',
      value:'Peterparker_07@gmail.com'
    },{
      id:3,
      icon: address,
      text:'Reach out!',
      value:'AVE 11, NEW YORK, USA'
    },{
      id:3,
      icon: linkedin,
      text:'Connect!',
      value:'@PeterP07'
    }]



    const items=[{
      id: 1,
      cardSubtitle: 'Oxford University',
      cardTitle: 'Masters in Film Studies',
      title: '2016',    },
    {
      id: 2,
      cardDetailedText: '',
      cardTitle: 'Bachelors in Science',
      cardSubtitle:"University of Texas",
      title: '2012',
        },]

        const tems=[    {
          id: 1,
          cardSubtitle: 'Camera operations for production, shot division decisions and ensuring high quality visuals',
          cardTitle: 'Huemen collar',
          title: '2019',    
        },
        {
          id: 2,
          cardDetailedText: '',
          cardTitle: 'Viola',
          cardSubtitle:"Assisted in camera setup and various operations B",
          title: '2017',
            },
            {
              id: 3,
              cardDetailedText: '',
              cardTitle: 'Fero FT',
              cardSubtitle:"Senior Cinematographer worked in the planning of shot divisions and visual aesthetics based on landscape",
              title: '2017',
                }]
      

    const language=[{
      id:1,
      name:'English',
      percentage:'90'
    },
    {
      id:2,
      name:'Spanish',
      percentage:'60'
    },
    {
      id:3,
      name:'French',
      percentage:'20'
    },{
      id:4,
      name:'German',
      percentage:'40'
    }]

    const progress = [{id:1,name:'CREATIVITY',percentage:'70'},
    {id:2,name:'PHOTOGRAPHY',percentage:'85'},
    {id:3,name:'EDITING',percentage:'60'},
    {id:4,name:'LEADERSHIP',percentage:'70'}]

    const customTheme = {
      primary: '#B8A7FB', // Main timeline color
      secondary: '#fff', // Secondary timeline color
      cardBgColor: '#fff', // Background color of timeline cards
      cardForeColor: '#fff', // Text color of timeline cards
      cardTitleStyle: {
        color: '#fff', // Text color of timeline card titles
      },
      cardSubtitleStyle: {
        color: '#495057', // Text color of timeline card subtitles
      },
    };
    
    const details = [{
      id:1,
      icon:<Icon icon="icon-park-outline:birthday-cake" />,
      name:'BIRTHDAY',
      value:'18-07-1994'
    },
    {
      id:2,
      icon:<Icon icon="icon-park-outline:birthday-cake" />,
      name:'STUDY',
      value:'MASTERS IN FILM STUDIES'
    },
    {
      id:3,
      icon:<Icon icon="icon-park-outline:birthday-cake" />,
      name:'AGE',
      value:'36'
    },
    {
      id:4,
      icon:<Icon icon="icon-park-outline:birthday-cake" />,
      name:'INTERESTS',
      value:'SWIMMING, COOKING, FOOTBALL'
    },
    {
      id:5,
      icon:<Icon icon="icon-park-outline:birthday-cake" />,
      name:'PHONE',
      value:'(+81) 946 159 90'
    },
    {
      id:6,
      icon:<Icon icon="icon-park-outline:birthday-cake" />,
      name:'MAIL',
      value:'PETERPARKER_07@GMAIL.COM'
    },{
      id:7,
      icon:<Icon icon="icon-park-outline:birthday-cake" />,
      name:'LOCATION',
      value:'AVE 11, NEW YORK, USA'
    }]
    const fontSizes = {
      title: '1.5em', // Font size for title text
      cardTitle: '1.5rem', // Font size for subtitle text
      cardSubtitle:'1em'
    };
  return (
    <>
      <div className='flex flex-col font-lato w-full py-12 gap-16'>
                {/* <nav className='flex top-0 sticky justify-between bg-black items-center w-full md:h-11 sm:h-9 py-2 '>
      <div className='flex flex-col items-center'>
      <button onClick={handleMenu} className='md:h-11 sm:h-9 md:w-24 sm:w-16 flex items-center md:text-lg sm:text-sm md:gap-2 sm:gap-0 bg-white text-black font-semibold'>
      <Icon icon="mage:dots-menu"height='1.4em' width='1.4em' />
      <span>Menu</span>
      </button>
      {menu && (
        <div className='bg-white md:mt-11 sm:mt-9 sm:w-16 absolute md:w-24 slide-in-down flex items-center flex-col'>
        {options.map((option)=>(
            <div onClick={() => {handleActive(option.id);handleActiveTitle(option.title);}} className={`flex items-center justify-center w-full md:h-28 sm:h-16 cursor-pointer md:text-lg sm:text-md ${
    activeSection === option.id ? 'bg-gradient-to-tr from-span-start to-span-end text-white' : ''}`}>
  <div>{option.icon}</div>
</div>
))}
  </div>
      )}
      </div>
      <div className='flex items-center'>
      <span className='text-white md:text-3xl sm:text-xl relative font-semibold'>{activeTitle}</span>
</div>
      <div className='md:h-11 md:w-32 sm:h-9 sm:w-20 flex items-center justify-center cursor-pointer text-lg md:text-lg sm:text-xs font-semibold bg-purple text-white'>
      Contact Us?
      </div>
      </nav>
        <div style={{backgroundImage:'url(prof-bg.png)'}} className='md:min-h-screen sm:h-96 w-full flex justify-between flex-col bg-cover bg-no-repeat bg-coverImg.jpg'>
            <div>

      </div>
      <div className='w-full flex flex-col text-white md:gap-5 sm:gap-3 md:text-3xl sm:text-xl font-bold items-center '>
        <div className='text-center'>
        <p>I' AM <span className='text-purpleo'>PETER PARKER</span>  </p>
        <span className='md:text-6xl sm:text-4xl'>PHOTOGRAPHER</span>
        </div>
        <div className='flex justify-center gap-8'>
       {socialmedia.map((sm)=>(
        <div key={sm.id} className='flex md:w-11 sm:w-7 md:h-11 sm:h-7 cursor-pointer hover:bg-purple hover:text-white  items-center justify-center rounded-full bg-transparent text-black'>
            <span className=''>{sm.icon}</span>
        </div>
       ))}
      </div>
      </div>
      <div>
      </div>
        </div> */}
        <div className='md:h-auto sm:h-auto bg-ani flex gap-8 flex-col py-2'>
        <div className='text-purple ml-28 font-bold text-4xl'>| ABOUT</div>
        <div className=' md:flex px-28 items-start justify-between md:gap-20'>
          <div className='md:w-full md:h-[33rem] sm:w-full inline-block overflow-hidden'>
            <img className='w-full h-full transition transition-transform cursor-pointer hover:scale-110' src='dp.jpg' alt='' />
          </div>
          <div className='flex gap-8 flex-col'>
          <div className='md:w-full sm:w-full'>
            <p className='md:text-lg sm:text-md whitespace-wrap'><span className='text-purple text-3xl font-bold'>PETER PARKER</span><br /> A Cinematographer, and I'm very passionate and dedicated to my work. With 20 years experience as a professional Cinematographer, I have acquired the skills and knowledge necessary to make your project a visual grandeur. I enjoy every step of the process, from discussion and collaboration.</p>
          </div>
          <div className='md:w-full flex flex-col gap-6 sm:w-full'>
            {progress.map((prog)=>(
            <div key={prog.id} className='flex flex-col gap-4'>
            <div className='flex font-semibold justify-between'><label>{prog.name}</label> <span>{prog.percentage}%</span></div>
        <ProgressBar bgColor="#B4A4F6"
  baseBgColor="#EAEAEA" 
  height="20px"
  borderRadius="5px"
  borderColor='#000'
  borderSize='2px'
  labelColor='#5CBE8F'
  transitionDuration="0.5s" 
  completed={prog.percentage}
/>
</div>
            ))}
            <div className='flex justify-center'>
         <button className='hover:bg-purple p-2 w-36 border-2 flex items-center border-purple gap-1 font-semibold text-purple rounded-md hover:text-white'><Icon icon="f7:arrow-down-doc-fill"  width='1.2em' height='1.2em'/>Download CV</button>
         </div>
          </div>
          </div>
        </div>
        <div className='px-28 flex gap-4 flex-wrap'>
          {details.map((info)=>(
          <div key={info.id} className='p-2 flex items-center bg-purple bg-opacity-10 rounded-md text-viola gap-2 md:text-md sm:text-sm border border-purple'><span className='font-semibold flex items-center gap-2'>{info.icon} {info.name}:</span><span className='text-black'>{info.value}</span></div>
          ))}
        </div>
        </div>
        <div className='flex w-full gap-16'>
        <div className='flex w-1/ bg-blac ml-20 flex-col gap-12'>
      <div className='text-purple ml-8 font-bold text-4xl'>| EXPERIENCE</div>
      <div className=''>
        <Chrono theme={customTheme} fontSizes={fontSizes}
 items={tems} enableQuickJump={false} cardHeight={100} cardWidth={500} disableToolbar={true} enableLayoutSwitch={false} mode='VERTICAL' />
 </div>
      </div>
        <div className='flex w-1/2 flex-col gap-12'>
        <div className='text-purple ml-8 font-bold text-4xl'>| EDUCATION</div>

        <Chrono theme={customTheme} fontSizes={fontSizes}
 items={items} enableQuickJump={false} cardHeight={100} cardWidth={500} borderLessCards={true} disableToolbar={true} enableLayoutSwitch={false} mode='VERTICAL' />
      </div>
      </div>

    <div className='flex flex-col gap-12'>
    <div className='text-purple ml-28 font-bold text-4xl'>| LANGUAGES</div>
        <div className='flex px-28 items-center flex-wrap gap-16'>
          {language.map((languages)=>(
              <div className='flex flex-col items-center gap-4'>
        <CircularProgressbar className='md:w-60 md:h-60'
        value={languages.percentage}
        text={`${languages.percentage}%`}
        strokeWidth={6}
        styles={{
          path: { stroke: '#B4A4F6' },
          text: { fill: '#000', fontSize: '20px' },
        }}
      />
      <span className='text-xl'>{languages.name}</span>
              </div>
          ))}
        </div>
        <div className='flex flex-col gap-12'>
        <div className='text-purple ml-28 font-bold text-4xl'>| CONTACT ME</div>
        <div className='flex  flex-wrap md:gap-16 sm:gap-8 ml-28'>
        {footer.map((items)=>(
         <div key={items.id} className='w-64 cursor-pointer hover:animate-bounce parent h-52 hover:bg-purple hover:text-white rounded-lg border-4 border-purple flex flex-col gap-2 items-center justify-center'>
         <div className='bg-purple h-11 child w-11 rounded-full flex items-center justify-center text-black'><span className='text-white child-i'>{items.icon}</span></div>
         <span className='text-purple child-t  font-bold text-lg'>{items.text}</span>
         <p>{items.value}</p>
         </div>
        ))}
        </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Photographer;

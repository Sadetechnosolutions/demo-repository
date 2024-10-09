import React ,{useState} from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

const NotificationSetting = () => {
    const [countries,ShowCountries] = useState(false);
    const [country,SetCountry] = useState('');
    const [active,SetActive] = useState(false);

    const data = [{
        id:1,
        name:'English'
    },{
        id:2,
        name:'Tamil'
    }]
  
    const handleShowCountry = ()=>{
        ShowCountries(!countries);
    }
    
    const handleSetCountry = (country)=>{
        SetCountry(country.name)
        SetActive(false);
        ShowCountries(false);
    }
    const Othernotifications = [{
      id:1,
      name:'Recommended videos'
    },
    {
        id:2,
        name:'Reply to comments.'
            },
            {
                id:3,
                name:'Mentions'
                    },
                    {
                        id:4,
                        name:'activity on my page or channel'
                            },
                            {
                                id:5,
                                name:'Activity on my comments.'
                                    }]
  return(
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <span className="font-semibold text-xl">Notification Settings</span>
      </div>
      <div className="flex flex-col text-md gap-2">
        <div className="flex items-center  gap-2">
          <input className="w-4 h-4" type="radio" id="email" name="notification" value="email" />
          <label htmlFor="email">Send Me emails about my activity except emails I have unsubscribed from</label>
        </div>
        <div className="flex items-center gap-2">
          <input className="w-4 h-4" defaultChecked={true} type="radio" id="services" name="notification" value="services" />
          <label htmlFor="services">Only send me required services announcements</label>
        </div>
      </div> 
      <div className="flex flex-col gap-4">
        <span className="text-lg font-semibold">I'd like to receive emails and updates about</span>
        <div className="flex-col">
        <div className="flex items-center gap-2">
        <input className="w-4 h-4" type="checkbox" /> <span>Always General announcement, updates, posts, and videos</span>
        </div>
        <div className="flex items-center gap-2">
        <input className="w-4 h-4" type="checkbox" /> <span>Personalise tips for my page</span>
        </div>
        <div className="flex items-center gap-2">
        <input className="w-4 h-4" type="checkbox" /> <span>Announcements and recommendations</span>
        </div>
        </div>
        <div className="flex flex-col gap-4">
            <span className="text-lg font-semibold">Other Notifications</span>
           {Othernotifications.map((notification)=>(
            <div key={notification.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2"><input className="w-4 h-4" type="checkbox" /> {notification.name} </div>
            </div>
           ))}
        </div>
        <div className='flex flex-col gap-4'>
    <label className="text-lg font-semibold"> Language Preferences</label>
    <div className='flex items-center'><input className='w-72 px-3 py-2 border hide-cursor cursor-pointer border-gray-300' value={country} type="text" required placeholder="Select your Language" /><div className='absolute ml-64'>{active ? <FaCaretUp onClick={()=>{SetActive(false);handleShowCountry()}} /> :<FaCaretDown onClick={()=>{SetActive(true);handleShowCountry()}} />}</div></div>
    {countries && (
        <>
        <div className='mt-20 absolute duration-500 ease-in-ease-out slide-in-down w-80 flex flex-col bg-white'>
        {data.map((country)=>(
            <div key={country.id}>
            <div className='w-full' key={country.id}>
                <div className='cursor-pointer p-2 border border-gray-50 hover:bg-gray-100 w-72' onClick={()=>handleSetCountry(country)}>{country.name}</div>
                </div>
            </div>
        ))}
        </div>
        </>
    )}
    </div>
    <span>you will always get notifications you have turned on for individual <span className="text-cta font-semibold">Manage All Subscriptions</span></span>
      </div>
    </div>
  );
};


export default NotificationSetting;

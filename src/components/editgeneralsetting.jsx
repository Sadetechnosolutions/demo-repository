import React,{ useState } from "react";
import Checkbox from "./checkbox";


const GeneralSetting = ()=>{
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (newState) => {
        setIsChecked(newState);
      };

    const data = [{
        id:1,
        name:'Sub Users',
        desc:'Enable this if you want people to follow you',
    },
    {
        id:2,
        name:'Enable Follow Me',
        desc:'Enable this if you want people to follow you',
    },
    {
        id:3,
        name:'Send Me Notifications',
        desc:'Send me notification emails my friends like, share or message me',
    },
    {
        id:4,
        name:'Text Messages',
        desc:'Send me messages to my cell phone',
    },
    {
        id:5,
        name:'Enable Tagging',
        desc:'By enabling this people can tag you',
    },{
        id:6,
        name:'Enable Sound Notification',
        desc:'Notification sound when someone sends you a private message',
    }]
    return(
<div className="w-1/2 px-2 py-2 gap-6 flex flex-col">
    <span className="text-xl font-semibold">General Settings</span>
<div className="flex flex-col gap-4 ">
    {data?.map((option)=>(
        <div key={option.id} className="flex items-center justify-between h-13">
        <div className="flex flex-col gap-2">
            <span className="text-black font-semibold">{option.name}</span>
            <span className="text-sm text-gray-500">{option.desc}</span>
        </div>
        <div>
        <Checkbox initialItemState={!isChecked} onCheckboxChange={handleCheckboxChange} />
        </div>
        </div>
    ))}
</div>
<div className="flex items-center gap-4 px-4 bg-black text-yellow">

</div>
<div className="flex flex-col gap-4">
<span className="font-semibold">Account Settings</span>
<div className="flex flex-col gap-4">
<div className="flex h-20 rounded-md deactivate bg-gray-50 cursor-pointer  px-2 justify-center flex-col gap-2">
    <span className="font-semibold child-dt">Deactivate Account</span>
    <span className="text-sm">Temporarily deactivate your account</span>
</div>
<div className="flex h-20 delete rounded-md bg-gray-50 cursor-pointer  px-2 justify-center flex-col gap-2">
    <span className="font-semibold child-d">Delete Account</span>
    <span className="text-sm">Permanently delete your account</span>
</div>
</div>
</div>
</div>
    )
}

export default GeneralSetting
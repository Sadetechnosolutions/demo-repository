import React from 'react'
import SettingsBar from '../components/settings';
import MessageSetting from '../components/messagesettingcomp';

const MessageSettings = ()=>{
    return(
        <div className='flex items-center justify-center'>
        <div className='w-5/6 flex items-start gap-6'>
        <SettingsBar />
        <MessageSetting />
        </div>
        </div>
    )
}

export default MessageSettings;
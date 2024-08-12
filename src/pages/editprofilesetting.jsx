import React from 'react'
import SettingsBar from '../components/settings';
import Editformprofile from '../components/editprofileform';

const SetEditprofile = ()=>{
    return(
        <div className='flex items-center justify-center'>
        <div className='w-5/6 flex items-start gap-2'>
        <SettingsBar />
        <Editformprofile />
        </div>
        </div>
    )
}

export default SetEditprofile;
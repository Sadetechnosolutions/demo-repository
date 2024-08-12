import React from "react";
import SettingsBar from "../components/settings";
import NotificationSetting from "../components/notificationsettingcomp";


const Notificationsettings = ()=>{
    return(
        <div className="flex items-center justify-center">
        <div className="w-5/6 flex gap-6">
      <SettingsBar />
      <NotificationSetting />
        </div>

    </div>
    )
}

export default Notificationsettings
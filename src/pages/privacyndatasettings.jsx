import React from "react";
import PrivacyData from "../components/privacydata";
import SettingsBar from "../components/settings";

const PrivacyandDataSetting = ()=>{
    return(
        <div className="flex items-center justify-center">
        <div className="w-5/6 flex gap-4">
      <SettingsBar />
      <PrivacyData />
        </div>
    </div>
    )
}

export default PrivacyandDataSetting;
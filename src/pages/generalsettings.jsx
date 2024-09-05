import React from "react";
import SettingsBar from "../components/settings";
import GeneralSetting from "../components/editgeneralsetting";

const Generalsettings = ()=>{
return(
    <div className="flex items-center justify-center">
        <div className="w-5/6 flex gap-4">
      <SettingsBar />
      <GeneralSetting />
        </div>
    </div>
)
}

export default Generalsettings
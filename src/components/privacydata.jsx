import React,{useState} from "react";

import Checkbox from "./checkbox";

const PrivacyData = ()=>{
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (newState) => {
        setIsChecked(newState);
      };
    return(
      <div className="w-1/2 px-2 py-2 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">Privacy & data</span><span>Deceide whether your profile will be hidden from search engine and what kind of data you want to use to imporve the recommendation and ads you see <span className="text-cta font-semibold">Learn more</span></span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
        <span className="text-md font-semibold">Search Privacy</span>
        <span>Hide your profile from search engine (Ex.google) <span className="text-cta font-semibold">Learn more</span></span>
        </div>
        <div>
        <Checkbox
                    initialItemState={!isChecked}
                    onCheckboxChange={handleCheckboxChange}
                  />
        </div>
      </div>
      <hr/>
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">Personalization</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
        <span className="text-md font-semibold">Search Privacy</span>
        <span>Hide your profile from search engine (Ex.google) <span className="text-cta font-semibold">Learn more</span></span>
        </div>
        <div>
        <Checkbox initialItemState={!isChecked} onCheckboxChange={handleCheckboxChange} />
        </div>
      </div>
      </div>
    )
}

export default PrivacyData;
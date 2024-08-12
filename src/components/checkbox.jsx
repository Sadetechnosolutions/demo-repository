import React, { useState } from "react";

const Checkbox = () => {
  const [itemState, setItemState] = useState(false);

  const handleClick = () => {
    setItemState(!itemState);
  };

  return (
    <div className={`w-[2.4vw] h-[2.2vh] rounded-full relative cursor-pointer ${itemState ? "bg-cta" : "bg-[#8A92A6]"}`}
      onClick={handleClick}>
      <div
        className={`absolute w-[0.7vw] h-[1.4vh] border rounded-full bg-white ${
          itemState ? "left-[1.5vw] top-1" : "left-1 top-1"
        }`}
      ></div>
    </div>
  );
};

export default Checkbox;
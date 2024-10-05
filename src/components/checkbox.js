import React, { useState } from "react";

const Checkbox = () => {
  const [itemState, setItemState] = useState(false);

  const handleClick = () => {
    setItemState(!itemState);
  };

  return (
    <div className={`w-11 h-6   rounded-full relative cursor-pointer ${itemState ? "bg-cta" : "bg-[#8A92A6]"}`}
      onClick={handleClick}>
      <div
        className={`absolute w-4 h-4 border rounded-full bg-white ${
          itemState ? "right-1 top-1" : "left-1 top-1"
        }`}
      ></div>
    </div>
  );
};

export default Checkbox;
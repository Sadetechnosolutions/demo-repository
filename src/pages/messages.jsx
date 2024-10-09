import React from "react";
import Messagelist from "../components/chatpeople";
import Navbar from "../components/navbar";
import data from '../message.json'

const Messages = () => {
  return (
    <div className=" min-h-screen">
    <Navbar/>
    <div className="h-[56rem] flex">
  <Messagelist className="overflow-y-auto" messages={data} />
</div>
    </div>
  );
};

export default Messages;

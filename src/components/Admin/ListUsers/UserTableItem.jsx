import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { BsCircleFill  } from "react-icons/bs";



const UserTableItem = ({ id, name, password, birthdate, balance }) => {

    const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="row px-4 flex space-x-2 border-t">

        <div className="col-2 w-[25%] md:w-[10%] pr-[3px] py-4">
            <div className="flex flex-col text-[12px]">
                <div className="role font-semibold text-[#707C95]">{id}</div>
            </div>
        </div>
        <div className="col-2 w-[25%] md:w-[25%] pr-[3px] py-4">
            <div className="flex flex-col text-[12px]">
                <div className="role font-semibold text-[#707C95]">{name}</div>
            </div>
        </div>
        <div className="col-2 w-[25%] md:w-[25%] pr-[3px] py-4">
            <div className="flex flex-col text-[12px] relative">
                <div className={`role font-semibold ${isVisible ? "text-[#707C95]":"text-[#A8B2C4]"}`}>
                    {isVisible ? password : (
                        <div className="flex space-x-[3px]">
                            <BsCircleFill size={6} />
                            <BsCircleFill size={6} />
                            <BsCircleFill size={6} />
                            <BsCircleFill size={6} />
                            <BsCircleFill size={6} />
                            <BsCircleFill size={6} />
                            <BsCircleFill size={6} />
                            <BsCircleFill size={6} />
                        </div>
                    )}
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); 
                        setIsVisible(!isVisible);
                    }}
                    className="absolute right-8 top-0 -mt-1 text-[#707C95]"
                >
                    {isVisible ? <IoMdEyeOff size={16} /> : <IoMdEye size={16} />}
                </button>
            </div>
        </div>
        <div className="col-2 w-[20%] md:w-[20%] pr-[3px] py-4">
            <div className="flex flex-col text-[12px]">
                <div className="role font-semibold text-[#707C95]">{birthdate}</div>
            </div>
        </div>
        <div className="col-2 w-[25%] md:w-[20%] pr-[3px] py-4">
            <div className="flex flex-col items-center text-[12px]">
                <div className="role font-semibold text-[#707C95]">{balance}</div>
            </div>
        </div>        
    </div>
  );
};

export default UserTableItem;

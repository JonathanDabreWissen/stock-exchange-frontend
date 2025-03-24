import React from "react";

const SidePanelItem = ({ icon, optionName, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-start w-full drop-shadow-sm my-1 rounded-lg px-4 py-2 space-x-2 cursor-pointer ${
        isActive ? "bg-white " : ""
      }`}
    >
      <div className="icon-part">
        <div
          className={`icon-bg rounded-lg drop-shadow-md py-2 px-2 ${
            isActive ? "text-white bg-[#17C1E8]" : "bg-white text-[#3A416F]"
          }`}
        >
          {React.createElement(icon)} {/* ✅ Render icon properly */}
        </div>
      </div>
      <div
        className={`option-name flex items-center text-sm ${
          isActive ? "text-[#3A416F] font-semibold" : "text-[#67748e]"
        }`}
      >
        {optionName}
      </div>
    </div>
  );
};

export default SidePanelItem;

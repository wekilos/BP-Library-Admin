import React from "react";

const Header = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const day = new Date();

  return (
    <div className="w-full border-[1px] sticky top-0 z-20 bg-[#F7F8FA] border-[#E9EBF0] h-[73px] flex justify-between px-[30px] items-center">
      <div className="flex items-center justify-center">
        <h1 className="leading-[28px] text-[16px] font-[600] text-black">
          Türkmenistanyň Baş prokuraturasynyň E-Kitaphana platformasy
        </h1>
      </div>
      <div>
        <h1 className="leading-[28px] text-[16px] font-[600] text-black">
          Hoş geldiňiz, {userData?.name}
        </h1>
        <div className="flex gap-3 items-center mt-2">
          <p className="text-[#98A2B2] text-[12px] leading-[14px] font-[500] border-r-[1px] border-[#98A2B2] pr-3">
            {day.getDate()}-
            {day.getMonth().toString().length < 2
              ? "0" + day.getMonth()
              : day.getMonth()}
            -{day.getFullYear()}
          </p>
          <p className="text-[#98A2B2] text-[12px]  leading-[14px] font-[500]">
            {day.getHours() + ":" + day.getMinutes()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;

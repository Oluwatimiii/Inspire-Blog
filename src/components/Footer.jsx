import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-white h-[60px] flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center space-x-3">
        <h2 className="font-semibold md:text[14px] text-black">
          Developed by
          <span className="text-[14px] cursor-pointer text-[#4e0a25] hover:text-[#50192f] transition-all ease-in">
            <a href="https://t.co/ZUMOtQT7aT" target="_blank">
              {" "}
              Timilehin
            </a>
            .
          </span>
        </h2>
        <p>&copy; 2022.</p>
      </div>
    </div>
  );
};

export default Footer;

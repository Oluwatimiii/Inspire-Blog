import React from "react";
import { Link } from "react-router-dom";
import Time from "./Time";


const Hero = ({ isAuth, username }) => {

  return (
    <div className="hero h-screen w-screen">
      <div className="bg-[#0a0a0ada] h-full flex flex-col justify-center mx-auto">
        <div className="w-full mx-auto px-7 md:px-10 max-w-[1200px]">
          {isAuth && (
            <div className="flex justify-between mx-auto">
              <h1 className="font-semibold text-1xl pb-[3rem] text-white">
                Welcome {username}
              </h1>
              <Time className="text-black" />
            </div>
          )}
          <div className="flex flex-col items-center justify-center space-y-6 mt-[6rem] text-white">
            <div className="text-center">
              <p className="md:text-4xl">
                "Find out who you are and be that person. That's what your soul
                was put on this earth to be. Find that truth, live that truth,
                and everything else will come." <br />
              </p>
              <p className="p-8 md:text-4xl">— Ellen DeGeneres</p>
            </div>
            {!isAuth && (
              <div className="flex items-center justify-center space-x-4">
                <Link
                  to="/signup"
                  className="bg-[#b60f4f] text-white py-2 px-6 rounded md:ml-8 hover:bg-[#7a0834]
               transition-all ease duration-200"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-[#b60f4f] text-white py-2 px-6 rounded md:ml-8 hover:bg-[#7a0834]
               transition-all ease duration-200"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

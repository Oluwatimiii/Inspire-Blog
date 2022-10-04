import React, { useState } from "react";
import Button from "./Button";
import { GiHypersonicMelon } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase-config";

const Navbar = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  const [openNav, setOpenNav] = useState(false);

  const stopOverflow = () => {
    if (openNav) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  stopOverflow();

  const navOpener = () => {
    setOpenNav((prev) => !prev);
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      setOpenNav(!openNav)
      navigate("/login");
    });
  };

  return (
    <div className="z-[1000]">
      <div className="shadow-md fixed top-0 left-0 nav w-full m-auto">
        <div className="relative bg-white py-4 md:flex items-center justify-between px-7 md:px-10">
          <div className="flex items-center font-bold text-2xl cursor-pointer ">
            <span className="mr-1 text-[#700a31]">
              <GiHypersonicMelon />
            </span>{" "}
            Inspire
          </div>

          <div
            onClick={navOpener}
            className="text-2xl p-2 absolute right-7 top-3 cursor-pointer md:hidden transition-all ease-in duration-500"
          >
            {openNav ? <FaTimes /> : <FaBars />}
          </div>

          <ul
            className={`flex flex-col md:flex-row items-center z-[-1] justify-center text-center pb-20 md:pb-0 
            absolute top-0 left-0 md:static bg-black md:bg-white text-white md:text-black
             md:z-auto w-full md:w-auto h-screen md:h-auto ${
               openNav ? "top-[60px] opacity-100" : "top-[-700px] opacity-0"
             } md:opacity-100`}
          >
            <Link
              to="/"
              className="md:ml-6 font-semibold hover:text-[#700a31] transition ease-in
                 duration-200 lg:ml-8 text-[18px] lg:text-xl my-5 md:my-0"
              onClick={() => setOpenNav(!openNav)}
            >
              Home
            </Link>
            {!isAuth ? (
              <Link
                to="/login"
                className="md:ml-6 font-semibold hover:text-[#700a31] transition ease-in-out
                 duration-200 lg:ml-8 text-[18px] lg:text-xl my-5 md:my-0"
                onClick={() => setOpenNav(!openNav)}
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/createpost"
                  className="md:ml-6 font-semibold hover:text-[#700a31] transition ease-in-out
                 duration-200 lg:ml-8 text-[18px] lg:text-xl my-5 md:my-0"
                 onClick={() => setOpenNav(!openNav)}
                >
                  Create Post
                </Link>
                <Link
                  to="/login"
                  className="md:ml-6 font-semibold hover:text-[#700a31] transition ease-in-out
                 duration-200 lg:ml-8 text-[18px] lg:text-xl my-5 md:my-0"
                  onClick={signOutUser}
                >
                  LogOut
                </Link>
              </>
            )}
            <div className="mt-4 md:mt-0" onClick={() => setOpenNav(!openNav)}>
              <Link to="/about">
                <Button>About Us</Button>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

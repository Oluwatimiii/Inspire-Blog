import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase-config";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const handlerPassword = (e) => {
    setPasswordValue(e.target.value);
  };

  console.log("lol");

  const formHandler = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((cred) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
        setErrorValue(err.message);
      });
  };

  return (
    <div className="bg-[#700a31] h-full flex flex-col items-center justify-center font-poppins">
      <div className="pt-[4.6rem] mx-auto px-7 md:px-10">
        <div className="rounded bg-white max-w-[330px] md:max-w-full md:w-[400px] px-8 py-11 mx-auto">
          <h1 className="font-bold text-3xl">Inspire someone today!</h1>
          <p className="text-[12px] text-gray-500 pt-2">
           Sign up on inspire to create/get daily inspirational posts.
          </p>
          <div className="pt-5">
            <form
              onSubmit={formHandler}
            >
              {errorValue && <p className="text-red-600 text-[11px] bg-red-100 p-2 rounded mb-2">{errorValue}</p>}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="border-[1px] border-gray-400 rounded p-[5px] placeholder:text-[12px] outline-none focus:border-[#770f38]"
                  onChange={handleEmail}
                  placeholder="name@gmail.com"
                />
              </div>
              <div className="flex flex-col space-y-2 mt-5">
                <label htmlFor="password" className="text-sm">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="border-[1px] border-gray-400 rounded p-[5px] placeholder:text-[12px] outline-none focus:border-[#770f38]"
                  onChange={handlerPassword}
                  placeholder="password"
                />
              </div>
              <div
                className="mt-5 flex items-center justify-center py-2 bg-[#770f38] w-full rounded-md
               hover:bg-[#580a29] transition-all duration-300 ease-in-out"
              >
                <button className="text-white">Create account</button>
              </div>
            </form>
            <p className="pt-4 text-[13px] font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-[#770f38] hover:font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { auth, provider } from "../auth/firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const Login = ({ setIsAuth }) => {
  const [emailsValue, setEmailsValue] = useState("");
  const [passwordsValue, setPasswordsValue] = useState("");
  const [errorsValue, setErrorsValue] = useState("");

  const handleEmails = (e) => {
    setEmailsValue(e.target.value);
  };

  const handlerPasswords = (e) => {
    setPasswordsValue(e.target.value);
  };

  const formHandlers = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailsValue, passwordsValue)
      .then((cred) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorsValue(err);
      });
  };

  const navigate = useNavigate();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="bg-[#700a31] h-full flex flex-col items-center justify-center font-poppins">
      <div className="pt-[4.6rem] mx-auto px-7 md:px-10">
        <div className="rounded bg-white md:w-[400px] px-8 py-11">
          <h1 className="font-bold text-3xl">Sign In</h1>
          <p className="text-[12px] text-gray-500 pt-2">
            Enter your credentials to access your account.
          </p>
          <div className="pt-10">
            <form  onSubmit={formHandlers}>
              {errorsValue && <p className="text-red-600 text-[11px] bg-red-100 p-2 rounded mb-2">{errorsValue}</p>}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm">Email address:</label>
                <input
                  type="email"
                  name="email"
                  className="border-[1px] border-gray-400 rounded p-[5px] placeholder:text-[12px] outline-none focus:border-[#770f38]"
                  onChange={handleEmails}
                  placeholder="name@gmail.com"
                />
              </div>
              <div className="flex flex-col space-y-2 mt-5">
                <label htmlFor="password" className="text-sm">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="border-[1px] border-gray-400 rounded p-[5px] placeholder:text-[12px] "
                  placeholder="password"
                  onChange={handlerPasswords}
                />
              </div>
              <div className="mt-5 flex items-center justify-center py-2 bg-[#770f38] w-full rounded-md
               hover:bg-[#580a29] transition-all duration-300 ease-in-out">
                <button className="text-white">Login</button>
              </div>
            </form>
            <p className="pt-3 pb-1 text-xs text-center font-medium">Or</p>
          </div>
          <div
            className="mt-2 flex flex-col items-center justify-center bg-white w-full border-[1px] border-gray-400
           rounded font-semibold"
          >
            <button
              className="w-full text-black flex items-center justify-center text-[13px] py-2"
              onClick={loginWithGoogle}
            >
              <FcGoogle className="mr-2" size="15px" />
              Sign In With Google
            </button>
          </div>
          <p className="pt-4 text-[13px] font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#770f38] hover:font-bold">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import CreatePost from "./components/CreatePost";
import { useState } from "react";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      <Router>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        {isLoading && (
          <div className=" bg-[#0b2a44ea] h-full w-full">
            <p className="loader text-4xl md:text-7xl font-bold flex items-center m-auto text-white h-screen pb-[7rem] justify-center">
              Inspire
            </p>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuth={isAuth}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/createpost"
            element={<CreatePost isAuth={isAuth} setIsLoading={setIsLoading} />}
          />
          <Route
            path="/signup"
            element={
              <SignUp
                isAuth={isAuth}
                setIsLoading={setIsLoading}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login setIsAuth={setIsAuth} />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../auth/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "./Hero";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const Home = ({ isAuth, setIsLoading }) => {
  const [postList, setPostList] = useState([]);
  const [names, setNames] = useState("");
  const postsCollection = collection(db, "posts"); // Getting the collection ref

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const data = await getDocs(postsCollection); // Getting the collection data
      setPostList(data.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(postList);
      setIsLoading(false);
    };

    getPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setNames(
        user.auth.currentUser?.email.charAt(0).toUpperCase() +
          user.auth.currentUser?.email.slice(1)
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const deletePost = async (id) => {
    setIsLoading(true);
    const inspireDoc = doc(db, "posts", id);

    await deleteDoc(inspireDoc);
    window.location.reload();
    setIsLoading(false);
  };

  const copyPost = async (title) => {
    await navigator.clipboard.writeText(`${title} ---Copied From Inspire.`);
    toast.success("Copied to clipboard", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-[#4e0a25] font-poppins">
      <Hero isAuth={isAuth} username={names} />
      <div className="w-full mx-auto px-7 md:px-10 max-w-[1200px] py-[5rem] font-lora">
        <h1 className="font-bold text-center text-white text-2xl md:text-4xl pb-10 md:pb-12">
          LATEST POSTS
        </h1>
        {isAuth && (
          <div className="flex items-center justify-center space-x-4 pb-8">
            <Link
              to="/createpost"
              className="bg-[#b60f4f] text-white py-2 px-6 rounded md:ml-8 hover:bg-[#7a0834]
               transition-all ease duration-200"
            >
              Create a post
            </Link>
          </div>
        )}
        <div className="flex flex-wrap justify-center lg:justify-between items-start mx-auto">
          {postList.map((post) => {
            return (
              <div
                key={post.id}
                className="bg-white mb-8 flex flex-col justify-center space-y-4 p-4 w-[90%] md:w-auto rounded-md shadow-sm shadow-black"
              >
                <h1 className="font-bold md:text-2xl">{post.title}</h1>
                <div className="md:w-[420px] h-auto overflow-y-auto">
                  <div className="w-full break-all text-[#3f1223] font-poppins leading-6">
                    <h1>"{post.postBody}"</h1>
                  </div>
                </div>
                {/* <h2 className="font-medium md:text-1xl">
                  Posted By: {post.author?.name || "Anonymous"}
                </h2> */}
                <div className="flex items-center justify-between">
                  <div className="copy">
                    <button
                      onClick={() => {
                        copyPost(post.postBody);
                      }}
                      className="bg-[#0c627c] text-white py-1 px-3 font-bold text-sm 
                    rounded hover:bg-[#033d4e] transition-all ease duration-200"
                    >
                      COPY POST
                    </button>
                  </div>

                  {isAuth && post.author?.id === auth.currentUser?.uid && (
                    <div className="delete">
                      <button
                        onClick={() => {
                          deletePost(post.id);
                        }}
                        type="submit"
                        className="bg-[#b60f0f] text-white py-1 px-3 font-bold text-sm 
                    rounded hover:bg-[#810606] transition-all ease duration-200"
                      >
                        DELETE
                      </button>
                    </div>
                  )}
                </div>
                <ToastContainer
                  theme="dark"
                  position="bottom-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

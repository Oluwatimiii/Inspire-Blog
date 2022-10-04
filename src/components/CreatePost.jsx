import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../auth/firebase-config";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth, setIsLoading }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };

  const postHandler = (event) => {
    setPostBody(event.target.value);
  };

  const postsCollection = collection(db, "posts");
 
  const createPost = async () => {
    setIsLoading(true)
    await addDoc(postsCollection, {
      title,
      postBody,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
    });
    
    navigate("/");
    setIsLoading(false)
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-screen h-full bg-gray-200 flex flex-col items-center font-poppins justify-center">
      <div className="pt-[4.6rem] mx-auto px-7 md:px-10">
        <div className="rounded bg-[#4e0a25] w-[340px] md:w-[600px] p-6">
          <h1 className="text-white font-semibold text-center text-2xl py-4">
            Create A Post
          </h1>
          <div className="flex flex-col space-y-2">
            <label className="text-[20px] md:text-[25px] text-white">
              Title:
            </label>
            <input
              type="text"
              placeholder="Post title..."
              onChange={titleHandler}
              className="rounded-sm p-2 text-[18px] border-none
             outline-none placeholder:opacity-40 placeholder:text-black"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label className="text-[20px] md:text-[25px] text-white">
              Post:
            </label>
            <textarea
              placeholder="Post body.."
              onChange={postHandler}
              className="h-[140px] rounded-sm p-2 text-[18px] border-none 
            outline-none placeholder:opacity-40 placeholder:text-black"
            />
          </div>
          <button
            onClick={createPost}
            className="mt-5 border-none rounded-sm text-md w-full font-semibold
             cursor-pointer bg-white text-[#4e0a25] px-2 py-2"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

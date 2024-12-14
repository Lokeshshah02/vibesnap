import React from "react";
import ProfilePhoto from "../assets/Menu.png";
import Posts from "../components/Posts";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextApi";

const Home = () => {
  const navigate = useNavigate();
  const { state} = useAppContext();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleAddPost = () => {
    navigate("/add-post");
  };

  return (
    <div>
      <div className="flex gap-2 p-4 items-center" onClick={handleProfile}>
        <img
          className="w-12 h-12 rounded-full object-cover mx-1"
          src={state.user?.user_metadata?.avatar_url || ProfilePhoto}
          alt=""
        />
        <div>
          <p className="text-xs text-gray-400">Welcome back,</p>
          <p className="text-base font-bold text-gray-700">
            {state.user?.user_metadata?.full_name || "unknown"}
          </p>
        </div>
      </div>
      <p className="text-3xl px-2 py-4 font-bold mx-3">Feeds</p>
      <div className="rounded-3xl mx-3 flex flex-col gap-3">
        <Posts />
      </div>
      <button
        className="fixed bottom-4 right-4 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-black focus:outline-none "
        onClick={handleAddPost}
      >
        <span className="text-3xl font-semibold">+</span>
      </button>
    </div>
  );
};

export default Home;

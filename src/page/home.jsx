import React from "react";
import ProfilePhoto from "../assets/Menu.png";
import Posts from "../components/Posts";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextApi";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div>
      <div className="flex gap-2 p-4 items-center" onClick={handleProfile}>
        <img src={ProfilePhoto} alt="" />
        <div>
          <p className="text-xs text-gray-400">Welcome back,</p>
          <p className="text-base font-bold text-gray-700">
            {currentUser?.displayName}
          </p>
        </div>
      </div>
      <p className="text-3xl px-2 py-4 font-bold mx-2">Feeds</p>
      <div className="rounded-3xl mx-3 flex flex-col gap-3">
        <Posts />
      </div>
    </div>
  );
};

export default Home;

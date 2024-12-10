import React, { useEffect, useState } from "react";
import ProfilePhoto from "../assets/Menu.png";
import NewYork from "../assets/newyork.png";
import { IoMdHeart } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import ShareModal from "./ShareModal";
import { generateRandomMaterialColor } from "../global/GlobalFunctions";

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const [bgColor, setBgColor] = useState("");

  const handleShareClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setBgColor(generateRandomMaterialColor());
  }, []);

  return (
    <div
      className="bg-gray-100 p-2 rounded-lg shadow-md"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex gap-2 p-4">
        <img src={ProfilePhoto} alt="" className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-base font-bold text-gray-700">Arav</p>
          <p className="text-sm text-gray-400">2 hours ago</p>
        </div>
      </div>
      <p className="mx-2 p-2">
        Just arrived in New York City! Excited to explore the sights, sounds,
        and energy of this amazing place. 🗽 #NYC #Travel
      </p>
      <img src={NewYork} alt="" className="p-2 w-full rounded-md" />
      <div className="flex justify-between items-center p-2">
        <span className="flex items-center space-x-1">
          <IoMdHeart color="red" />
          <span className="text-red-600 text-sm">63</span>
        </span>
        <button
          onClick={handleShareClick}
          className="flex items-center space-x-1 px-5 py-2 bg-gray-200 text-black font-bold rounded-md hover:bg-blue-600 hover:text-white transition-all duration-100 rounded-3xl"
        >
          <FaLocationArrow />
          <span>Share</span>
        </button>
      </div>

      {showModal && <ShareModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default Posts;

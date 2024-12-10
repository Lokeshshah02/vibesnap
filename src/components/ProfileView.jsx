import React from "react";
import Post1 from "../assets/post1.png";
import Post2 from "../assets/post2.png";
import "./ComponentStyles.css"; // Custom CSS for grid styling

const ProfileView = ({ data }) => {
  return (
    <div>
      <h3 className="font-bold text-3xl">{data?.name}</h3>
      <p className="font-normal text-md mt-2 text-gray-800">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae
        adipisicing elit. Sint beatae💕.
      </p>
      <h5 className="mt-3 font-semibold text-lg">My Posts</h5>
      {/* Use grid class for 2 columns */}
      <div className="mt-2 columns-2 sm:columns-2 md:columns-2 lg:columns-2 gap-4 space-y-4">
        <img
          src={Post1}
          alt="Post1"
          className="w-full h-auto rounded-lg object-cover"
        />
        <img
          src={Post2}
          alt="Post2"
          className="w-full h-auto rounded-lg object-cover"
        />
        <img
          src={Post2}
          alt="Post3"
          className="w-full h-auto rounded-lg object-cover"
        />
        <img
          src={Post1}
          alt="Post4"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileView;

import React from "react";
import { BsGoogle } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="mt-auto py-6 px-6 bg-white shadow-lg w-full text-center rounded-tl-3xl rounded-tr-3xl h-9">
      <h1 className="text-3xl font-bold text-gray-800">Vibesnap</h1>
      <p className="text-sm text-gray-600 mt-2">
        Moments That Matter, Shared Forever.
      </p>
      <button className="flex items-center gap-2 justify-center bg-gray-100 text-black px-4 py-2 rounded-full shadow hover:bg-gray-200 ml-auto mr-auto">
        <BsGoogle />
        Continue with Google
      </button>
    </div>
  );
};

export default Footer;

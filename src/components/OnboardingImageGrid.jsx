import React from "react";
import Onboarding4 from "../assets/onboarding-4.png";
import Onboarding1 from "../assets/onboarding1.png";
import Onboarding2 from "../assets/onboarding2.png";
import Onboarding3 from "../assets/onboarding3.png";
import Onboarding5 from "../assets/onboarding5.png";
import Onboarding6 from "../assets/onboarding6.png";
import Onboarding7 from "../assets/onboarding7.png";
import Onboarding8 from "../assets/onboarding8.png";
import Onboarding9 from "../assets/onboarding9.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextApi";

const images = [
  Onboarding4,
  Onboarding1,
  Onboarding2,
  Onboarding8,
  Onboarding5,
  Onboarding3,
  Onboarding6,
  Onboarding7,
  Onboarding6,
  Onboarding9,
  Onboarding5,
];

const ImageGrid = () => {
  const navigate = useNavigate();
  const { signInWithGooglePopup } = useAppContext();

  const handleGoogleAuth = async (e) => {
    e.preventDefault(); 
    try {
      const response = await signInWithGooglePopup();
      if (response) {
        navigate("/home", { replace: true });
      } else {
        console.error("Google auth failed; no response.");
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  return (
    <>
      <div className="columns-3 gap-2 space-y-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative w-full rounded-md overflow-hidden ${
              index === 0 ? "row-span-2 col-span-2" : ""
            }`}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className={`h-full w-full object-cover ${
                index == 3 && "-mt-[6rem]"
              }`}
            />
          </div>
        ))}
      </div>
      <div
        className="pt-10 pb-[10rem] px-6 bg-white shadow-lg w-full text-center rounded-tl-[22%] rounded-tr-[22%]
        relative -top-[32%] 
        "
      >
        <h1 className="text-3xl font-bold text-gray-800">⛷️Vibesnap</h1>
        <p className="text-md text-gray-800 mt-1">
          Moments That Matter, Shared Forever.
        </p>
        <button
          type="button" // Make sure this is type="button" to prevent it from acting as a submit button
          onClick={handleGoogleAuth}
          className="flex items-center gap-2 justify-center bg-gray-800 text-gray-100 px-4 py-2 rounded-full shadow hover:bg-gray-200 ml-auto mr-auto mt-4"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default ImageGrid;

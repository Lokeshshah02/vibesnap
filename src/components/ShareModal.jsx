import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaReddit,
  FaDiscord,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa";

const ShareModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-lg font-bold"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Share Post</h2>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <FaTwitter
              size={38}
              className="text-blue-500 text-2xl rounded-full p-2 bg-gray-200"
            />
            <span className="text-sm mt-1">Twitter</span>
          </div>
          <div className="flex flex-col items-center">
            <FaFacebook
              size={38}
              className="text-blue-600 text-2xl rounded-full p-2 bg-gray-200"
            />
            <span className="text-sm mt-1">Facebook</span>
          </div>
          <div className="flex flex-col items-center">
            <FaReddit
              size={38}
              className="text-orange-600 text-2xl rounded-full p-2 bg-gray-200"
            />
            <span className="text-sm mt-1">Reddit</span>
          </div>
          <div className="flex flex-col items-center">
            <FaDiscord
              size={38}
              className="text-indigo-500 text-2xl rounded-full p-2 bg-gray-200"
            />
            <span className="text-sm mt-1">Discord</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="flex flex-col items-center">
            <FaWhatsapp
              size={38}
              className="text-green-500 text-2xl rounded-full p-2 bg-gray-200"
            />
            <span className="text-sm mt-1">WhatsApp</span>
          </div>
          <div className="flex flex-col items-center">
            <FaTelegram
              size={38}
              className="text-blue-500 text-2xl rounded-full p-2 bg-gray-200"
            />
            <span className="text-sm mt-1">Telegram</span>
          </div>
          <div className="flex flex-col items-center">
            <FaInstagram
              size={38}
              className="text-pink-600 text-2xl rounded-full p-2 bg-gray-200"
            />
            <span className="text-sm mt-1">Instagram</span>
          </div>
        </div>

        <div className="mt-4 p-2 border-t">
          <p className="text-lg font-semibold">Page Link</p>
          <input
            type="text"
            value="https://yourpage.link"
            readOnly
            className="w-full mt-2 p-2 bg-gray-100 rounded-md text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

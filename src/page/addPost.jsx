import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsCamera, BsImages } from "react-icons/bs";

const AddPostPage = ({ onClose, onNext }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");

  const handleSelectFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFile(fileUrl);
      setFileType(file.type.split("/")[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
        <button onClick={onClose}>
          <IoMdArrowRoundBack size={24} />
        </button>
        <p className="font-bold text-lg">New Post</p>
        <button
          className={`text-blue-600 font-semibold ${
            !selectedFile ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => onNext(selectedFile)}
          disabled={!selectedFile}
        >
          Next
        </button>
      </div>

      {/* File Placeholder */}
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        {selectedFile ? (
          fileType === "image" ? (
            <img
              src={selectedFile}
              alt="Selected"
              className="w-full h-auto max-h-full object-contain"
            />
          ) : (
            <video
              src={selectedFile}
              controls
              className="w-full h-auto max-h-full object-contain"
            />
          )
        ) : (
          <p className="text-gray-500">No file selected</p>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 space-y-4 flex justify-around">
        <label className="flex flex-col items-center space-y-2 text-blue-600 cursor-pointer">
          <BsImages size={32} />
          <span>Gallery</span>
          <input
            type="file"
            accept="image/*, video/*"
            className="hidden"
            onChange={handleSelectFile}
          />
        </label>
        <button
          className="flex flex-col items-center space-y-2 text-blue-600"
          style={{
            marginTop: 0,
          }}
          onClick={() =>
            alert("Camera access is not implemented in this demo.")
          }
        >
          <BsCamera size={32} />
          <span>Camera</span>
        </button>
      </div>
    </div>
  );
};

export default AddPostPage;

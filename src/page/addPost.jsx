import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsCamera, BsImages } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AddPostPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Array of selected files
  const navigate = useNavigate();

  const handleSelectFiles = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    if (files.length > 0) {
      const fileData = files.map((file) => ({
        url: URL.createObjectURL(file), // Ensure valid File object
        type: file.type,
        file,
      }));
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileData]);
    } else {
      console.error("No files selected");
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    navigate("/create-post", {
      state: {
        files: selectedFiles,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
        <button onClick={(_) => navigate("/profile")}>
          <IoMdArrowRoundBack size={24} />
        </button>
        <p className="font-bold text-lg">New Post</p>
        <button
          className={`text-blue-600 font-semibold ${
            selectedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={selectedFiles.length === 0}
        >
          Next
        </button>
      </div>

      {/* File Placeholder */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-4 space-y-4">
        {selectedFiles.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 w-full">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="relative w-full h-48 bg-gray-200 flex items-center justify-center"
              >
                {file.type.startsWith("image") ? (
                  <img
                    src={file.url}
                    alt={`Selected ${index}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={file.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  onClick={() => handleRemoveFile(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No files selected</p>
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
            multiple // Allow multiple file selection
            className="hidden"
            onChange={handleSelectFiles}
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

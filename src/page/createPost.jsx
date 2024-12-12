import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextApi";

const CreatePostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { files = [] } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [description, setDescription] = useState("");
  const { uploadFile } = useAppContext();

  const handleNext = () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleUpload = async () => {
    try {
      if (!files || files.length === 0) {
        console.error("No files to upload.");
        return;
      }

      console.log("Starting upload process for files:", files);

      // Upload each file and collect the URLs
      const allUrls = await Promise.all(
        files.map(async (file) => {
          try {
            if (!file?.file) {
              console.warn("Invalid file structure:", file);
              return null;
            }
            const uploadedUrl = await uploadFile(file.file);
            console.log(`File uploaded successfully: ${uploadedUrl}`);
            return uploadedUrl;
          } catch (error) {
            console.error(`Error uploading file "${file.file.name}":`, error);
            return null;
          }
        })
      );

      // Filter out failed uploads (null values)
      const validUrls = allUrls.filter((url) => url !== null);

      if (validUrls.length === 0) {
        console.warn("No files were uploaded successfully.");
      } else {
        console.log("All uploaded file URLs:", validUrls.join(", "));
      }

      // Further processing (e.g., send URLs to the server)
    } catch (error) {
      console.error("Error during file upload process:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
        <button
          onClick={() => navigate("/add-post", { replace: true })}
          className="text-black text-lg font-semibold"
        >
          &larr;
        </button>
        <p className="font-bold text-lg">New Post</p>
        <div />
      </div>

      {/* Media Carousel */}
      <div className="flex items-center justify-center bg-gray-100 relative h-[320px] m-4 rounded-lg">
        {files.length > 0 && (
          <>
            {/* Current File Display */}
            {files[currentIndex].type.startsWith("image") ? (
              <img
                src={files[currentIndex].url}
                alt={`Selected ${currentIndex + 1}`}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              <video
                src={files[currentIndex].url}
                controls
                className="w-full h-full rounded-xl object-cover"
              />
            )}

            {/* Current Index Counter */}
            <div className="absolute top-4 right-4 bg-black text-white text-xs py-1 px-2 rounded">
              {currentIndex + 1}/{files.length}
            </div>

            {/* Dots Navigation */}
            <div className="absolute -bottom-6 flex space-x-2">
              {files.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            {currentIndex > 0 && (
              <button
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
                onClick={handlePrev}
              >
                &larr;
              </button>
            )}
            {currentIndex < files.length - 1 && (
              <button
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
                onClick={handleNext}
              >
                &rarr;
              </button>
            )}
          </>
        )}
      </div>

      {/* Description Section */}
      <div className="p-4">
        <textarea
          className="w-full border-b border-gray-400 p-2 text-sm focus:outline-none"
          rows="3"
          placeholder="Write a description... (Add hashtags #example)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Create Button */}
      <div className="p-4">
        <button
          className="w-full bg-black text-white py-3 rounded-md text-center text-lg font-semibold"
          onClick={handleUpload}
        >
          CREATE
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;

import React, { useState } from "react";

const CreatePostPage = ({ images, onBack, onCreate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [description, setDescription] = useState("");

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
        <button
          onClick={onBack}
          className="text-blue-600 text-lg font-semibold"
        >
          &larr; Back
        </button>
        <p className="font-bold text-lg">Create Post</p>
        <div />
      </div>

      {/* Image Carousel */}
      <div className="relative flex-grow bg-gray-100">
        <img
          src={images[currentIndex]}
          alt={`Selected ${currentIndex + 1}`}
          className="w-full h-auto max-h-full object-contain"
        />

        {/* Page Counter */}
        <div className="absolute top-4 right-4 bg-black text-white text-xs py-1 px-2 rounded">
          {currentIndex + 1}/{images.length}
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
            onClick={handlePrevImage}
          >
            &larr;
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2"
            onClick={handleNextImage}
          >
            &rarr;
          </button>
        )}
      </div>

      {/* Description Input */}
      <div className="p-4">
        <textarea
          className="w-full border-b border-gray-400 p-2 text-sm"
          rows="4"
          placeholder="Write a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Create Button */}
      <div className="p-4">
        <button
          className="w-full bg-black text-white py-3 rounded-md text-center text-lg font-semibold"
          onClick={() => onCreate({ images, description })}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;

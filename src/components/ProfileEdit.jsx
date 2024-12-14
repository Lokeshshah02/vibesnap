import React from "react";

const ProfileEdit = ({ formData, setFormData }) => {
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-600 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter your name"
          className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bio" className="text-gray-600 font-medium">
          Bio
        </label>
        <input
          type="text"
          id="bio"
          value={formData.bio}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, bio: e.target.value }))
          }
          placeholder="Enter your bio"
          className="border-b border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default ProfileEdit;


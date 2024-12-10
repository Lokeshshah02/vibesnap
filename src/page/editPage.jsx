import React, { useState } from "react";
import CoverImage from "../assets/coverImage.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import ProfilePhoto from "../assets/Menu.png";
import { MdEdit } from "react-icons/md";
import ProfileView from "../components/ProfileView";
import ProfileEdit from "../components/ProfileEdit";
import AddPostPage from "./addPost";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextApi";

const EditPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddPost, setIsAddPost] = useState(false);
  const { currentUser } = useAppContext();

  const navigate = useNavigate();

  const handleClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleAddPost = () => {
    setIsAddPost(true);
  };

  const handleBack = () => {
    navigate("/home");
  };

  if (isAddPost) {
    return (
      <AddPostPage
        onClose={() => setIsAddPost(false)}
        onNext={(image) => {
          alert(`Image selected: ${image}`);
          setIsAddPost(false);
        }}
      />
    );
  }

  const propData = {
    name: currentUser?.displayName,
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <section className="relative">
        <img
          src={CoverImage}
          alt="Cover"
          className="w-full h-50 object-cover"
        />

        <div className="absolute top-4 left-4 flex items-center text-white">
          <IoMdArrowRoundBack size={30} onClick={handleBack} />
          <p className="ml-2 text-xl font-bold">Edit Profile</p>
        </div>

        {isEdit && (
          <div className="absolute bottom-4 right-4 p-2 rounded-full bg-slate-100 flex items-center justify-center">
            <MdEdit size={24} className="text-black" />
          </div>
        )}

        <div className="absolute left-4 bottom-1/7 transform -translate-y-1/2">
          <img
            src={ProfilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />

          {isEdit && (
            <div className="absolute bottom-0 right-0 p-2 rounded-full bg-slate-100 flex items-center justify-center">
              <MdEdit size={24} className="text-black" />
            </div>
          )}
        </div>

        <button
          className="absolute px-4 py-2 mt-3 right-8 border-solid border-2 border-gray-400 text-black font-semibold rounded-full focus:outline-none w-1/2"
          onClick={handleClickEdit}
        >
          Edit Profile
        </button>
      </section>

      <div className="mt-20 p-4">
        {isEdit ? (
          <ProfileEdit data={propData} />
        ) : (
          <ProfileView data={propData} />
        )}
      </div>

      {isEdit && (
        <div className="p-2 mb-2">
          <button className="flex justify-center rounded-full bg-black text-white w-full px-4 py-2 mb-8 mt-auto text-center font-medium text-xl">
            Save
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        className="fixed bottom-4 right-4 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-black focus:outline-none"
        onClick={handleAddPost}
      >
        <span className="text-3xl font-semibold">+</span>
      </button>
    </div>
  );
};

export default EditPage;

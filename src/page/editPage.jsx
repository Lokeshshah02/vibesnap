import React, { useEffect, useState } from "react";
import CoverImage from "../assets/coverImage.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import ProfilePhoto from "../assets/Menu.png";
import { MdEdit } from "react-icons/md";
import ProfileView from "../components/ProfileView";
import ProfileEdit from "../components/ProfileEdit";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/ContextApi";
import supabase from "../db/dbConfig";

const EditPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [coverImage, setCoverImage] = useState({ result: CoverImage });
  const [profileImage, setProfileImage] = useState({ result: ProfilePhoto });
  const [formData, setFormData] = useState({ name: "", bio: "" });
  const { state, uploadFile, isLoading, setIsLoading} = useAppContext();
  const navigate = useNavigate();

  const handleClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleBack = () => {
    navigate("/home");
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "cover") {
          setCoverImage({ result: reader.result, file });
        } else {
          setProfileImage({ result: reader.result, file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (state?.user?.user_metadata?.full_name) {
      const { full_name, avatar_url } = state.user.user_metadata;
      const { bio, cover_url } = state.user;

      setFormData({
        name: full_name || "",
        bio: bio || "",
      });

      if (avatar_url) setProfileImage({ result: avatar_url });
      if (cover_url) setCoverImage({ result: cover_url });

      // Update query params
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("name", full_name || "");
      queryParams.set("bio", bio || "");
      queryParams.set("profile_img", avatar_url || "");
      queryParams.set("cover_img", cover_url || "");

      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }
  }, [state]);

  const handleSaveInfo = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (!formData.name.trim()) {
        alert("Name cannot be empty!");
        return;
      }
      let id = state.user.id
      let coverimg = "", profileimg = ""
      if (coverImage?.file) {
        coverimg = await uploadFile(coverImage?.file)
      }
      if (profileImage?.file) {
        profileimg = await uploadFile(profileImage?.file)
      }
      const { data, error } = await supabase
        .from("users") // Specifing the users table to update
        .update({
          name: formData.name,
          bio: formData.bio,
          cover_url: coverimg.data?.publicUrl?.toString(),
          img_url: profileimg.data?.publicUrl?.toString(),
        })
        .eq("google_id", id); // updating the correct user by filtering using the "id" which is matched by google_id

      if (error) throw error;

      alert("Profile updated successfully!");
      setIsEdit(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false)
    }
  };

  const handleAddPost = () => {
    navigate("/add-post");
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <section className="relative">
        {/* Cover Image */}
        <label htmlFor="coverImageInput" className="relative">
          <img
            src={coverImage.result}
            alt="Cover"
            className="w-full h-40 object-cover cursor-pointer rounded-b-lg"
          />

          {isEdit && (<>
            <div className="absolute bottom-4 right-4 p-2 rounded-full bg-slate-100 flex items-center justify-center">
              <MdEdit size={24} className="text-black" />
            </div>
            <input
              id="coverImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "cover")}
            />
          </>

          )}
        </label>


        {/* Back Button */}
        <div className="absolute top-4 left-4 flex items-center text-white">
          <IoMdArrowRoundBack size={30} onClick={handleBack} />
          <p className="ml-2 text-xl font-bold">Edit Profile</p>
        </div>

        {/* Profile Image */}
        <label
          htmlFor="profileImageInput"
          className="absolute left-4 bottom-1/7 transform -translate-y-1/2 cursor-pointer"
        >
          <img
            src={profileImage.result}
            alt="Profile"
            className="w-32 h-32 rounded-full"
          />
          {isEdit && (
            <>
              <div className="absolute bottom-0 right-0 p-2 rounded-full bg-slate-100 flex items-center justify-center">
                <MdEdit size={24} className="text-black" />
              </div>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "profile")}
              />
            </>
          )}
        </label>

        {/* Edit Button */}
        <button
          className="absolute px-4 py-2 mt-3 right-8 border-solid border-2 border-gray-400 text-black font-semibold rounded-full focus:outline-none w-1/2"
          onClick={handleClickEdit}
        >
          Edit Profile
        </button>
      </section>

      <div className="mt-20 p-4">
        {isEdit ? (
          <ProfileEdit
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <ProfileView />
        )}
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="loader w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {isEdit && (
        <div className="p-2 mb-2">
          {!isLoading ? (
            <button
              className="flex justify-center rounded-full bg-black text-white w-full px-4 py-2 mb-8 mt-auto text-center font-medium text-xl"
              onClick={handleSaveInfo}
              disabled={isLoading}
            >
              Save
            </button>
          ) : (
            <div className="flex justify-center items-center">
              <div className="loader "></div>
            </div>
          )}
        </div>
      )}


      {/* Floating Button */}
      <button
        className="fixed bottom-4 right-4 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-black focus:outline-none z-50"
        onClick={handleAddPost}
      >
        <span className="text-3xl font-semibold">+</span>
      </button>

    </div>
  );
};

export default EditPage;

import React, { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import ShareModal from "./ShareModal";
import { generateRandomMaterialColor } from "../global/GlobalFunctions";
import supabase from "../db/dbConfig";
import { useAppContext } from "../context/ContextApi";

const formatTime = (createdAt) => {
  const now = new Date();
  const postTime = new Date(createdAt);
  const diffInSeconds = Math.floor((now - postTime) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  return `${diffInDays} days ago`;
};

const Posts = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});

  const {isLoading, setIsLoading} = useAppContext()

  const handleShareClick = () => {
    setShowModal(true);
  };

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.from("users").select();
      if (error) {
        console.error(error);
      } else {
        setUserData(data); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase.from("posts").select();
      if (error) {
        console.error(error);
      } else {
        setPostData(data); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (postId, currentLikeCount) => {
    try {
      const isLiked = likedPosts[postId];
      const updatedLikeCount = isLiked ? currentLikeCount - 1 : currentLikeCount + 1;
      const { error } = await supabase
        .from("posts")
        .update({ like_count: updatedLikeCount })
        .eq("id", postId);

      if (error) {
        console.error(error);
      } else {
        setPostData((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, like_count: updatedLikeCount } : post
          )
        );
        setLikedPosts((prevLikes) => ({
          ...prevLikes,
          [postId]: !isLiked,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true)
      await fetchUser();
      await fetchPost();
      setIsLoading(false)
    }
    fetchData()
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="loader w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
      </div>
      )}
      {postData &&
        postData.map((post) => {
          const postBgColor = generateRandomMaterialColor();
          const matchedUser = userData.find((user) => user.id === post.user_id);
          return (
            <div
              key={post.id}
              className="p-4 mb-4 rounded-lg"
              style={{ backgroundColor: postBgColor }}
            >
              <div className="flex gap-3 p-4">
                {/*profile picture */}
                <img
                  src={matchedUser ? matchedUser.img_url : ""}
                  alt=""
                  className="w-10 h-10 rounded-full -ml-4"
                />
                <div>
                  <p className="text-base font-bold text-gray-700">
                    {matchedUser ? matchedUser.name : "Loading..."}
                  </p>
                  {/* Display post time */}
                  <p className="text-sm text-gray-400">
                    {formatTime(post.created_at)}
                  </p>
                </div>
              </div>
              <p className="mx-2 p-2">
                {post.description}
              </p>
              <img
                src={post.file}
                alt=""
                className="p-2 w-full rounded-md"
              />
              <div className="flex justify-between items-center p-2">
                <span className="flex items-center space-x-1">
                  {/* Display like count */}
                  <IoMdHeart
                    color={likedPosts[post.id] ? "red" : "gray"}
                    onClick={() => handleLike(post.id, post.like_count)}
                  />
                  <span className="text-red-600 text-sm">{post.like_count}</span>
                </span>
                <button
                  onClick={handleShareClick}
                  className="flex items-center space-x-1 px-5 py-2 bg-gray-200 text-black font-bold rounded-md hover:bg-blue-600 hover:text-white transition-all duration-100 rounded-3xl"
                >
                  <FaLocationArrow />
                  <span>Share</span>
                </button>
              </div>
              {showModal && <ShareModal closeModal={() => setShowModal(false)} />}
            </div>
          );
        })}
    </div>
  );
};

export default Posts;

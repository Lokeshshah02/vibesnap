import React, { useEffect, useState } from "react";
import supabase from "../db/dbConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { useLocation } from "react-router-dom";

const ProfileView = () => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('name');
  const bio = queryParams.get('bio');

  const user = JSON.parse(localStorage.getItem('user'))  

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("posts").select().eq("user_id", user.dbId);      
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        // Grouped posts 
        const groupedPosts = data.reduce((acc, post) => {
          const timestamp = post.created_at;
          if (!acc[timestamp]) {
            acc[timestamp] = [];
          }
          acc[timestamp].push(post);
          return acc;
        }, {});

        setPosts(groupedPosts);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h3 className="font-bold text-3xl">{username}</h3>
      <p className="font-normal text-md mt-2 text-gray-800">
        {bio || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint beatae
        adipisicing elit. Sint beatae💕.`}
      </p>
      <h5 className="mt-3 font-semibold text-lg">My Posts</h5>

      <div className="mt-2 columns-2 sm:columns-2 md:columns-2 lg:columns-2 gap-4 space-y-4">
        {Object.keys(posts).map((timestamp, index) => {
          const postGroup = posts[timestamp];
          return (
            <div key={index} className="relative">
              {/* Swiper for stacked images or videos */}
              <div className="absolute top-1 right-1 z-10 bg-black text-white text-xs p-2 rounded">
                {/* Display the count of images in the top-right corner */}
                {postGroup.length}
              </div>
              <Swiper
                spaceBetween={10} // Space between slides
                slidesPerView={1} // One slide at a time
                // navigation // Enable navigation buttons
                loop // Loop through the slides
                grabCursor={true} // Allows cursor pointer on hover
                autoplay={{ delay: 3000 }} // Optionally, add autoplay
                onSwiper={(swiper) => (swiper)}
              >
                {postGroup.map((post, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={post.file}
                      alt={`Post ${post.id}`}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileView;


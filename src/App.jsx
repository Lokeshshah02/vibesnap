import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/home";
import OnBoarding from "./page/onboarding";
import Profile from "./page/editPage";
import AddPostPage from "./page/addPost";
import CreatePostPage from "./page/createPost";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Router>
        <div className="w-full sm:w-[360px] min-h-screen md:w-[375px] lg:w-[386px] bg-white rounded-lg shadow-lg">
          <Routes>
            <Route path="/" element={<OnBoarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-post" element={<AddPostPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

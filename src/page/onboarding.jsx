import React from "react";
import ImageGrid from "../components/OnboardingImageGrid";
import Footer from "../components/OnboardingFooter";

const OnBoarding = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <ImageGrid />
      {/* <Footer /> */}
    </div>
  );
};

export default OnBoarding;

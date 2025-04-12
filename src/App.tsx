import { useState } from "react";
import "./App.css";
import LandingAnimation from "./components/LandingAnimation";
import WebsiteContent from "./components/WebsiteContent";

function App() {
  const [isLandingAnimationComplete, setIsLandingAnimationComplete] =
    useState(false);
  const yourName = "GREG JOBLOVE";

  return (
    <div className="min-h-screen">
      <LandingAnimation
        name={yourName}
        onAnimationComplete={() => setIsLandingAnimationComplete(true)}
      />
      <WebsiteContent isVisible={isLandingAnimationComplete} />
    </div>
  );
}

export default App;

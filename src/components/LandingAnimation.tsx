import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingAnimationProps {
  name: string;
  onAnimationComplete: () => void;
}

const LandingAnimation: React.FC<LandingAnimationProps> = ({
  name,
  onAnimationComplete,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (displayText.length < name.length) {
      const timeout = setTimeout(() => {
        setDisplayText(name.slice(0, displayText.length + 1));
      }, 150); // Speed of typing

      return () => clearTimeout(timeout);
    } else {
      // Wait a bit after typing completes before starting the next animation
      const timeout = setTimeout(() => {
        setIsTypingComplete(true);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [displayText, name]);

  // Notify parent component when all animations are complete
  useEffect(() => {
    if (isTransitionComplete) {
      onAnimationComplete();
    }
  }, [isTransitionComplete, onAnimationComplete]);

  return (
    <div
      className={`w-full ${
        !isTransitionComplete ? "h-screen" : "h-auto"
      } flex flex-col items-center`}
    >
      <AnimatePresence mode="wait">
        {!isTypingComplete ? (
          <motion.div
            key="center-name"
            className="flex items-center justify-center h-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 className="text-6xl md:text-8xl text-center">
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
              >
                |
              </motion.span>
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="header-name"
            className="w-full text-center mt-10"
            initial={{ y: "50vh" }}
            animate={{
              y: 0,
              transition: {
                duration: 1.2,
                ease: [0.19, 1, 0.22, 1], // Custom easing for smooth animation
              },
            }}
            onAnimationComplete={() => setIsTransitionComplete(true)}
          >
            <h1 className="text-[4em] font-normal">{name}</h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.3, duration: 0.5 },
              }}
              className="text-lg font-bold"
            >
              vfx/graphics
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5, duration: 0.5 },
              }}
              className="flex justify-center space-x-6 mt-10"
            >
              <a
                href="mailto:contact@example.com"
                className="hover:opacity-70 transition-opacity text-lg"
              >
                email
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity text-lg"
              >
                linkedin
              </a>
              <a
                href="https://imdb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity text-lg"
              >
                imdb
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity text-lg"
              >
                ig
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingAnimation;

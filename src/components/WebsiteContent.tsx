import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import Navbar from "./Navbar";
import ProjectsSection, { Project } from "./ProjectsSection";

interface WebsiteContentProps {
  isVisible: boolean;
}

const WebsiteContent: React.FC<WebsiteContentProps> = ({ isVisible }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Animation variants for the content sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative">
      {/* Navbar component */}
      <Navbar isVisible={isVisible} />

      {/* Main content container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="w-[80%] max-w-6xl mx-auto px-4 sm:px-6 py-12"
      >
        {/* Main Video Reel */}
        <motion.section variants={itemVariants} id="reel" className="mb-20">
          <div className="relative aspect-video w-full bg-gray-900 border-3 overflow-hidden">
            <video
              className="w-full h-full object-cover"
              controls
              muted
              autoPlay
            >
              <source
                src="/vite-react-test/videos/2024_General_v7.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2 className="text-lg font-bold text-left ml-2">2025 REEL</h2>
        </motion.section>

        {/* Projects Section */}
        <ProjectsSection
          variants={itemVariants}
          itemVariants={itemVariants}
          onSelectProject={setSelectedProject}
        />

        {/* Featured Videos */}
        <motion.section variants={itemVariants} className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((video) => (
              <div
                key={video}
                className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden"
              >
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="https://via.placeholder.com/800x450"
                >
                  <source
                    src={`https://example.com/featured${video}.mp4`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section variants={itemVariants} id="about" className="mb-20">
          <h2 className="text-3xl font-bold mb-8">About</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed mb-6">
              I am a Visual Effects Artist with over 8 years of experience in
              creating stunning digital environments and effects for film,
              television, and advertising. My expertise lies in particle
              systems, fluid simulations, and dynamic lighting, with a
              particular focus on creating immersive and realistic digital
              worlds.
            </p>
            <p className="text-lg leading-relaxed">
              My work combines technical precision with artistic vision,
              resulting in visual effects that not only look incredible but also
              serve the story and enhance the viewer's experience. I'm
              passionate about pushing the boundaries of what's possible in
              digital art and constantly exploring new techniques and
              technologies.
            </p>
          </div>
        </motion.section>

        {/* Lightbox */}
        {selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default WebsiteContent;

import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import babygirl_poster from "../assets/images/posters/BabyGirl_DIGI_Teaser_Fin7.jpg";

interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  media: {
    type: "image" | "video";
    url: string;
  }[];
  year: string;
  role: string;
  client: string;
  studio: string;
  director: string;
}

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

  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "Babygirl",
      description:
        "Responsible for a number of invisible VFX shots. Reflection cleanup, roto, set extension, beauty work, and more.",
      thumbnail: babygirl_poster,
      media: [
        { type: "image", url: "https://via.placeholder.com/800x1200" },
        { type: "image", url: "https://via.placeholder.com/800x450" },
        { type: "image", url: "https://via.placeholder.com/800x450" },
      ],
      year: "2024",
      role: "VFX Artist",
      client: "A24",
      studio: "Phosphene FX",
      director: "Halina Reijn",
    },
    {
      id: 2,
      title: "Underwater Odyssey",
      description:
        "Realistic underwater environment with fluid simulations and caustic lighting effects.",
      thumbnail: "https://via.placeholder.com/400x225",
      media: [
        { type: "video", url: "https://example.com/video2.mp4" },
        { type: "image", url: "https://via.placeholder.com/800x450" },
      ],
      year: "2023",
      role: "Environment Artist",
      client: "Universal Pictures",
      studio: "Digital Domain",
      director: "James Cameron",
    },
    {
      id: 3,
      title: "Digital Metropolis",
      description:
        "Futuristic cityscape with advanced particle systems and dynamic lighting.",
      thumbnail: "https://via.placeholder.com/400x225",
      media: [
        { type: "video", url: "https://example.com/video3.mp4" },
        { type: "image", url: "https://via.placeholder.com/800x450" },
      ],
      year: "2022",
      role: "VFX Supervisor",
      client: "Warner Bros",
      studio: "DNEG",
      director: "Christopher Nolan",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Navigation */}
      <motion.nav variants={itemVariants} className="mb-12">
        <ul className="flex space-x-8 justify-center md:justify-end">
          <li>
            <a
              href="#reel"
              className="text-lg hover:text-blue-500 transition-colors"
            >
              Reel
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-lg hover:text-blue-500 transition-colors"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-lg hover:text-blue-500 transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-lg hover:text-blue-500 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>
      </motion.nav>

      {/* Main Video Reel */}
      <motion.section variants={itemVariants} id="reel" className="mb-20">
        <div className="relative aspect-video w-full bg-gray-900 border-3 overflow-hidden">
          <video className="w-full h-full object-cover" controls muted autoPlay>
            <source
              src="public/videos/2024_General_v7.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <h2 className="text-lg font-bold text-left ml-2">2025 REEL</h2>
      </motion.section>

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

      {/* Projects Section */}
      <motion.section variants={itemVariants} id="projects" className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-video">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{project.year}</span>
                  <span>{project.role}</span>
                </div>
              </div>
            </motion.div>
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
            television, and advertising. My expertise lies in particle systems,
            fluid simulations, and dynamic lighting, with a particular focus on
            creating immersive and realistic digital worlds.
          </p>
          <p className="text-lg leading-relaxed">
            My work combines technical precision with artistic vision, resulting
            in visual effects that not only look incredible but also serve the
            story and enhance the viewer's experience. I'm passionate about
            pushing the boundaries of what's possible in digital art and
            constantly exploring new techniques and technologies.
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
  );
};

export default WebsiteContent;

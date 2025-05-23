import React from "react";
import { motion } from "framer-motion";
import { Project } from "../utils/projectParse";

interface Media {
  type: "image" | "video";
  url: string;
}

interface LightboxProps {
  project: Project;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ project, onClose }) => {
  // Convert project.mediaPath to media array for display
  const media: Media[] = [];

  if (project.mediaPath) {
    // Add image from mediaPath
    media.push({
      type: "image",
      url: `/vite-react-test/images/${project.mediaPath}`,
    });

    // Add a sample video for demo purposes
    media.push({
      type: "video",
      url: "/vite-react-test/videos/BabyGirl_Reel.webm",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 md:p-8"
      onClick={onClose}
    >
      {/* Content Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="bg-white border-3 border-black w-full max-w-6xl max-h-[90vh] overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation header - fixed at top */}
        <div className="bg-black text-white flex items-center justify-between px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button className="flex items-center text-white">
              <span className="mr-2">←</span>
              <span className="text-lg font-light italic">
                {project.name.toLowerCase()}
              </span>
            </button>
            <span className="mx-3">→</span>
          </div>
          <button
            onClick={onClose}
            className="text-white text-lg font-light hover:opacity-70 p-0.5 transition-opacity"
          >
            esc
          </button>
        </div>

        {/* Scrollable content area */}
        <div
          className="p-8 md:p-12 overflow-y-auto"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(209, 209, 209, 0.5) 10%, transparent 0%)",
            backgroundSize: "20px 20px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
            {/* Left Column - Media */}
            <div>
              <div className="aspect-[2/3] mb-4">
                {media.length > 0 ? (
                  media[0].type === "video" ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                    >
                      <source src={media[0].url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={media[0].url}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    No media available
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="flex flex-col items-start text-left w-full">
              <h2 className="text-6xl font-normal mb-1 leading-none">
                {project.name}
              </h2>
              <p className="text-2xl mb-6 mt-0 leading-tight">{project.year}</p>

              {/* Project metadata in a bracket-like design */}
              <div className="pl-5 mb-6 relative">
                <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-gray-500 -mt-1"></div>
                <div className="absolute left-0 bottom-0 h-5 w-5 border-l-2 border-b-2 border-gray-500 -mb-1"></div>
                <div className="absolute -right-10 top-0 h-5 w-5 border-r-2 border-t-2 border-gray-500 -mt-1"></div>
                <div className="absolute -right-10 bottom-0 h-5 w-5 border-r-2 border-b-2 border-gray-500 -mb-1"></div>
                <div className="flex flex-col text-lg">
                  {project.credits.map((credit, index) => (
                    <div key={index} className="flex items-center">
                      <div className="font-bold pr-2">{credit.credit}</div>
                      <div className="flex-grow border-t-3 border-dotted border-black translate-y-1 px-4"></div>
                      <div className="pl-2">
                        {credit.person ? (
                          credit.person.includes("[") ? (
                            <a
                              href={credit.person
                                .split("[")[1]
                                .replace("]", "")}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {credit.person.split("[")[0]}
                            </a>
                          ) : (
                            credit.person
                          )
                        ) : (
                          "—"
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills/tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags && project.tags.length > 0 ? (
                  project.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="border border-black bg-white px-4 py-1"
                    >
                      {tag}
                    </div>
                  ))
                ) : (
                  <div className="border border-black px-4 py-1">
                    {project.category}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-lg leading-relaxed mb-0">{project.blurb}</p>
            </div>
          </div>

          {/* Additional media section, full width, 2 columns */}
          {media.length > 1 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {media.slice(1).map((mediaItem, index) => (
                <div key={index} className="aspect-video w-full">
                  {mediaItem.type === "video" ? (
                    <video className="w-full h-full object-cover" controls>
                      <source src={mediaItem.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={mediaItem.url}
                      alt={`${project.name} - ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;

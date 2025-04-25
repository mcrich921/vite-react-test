import { motion } from "framer-motion";

interface Media {
  type: "image" | "video";
  url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  media: Media[];
  client?: string;
  studio?: string;
  director?: string;
  year: string;
  role: string;
  skills?: string[];
}

interface LightboxProps {
  project: Project;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ project, onClose }) => {
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
        className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation header */}
        <div className="bg-black text-white flex items-center justify-between px-8 py-4">
          <div className="flex items-center">
            <button className="flex items-center text-white hover:opacity-70 transition-opacity">
              <span className="mr-2">←</span>
              <span className="text-lg font-light">
                {project.title.toLowerCase()}
              </span>
            </button>
            <span className="mx-3">→</span>
          </div>
          <button
            onClick={onClose}
            className="text-white text-lg font-light hover:opacity-70 transition-opacity"
          >
            esc
          </button>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Media */}
            <div>
              <div className="aspect-[2/3] mb-8">
                {project.media[0].type === "video" ? (
                  <video
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                  >
                    <source src={project.media[0].url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={project.media[0].url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Additional grid of images (shown below main image) */}
              <div className="grid grid-cols-1 gap-4">
                {project.media.slice(1).map((media, index) => (
                  <div key={index} className="aspect-video">
                    {media.type === "video" ? (
                      <video className="w-full h-full object-cover" controls>
                        <source src={media.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={media.url}
                        alt={`${project.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Info */}
            <div>
              <h2 className="text-6xl font-normal mb-2">{project.title}</h2>
              <p className="text-2xl mb-10">{project.year}</p>

              {/* Project metadata in a bracket-like design */}
              <div className="border-l-2 border-black pl-5 mb-10 relative">
                <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-black -ml-2 -mt-1"></div>
                <div className="absolute left-0 bottom-0 h-5 w-5 border-l-2 border-b-2 border-black -ml-2 -mb-1"></div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-lg">
                  <div className="font-light">Client</div>
                  <div>{project.client || "—"}</div>

                  <div className="font-light">Studio</div>
                  <div>{project.studio || "—"}</div>

                  <div className="font-light">Director</div>
                  <div>{project.director || "—"}</div>
                </div>
              </div>

              {/* Skills/tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.skills ? (
                  project.skills.map((skill, index) => (
                    <div key={index} className="border border-black px-4 py-1">
                      {skill}
                    </div>
                  ))
                ) : (
                  <div className="border border-black px-4 py-1">
                    {project.role}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-lg leading-relaxed mb-6">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;

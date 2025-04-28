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
        className="bg-white border-3 border-black w-full max-w-6xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation header */}
        <div className="bg-black text-white flex items-center justify-between px-8 py-4">
          <div className="flex items-center">
            <button className="flex items-center text-white">
              <span className="mr-2">←</span>
              <span className="text-lg font-light italic">
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

        <div
          className="p-8 md:p-12"
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
            </div>

            {/* Right Column - Info */}
            <div className="flex flex-col items-start text-left w-full">
              <h2 className="text-6xl font-normal mb-1 leading-none">
                {project.title}
              </h2>
              <p className="text-2xl mb-6 mt-0 leading-tight">{project.year}</p>

              {/* Project metadata in a bracket-like design */}
              <div className="pl-5 mb-6 relative">
                <div className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-black -ml-2 -mt-1"></div>
                <div className="absolute left-0 bottom-0 h-5 w-5 border-l-2 border-b-2 border-black -ml-2 -mb-1"></div>
                <div className="grid grid-cols-2 gap-x-4 mb-2 text-lg">
                  <div className="font-bold">Client</div>
                  <div>{project.client || "—"}</div>
                  <div className="font-bold">Studio</div>
                  <div>{project.studio || "—"}</div>
                  <div className="font-bold">Director</div>
                  <div>{project.director || "—"}</div>
                </div>
              </div>

              {/* Skills/tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills ? (
                  project.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="border border-black bg-white px-4 py-1"
                    >
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
              <p className="text-lg leading-relaxed mb-0">
                {project.description}
              </p>
            </div>
          </div>

          {/* Additional media section, full width, 2 columns */}
          {project.media.length > 1 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.media.map((media, index) => (
                <div key={index} className="aspect-video w-full">
                  {media.type === "video" ? (
                    <video className="w-full h-full object-cover" controls>
                      <source src={media.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={media.url}
                      alt={`${project.title} - ${index + 2}`}
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

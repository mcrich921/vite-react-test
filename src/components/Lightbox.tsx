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
        className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-black text-sm font-light hover:opacity-70 transition-opacity"
        >
          esc
        </button>

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
              <div className="grid grid-cols-2 gap-4">
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
              <h2 className="text-5xl font-normal mb-4">{project.title}</h2>
              <p className="text-xl mb-8">{project.year}</p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-12 text-lg">
                {project.client && (
                  <>
                    <div className="font-light">Client</div>
                    <div>{project.client}</div>
                  </>
                )}
                {project.studio && (
                  <>
                    <div className="font-light">Studio</div>
                    <div>{project.studio}</div>
                  </>
                )}
                {project.director && (
                  <>
                    <div className="font-light">Director</div>
                    <div>{project.director}</div>
                  </>
                )}
                <div className="font-light">Role</div>
                <div>{project.role}</div>
              </div>

              <p className="text-lg leading-relaxed">{project.description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;

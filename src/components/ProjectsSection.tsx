import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Project, parseProjects } from "../utils/projectParse";

interface ProjectsSectionProps {
  variants: any;
  itemVariants: any;
  onSelectProject?: (project: Project) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  variants,
  itemVariants,
  onSelectProject,
}) => {
  // track selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    parseProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.error("Error parsing projects:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleCategory = (cate: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cate) ? prev.filter((c) => c !== cate) : [...prev, cate]
    );
  };

  const handleProjectClick = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  // filter list based on selected categories
  const filteredProjects =
    selectedCategories.length > 0
      ? projects.filter(
          (p) => p.category && selectedCategories.includes(p.category)
        )
      : projects;

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error}</div>;

  return (
    <motion.section variants={variants} id="projects" className="mb-20">
      <div className="flex justify-around items-center mb-8">
        <h2 className="text-6xl font-normal">projects</h2>
      </div>
      {/* Category filters */}
      <div className="flex gap-8 justify-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="vfx-filter"
            checked={selectedCategories.includes("VFX")}
            onChange={() => toggleCategory("VFX")}
            className="w-4 h-4"
          />
          <label htmlFor="vfx-filter" className="text-md font-bold">
            VFX
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="mograph-filter"
            checked={selectedCategories.includes("MoGraph")}
            onChange={() => toggleCategory("MoGraph")}
            className="w-4 h-4"
          />
          <label htmlFor="mograph-filter" className="text-md font-bold">
            MoGraph
          </label>
        </div>
      </div>

      {/* Projects list - text layout matching mockup */}
      <div className="text-center relative px-0 py-8 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ opacity: 0.7 }}
              className="cursor-pointer inline-block mx-6 text-xl font-normal my-4"
              onClick={() => handleProjectClick(project)}
            >
              {project.name}
              {project.credits.find((credit) => credit.credit === "Client")
                ? ` (${
                    project.credits.find((credit) => credit.credit === "Client")
                      ?.person
                  })`
                : ""}
              <sup className="align-super text-sm ml-1">
                {project.year.slice(-4)}
              </sup>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;

import { motion } from "framer-motion";
import { useState } from "react";

interface Media {
  type: "image" | "video";
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  media: Media[];
  year: string;
  role: string;
  client: string;
  studio: string;
  director: string;
  category?: "VFX" | "MoGraph";
  skills?: string[];
}

const projectsData = [
  {
    name: "Babygirl",
    client: "A24",
    year: "12/25/2024",
    image_url: "BabyGirl_DIGI_Teaser_Fin7.jpg",
    link: "https://a24films.com/films/babygirl",
    category: "VFX",
    blurb:
      "Working at Phosphene, I completed a number of invisible VFX shots for Babygirl. Reflection paint outs, beauty work, set augmentation, grip equipment removal, etc.",
  },
  {
    name: "Daredevil Born Again",
    client: "Marvel",
    year: "3/4/2025",
    image_url: "Daredevil.jpg",
    link: "",
    category: "VFX",
    blurb:
      "Working at Phosphene, I worked on and shadowed a number of small composting tasks for the project. Screen replacements, paintout, CG comps, and invisible VFX.",
  },
  {
    name: "Diarra From Detroit",
    client: "BET+",
    year: "3/21/2024",
    image_url: "DiarraFromDetroit_Poster.jpg",
    link: "",
    category: "VFX",
    blurb:
      "Working at Atlantic Pictures, I completed miscelanous VFX tasks screen comps, enviornment augmentation, and UI elements.",
  },
  {
    name: "Reminants of Nova",
    client: "-",
    year: "10/12/2024",
    image_url: "Reminants.jpg",
    link: "",
    category: "VFX",
    blurb:
      "Using NASA footage of the sun's surface as plates, I composited them in a way to match the established cinematic launguage of the film, and to make it appear as though it was shot on the same camera and lenses. Also created a few shots of a nebula though a telescope, all in comp in Nuke.",
  },
  {
    name: "The Mix",
    client: "Mad Max FX",
    year: "1/1/2025",
    image_url: "TheMix.jpg",
    link: "",
    category: "VFX",
    blurb: "Tracked and comped a logo onto a jar for a few shots.",
  },
  {
    name: "A Seat at the Table",
    client: "-",
    year: "1/1/2024",
    image_url: "",
    link: "",
    category: "VFX",
    blurb:
      "Mostly set augmenation (wallpaper seam removal) and other small paintout work.",
  },
  {
    name: "Anamorphia II",
    client: "MAKE ART NOW",
    year: "6/12/2021",
    image_url: "",
    link: "",
    category: "VFX",
    blurb:
      "Completed 70+ VFX shots in the span of two weeks, and managed a team of 15 remote VFX artists, establishing a simple pipeline to keep things organized. Created custom UI elements for O.T.I.S.",
  },
  {
    name: "Bankrupt Opener",
    client: "Bright Sun Films",
    year: "8/10/2022",
    image_url: "",
    link: "",
    category: "MoGraph",
    blurb:
      "Created in After Effects, this opening title sequence aimed at increasing the production quality of Jake William's Bankrupt series. It used the audio and soundtrack that accompianed the previous piece as a starting point, and has eight distinct segments.",
  },
  {
    name: "Under the Lights",
    client: "Miles Levin",
    year: "",
    image_url: "",
    link: "",
    category: "VFX",
    blurb:
      "Created a CG brain shot using geometry generated in Houdini, rendered in Blender, and comped in Nuke.",
  },
  {
    name: "Bridgewater 30th",
    client: "Bridgewater Advisors",
    year: "7/13/2023",
    image_url: "",
    link: "",
    category: "MoGraph",
    blurb:
      "Animated Bridgewater Advisors' logo into a 30th anniversay medalion to be used in a colection of client facing videos.",
  },
  {
    name: "Backlot Animations",
    client: "Atlantic Pictures",
    year: "7/13/2024",
    image_url: "",
    link: "",
    category: "MoGraph",
    blurb:
      "Determined a motion graphic style for Backlot, a compnay focused on connecting real estate developers with film sets.",
  },
];

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

  const toggleCategory = (cate: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cate) ? prev.filter((c) => c !== cate) : [...prev, cate]
    );
  };

  const handleProjectClick = (proj: any) => {
    if (onSelectProject) {
      // Determine skills based on project type or content
      const skills = [];

      // Add general skills based on category
      if (proj.category === "VFX") {
        skills.push("vfx");
      } else if (proj.category === "MoGraph") {
        skills.push("motion");
      }

      // Add specific skills mentioned in the blurb
      if (proj.blurb.toLowerCase().includes("roto")) skills.push("roto");
      if (proj.blurb.toLowerCase().includes("paint")) skills.push("paintout");
      if (proj.blurb.toLowerCase().includes("beauty")) skills.push("beauty");
      if (proj.blurb.toLowerCase().includes("comp")) skills.push("compositing");
      if (proj.blurb.toLowerCase().includes("track")) skills.push("tracking");
      if (
        proj.blurb.toLowerCase().includes("3d") ||
        proj.blurb.toLowerCase().includes("cg")
      )
        skills.push("3d");

      // Convert the project data to match the Project interface
      const formattedProject: Project = {
        id: projectsData.findIndex((p) => p.name === proj.name) + 1,
        title: proj.name,
        description: proj.blurb,
        thumbnail: proj.image_url || "",
        media: [
          {
            type: "image",
            url: proj.image_url
              ? `/vite-react-test/images/${proj.image_url}`
              : "/vite-react-test/images/placeholder.jpg",
          },
        ],
        year: proj.year,
        role: "VFX Artist",
        client: proj.client,
        studio: proj.category === "VFX" ? "Phosphene FX" : "",
        director: proj.category === "VFX" ? "Halina Reijn" : "",
        category: proj.category as "VFX" | "MoGraph" | undefined,
        skills: skills.length > 0 ? skills : undefined,
      };

      onSelectProject(formattedProject);
    }
  };

  // filter list based on selected categories
  const filteredProjects =
    selectedCategories.length > 0
      ? projectsData.filter(
          (p) => p.category && selectedCategories.includes(p.category)
        )
      : projectsData;

  return (
    <motion.section variants={variants} id="projects" className="mb-20">
      <div className="flex justify-around items-center mb-8">
        <h2 className="text-6xl font-normal">projects</h2>
        {/* <a
          href="/cv"
          className="text-xl italic underline hover:opacity-70 transition-opacity"
        >
          View CV
        </a> */}
      </div>
      {/* Category filters */}
      <div className="flex gap-8 mb-8 justify-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="vfx-filter"
            checked={selectedCategories.includes("VFX")}
            onChange={() => toggleCategory("VFX")}
            className="w-5 h-5"
          />
          <label htmlFor="vfx-filter" className="text-xl">
            VFX
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="mograph-filter"
            checked={selectedCategories.includes("MoGraph")}
            onChange={() => toggleCategory("MoGraph")}
            className="w-5 h-5"
          />
          <label htmlFor="mograph-filter" className="text-xl">
            MoGraph
          </label>
        </div>
      </div>
      {/* Projects list as text entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
        {filteredProjects.map((proj, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ opacity: 0.7 }}
            className="cursor-pointer text-xl font-normal"
            onClick={() => {
              handleProjectClick(proj);
            }}
          >
            {proj.name}
            {proj.client ? ` (${proj.client})` : ""}
            <sup className="align-super text-sm ml-1">{proj.year}</sup>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectsSection;

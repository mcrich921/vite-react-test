import { motion } from "framer-motion";

interface AboutSectionProps {
  variants: any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ variants }) => {
  return (
    <motion.section variants={variants} id="about" className="mb-20">
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
  );
};

export default AboutSection;

import { motion } from "framer-motion";

interface NavbarProps {
  isVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isVisible }) => {
  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2, // Delay navbar appearance
        duration: 0.6,
        staggerChildren: 0.1,
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
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="fixed top-10 right-16 z-40"
    >
      <ul className="flex flex-col space-y-3 text-left">
        <motion.li variants={itemVariants}>
          <a
            href="#projects"
            className="text-lg hover:text-blue-500 transition-colors"
          >
            projects
          </a>
        </motion.li>
        <motion.li variants={itemVariants}>
          <a
            href="#reel"
            className="text-lg hover:text-blue-500 transition-colors"
          >
            reels
          </a>
        </motion.li>
        <motion.li variants={itemVariants}>
          <a
            href="#about"
            className="text-lg hover:text-blue-500 transition-colors"
          >
            about
          </a>
        </motion.li>
        <motion.li variants={itemVariants}>
          <a
            href="#contact"
            className="text-lg hover:text-blue-500 transition-colors"
          >
            contact
          </a>
        </motion.li>
        <motion.li variants={itemVariants}>
          <a
            target="_blank"
            href="google.com"
            className="text-lg hover:text-blue-500 transition-colors"
          >
            tools
          </a>
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface LandingButtonProps {
  name: string;
  link: string;
  selected: boolean;
}

const LandingButton: React.FC<LandingButtonProps> = ({ name, link, selected }) => {
  return (
    <Link href={link} legacyBehavior>
      <a
        className={`px-1 py-40 text-base font-semibold rounded-md transition-all duration-75 ${
          selected ? "text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        {name}
      </a>
    </Link>
  );
};

const Nav = () => {
  const router = useRouter();
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavbarVisible(false); 
      } else {
        setIsNavbarVisible(true); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-[-2rem] left-1/2 transform -translate-x-1/2 z-[999] flex gap-6 bg-transparent sm:top-0"
      style={{ opacity: isNavbarVisible ? 1 : 0, transition: "opacity 0.3s ease" }} 
    >
      <LandingButton name="Home" link="/" selected={router.pathname === "/"} />
      <LandingButton name="Projects" link="/project" selected={router.pathname === "/project"} />
      <LandingButton name="Skills" link="/skills" selected={router.pathname === "/skills"} />
    </motion.div>
  );
};

export default Nav;

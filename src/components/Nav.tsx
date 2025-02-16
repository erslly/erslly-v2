import { AnimatePresence, motion } from "framer-motion";
import { FaHome, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { classNames } from "../../util/classNames";

const LandingButton = ({
  name,
  link,
  selected,
  icon,
}: {
  name: string;
  link: string;
  selected: boolean;
  icon: JSX.Element;
}) => {
  return (
    <Link href={link} legacyBehavior>
      <a
        className={classNames(
          selected
            ? "bg-black/10 dark:bg-[#c8c8dc]/10"
            : "bg-transparent hover:bg-gray-700/5 dark:hover:bg-[#c8c8dc]/5 dark:text-white",
          "cursor-pointer px-4 py-2 text-sm rounded-md text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all duration-75"
        )}
      >
        <span className="flex items-center gap-2">
          {icon}
          {name}
        </span>
      </a>
    </Link>
  );
};

const Nav = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((old) => !old);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.div className="hidden z-[999] fixed w-[90%] md:w-[50rem] xs:flex flex-row justify-center items-center px-1 py-2 mt-40 md:mt-20 rounded-md bg-white/60 dark:bg-[#12181d]/60 border border-slate-800/50 backdrop-blur-lg" style={{ top: '-3px' }}>
        <div className="flex flex-row items-center justify-center gap-4">
          <LandingButton
            name="Home"
            link="/"
            selected={router.pathname === "/"}
            icon={<FaHome className="w-5 h-5" />}
          />
          <LandingButton
            name="Project"
            link="/project"
            selected={router.pathname === "/project"}
            icon={<FaEnvelope className="w-5 h-5" />}
          />
          <LandingButton
            name="Skills"
            link="/skills"
            selected={router.pathname === "/skills"}
            icon={<FaEnvelope className="w-5 h-5" />}
          />
        </div>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div className="xs:hidden z-[990] fixed w-full flex flex-row justify-between items-center px-4 py-3 bg-white/60 dark:bg-[#12181d]/60 border-b border-slate-800/50 backdrop-blur-lg" style={{ top: '-3px' }}>
        <div className="flex flex-row items-center justify-between gap-4">
          <span className="text-xl font-extrabold text-white-600 dark:text-white-400">
            ERSLLY
          </span>
        </div>

        <div className="flex flex-row items-center justify-center">
          <button onClick={toggleMenu} className="h-9 w-9 flex items-center justify-center">
            {!mobileMenuOpen ? <HiMenu className="w-7 h-7" /> : <HiX className="w-7 h-7" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Backdrop and Content */}
      <AnimatePresence exitBeforeEnter>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="NavBackdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="z-[500] fixed w-full h-screen overflow-hidden backdrop-blur-md bg-black/10 flex flex-col items-center justify-content"
            />

            <motion.div
              key="NavMenu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="flex flex-col items-center justify-start mt-16 fixed w-full h-auto z-[700] bg-white dark:bg-[#090c0f] border-x border-b border-slate-800/30"
            >
              <div className="flex flex-row w-full justify-evenly">
                <LandingButton
                  name="Home"
                  link="/"
                  selected={router.pathname === "/"}
                  icon={<FaHome className="w-5 h-5" />}
                />
                  <LandingButton
                  name="Project"
                  link="/project"
                  selected={router.pathname === "/project"}
                  icon={<FaEnvelope className="w-5 h-5" />}
                />
                  <LandingButton
                  name="Skills"
                  link="/skills"
                  selected={router.pathname === "/skills"}
                  icon={<FaEnvelope className="w-5 h-5" />}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;

import { AnimatePresence, motion } from "framer-motion";
import { SiTwitter, SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { classNames } from "../../util/classNames";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaEnvelope } from "react-icons/fa";

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
      <motion.div className="hidden z-[999] fixed w-[90%] md:w-[50rem] xs:flex flex-row justify-between items-center px-4 py-2 mt-4 md:mt-6 rounded-md bg-white/60 dark:bg-[#12181d]/60 border border-slate-800/50 backdrop-blur-lg">
        <div className="flex flex-row items-center justify-between gap-4">
          <ThemeToggle />
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            ERSLLY
          </span>

          <LandingButton
            name="Home"
            link="/"
            selected={router.pathname === "/"}
            icon={<FaHome className="w-5 h-5" />} // Ev ikonu
          />
          <LandingButton
            name="Contact"
            link="/contact"
            selected={router.pathname === "/contact"}
            icon={<FaEnvelope className="w-5 h-5" />} // İletişim ikonu
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-2 xs:gap-4">
          <Link href="https://erslly.xyz/github" passHref>
            <a className="w-6 h-6 cursor-pointer hover:fill-white fill-gray-400 transition-colors">
              <SiGithub className="w-6 h-6" />
            </a>
          </Link>
          <Link href="https://erslly.xyz/x" passHref>
            <a className="w-6 h-6 cursor-pointer hover:fill-white fill-gray-400 transition-colors">
              <SiX className="w-6 h-6" />
            </a>
          </Link>
          <Link href="mailto:dev@erslly.xyz" passHref>
            <a className="w-6 h-6 cursor-pointer hover:stroke-white stroke-gray-400 transition-colors">
              <FiMail className="w-6 h-6" />
            </a>
          </Link>
        </div>
      </motion.div>

      <motion.div className="xs:hidden z-[990] fixed w-full flex flex-row justify-between items-center px-4 py-3 bg-white/60 dark:bg-[#12181d]/60 border-b border-slate-800/50 backdrop-blur-lg">
        <div className="flex flex-row items-center justify-between gap-4">
          <ThemeToggle />
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
            ERSLLY
          </span>
        </div>

        <div className="flex flex-row items-center justify-center">
          <button onClick={toggleMenu} className="h-9 w-9 flex items-center justify-center">
            {!mobileMenuOpen ? <HiMenu className="w-7 h-7" /> : <HiX className="w-7 h-7" />}
          </button>
        </div>
      </motion.div>

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
                  name="Contact"
                  link="/contact"
                  selected={router.pathname === "/contact"}
                  icon={<FaEnvelope className="w-5 h-5" />} 
                />
              </div>

              <div className="flex flex-row items-center justify-center gap-6 py-4">
                <Link href="https://erslly.xyz/github" passHref>
                  <a className="w-6 h-6 cursor-pointer">
                    <SiGithub className="w-6 h-6" />
                  </a>
                </Link>
                <Link href="https://erslly.xyz/x" passHref>
                  <a className="w-6 h-6 cursor-pointer">
                    <SiX className="w-6 h-6" />
                  </a>
                </Link>
                <Link href="mailto:dev@erslly.xyz" passHref>
                  <a className="w-6 h-6 cursor-pointer">
                    <FiMail className="w-6 h-6" />
                  </a>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;

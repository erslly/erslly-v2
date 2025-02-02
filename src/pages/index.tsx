import { motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import RepoItem from "../components/RepoItem";
import { TechItem } from "../components/TechItem";
import {
    SiVisualstudiocode,
    SiRust,
    SiGit,
    SiDocker,
    SiNextdotjs as SiNextJs,
    SiNodedotjs as SiNodeJs,
    SiPostgresql,
    SiReact,
    SiRedis,
    SiStyledcomponents as SiStyledComponents,
    SiTailwindcss as SiTailwindCSS,
    SiTypescript,
    SiYarn,
    SiSwift,
    SiJavascript,
    SiPython,
    SiPrisma,
    SiMongodb,
    SiHtml5,
    SiCss3,
} from "react-icons/si";

interface AppProps {
    stats: Record<string, number>;
    repos: Record<string, any>[]; 
}

const Index = ({ stats, repos }: AppProps) => {
    const [showAll, setShowAll] = useState(false);
    const displayedRepos = showAll ? repos : repos?.slice(0, 4) || [];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="mt-24 w-full mb-32"
        >
            <h1 className="mt-36 font-bold text-4xl md:text-5xl mb-4">Hey, I'm Erslly 👋</h1>
            <p className="text-gray-800 dark:text-gray-300 leading-6 tracking-wide mb-12">
                Hello, my name is Erdem. I am a 16-year-old young software developer, preparing a good future for myself by working on various projects...
            </p>

            <h2 className="font-medium text-3xl mb-4">Technologies 💻</h2>
            <div className="w-full flex flex-wrap flex-row justify-center p-1 border border-slate-800 rounded-md bg-white/10 dark:bg-black/10 mb-12">
                <TechItem icon={SiTypescript} name="TypeScript" />
                <TechItem icon={SiVisualstudiocode} name="VSCode" />
                <TechItem icon={SiHtml5} name="HTML" />
                <TechItem icon={SiCss3} name="CSS" />
                <TechItem icon={SiReact} name="React.js" />
                <TechItem icon={SiNodeJs} name="Node.js" />
                <TechItem icon={SiJavascript} name="JavaScript" />
                <TechItem icon={SiNextJs} name="Next.js" />
                <TechItem icon={SiTailwindCSS} name="TailwindCSS" />
                <TechItem icon={SiPostgresql} name="Postgres" />
                <TechItem icon={SiMongodb} name="MongoDB" />
                <TechItem icon={SiGit} name="Git" />
                <TechItem icon={SiPython} name="Python" />
            </div>

            <h2 className="font-medium text-3xl mb-4">Projects 🛠️</h2>
            <p className="text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide mb-6">
                I enjoy creating open-source projects on {" "}
                <a
                    href="https://github.com/erslly"
                    rel="noreferrer"
                    className="font-semibold text-violet-500 hover:underline"
                >
                    GitHub
                </a>
                . My projects have earned me {" "}
                <span className="font-bold text-black dark:text-slate-200">{stats?.stars || 0}</span> stars and {" "}
                <span className="font-bold text-black dark:text-slate-200">{stats?.forks || 0}</span> forks. Below are some of my most popular repositories.
            </p>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {displayedRepos.map((repo) => (
                    <RepoItem
                        key={repo.name}
                        name={repo.name}
                        description={repo.description}
                        stars={repo.stargazers_count}
                        forks={repo.forks_count}
                        language={repo.language}
                    />
                ))}
            </div>
            <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center text-violet-500 hover:underline focus:outline-none"
            >
                {showAll ? "Show Less" : "Show More"} {showAll ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
            </button>
        </motion.div>
    );
};

export async function getStaticProps() {
    try {
        const statsRes = await fetch(`https://api.github-star-counter.workers.dev/user/erslly`);
        const reposRes = await fetch(`https://api.github.com/users/erslly/repos?type=owner&per_page=100`);

        if (!statsRes.ok || !reposRes.ok) {
            throw new Error("Failed to fetch data");
        }

        const stats = await statsRes.json();
        let repos = await reposRes.json();

        if (!Array.isArray(repos)) {
            repos = [];
        }

        const sortedRepos = repos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

        return {
            props: { stats, repos: sortedRepos },
            revalidate: 3600,
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: { stats: {}, repos: [] },
            revalidate: 3600,
        };
    }
}

export default Index;

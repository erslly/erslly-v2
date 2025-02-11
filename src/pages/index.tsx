import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    SiVercel,
    SiReactos,
    SiGithub,
} from "react-icons/si";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TechItem } from "../components/TechItem";
import RepoItem from "../components/RepoItem";

interface AppProps {
    stats: Record<string, number>;
    repos: Record<any, any>[];
}

const Index = ({ stats, repos }: AppProps) => {
    const [showAll, setShowAll] = useState(false);

    const topRepos = repos
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        .slice(0, showAll ? repos.length : 4);

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
                Hello, my name is Erdem. I am a 16-year-old young software developer, preparing a good future for myself by putting forward various projects...
            </p>

            <h2 className="font-medium text-3xl mb-4">What I Do 💭</h2>
            <p className="text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide mb-12">
                I have a great passion for all areas of technology, from software design and development to understanding how many moving parts of the internet work together, user experience (UX) design, front-end technologies, and programming.
            </p>

            <h2 className="font-medium text-3xl mb-4">Technologies 💻</h2>
            <div className="w-full flex flex-wrap flex-row justify-center p-1 border border-slate-800 rounded-md bg-white/10 dark:bg-black/10 mb-12">
                <TechItem icon={SiTypescript} name="TypeScript" />
                <TechItem icon={SiVisualstudiocode} name="VSCode" />
                <TechItem icon={SiVercel} name="Vercel" />
                <TechItem icon={SiHtml5} name="HTML" />
                <TechItem icon={SiGithub} name="GitHub" />
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
                In my free time, I enjoy creating open source projects on {" "}
                <a href="https://github.com/erslly" rel="noreferrer" className="font-semibold text-violet-500 hover:underline">
                    GitHub
                </a>
                , so I can learn from others and share what I know. My projects have received {" "}
                <span className="font-bold text-black dark:text-slate-200">{stats.stars}</span> stars and {" "}
                <span className="font-bold text-black dark:text-slate-200">{stats.forks}</span> forks on GitHub.
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 mb-6 gap-2">
                {topRepos.map((repo) => (
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

            <p
                onClick={() => setShowAll(!showAll)}
                className="flex items-center justify-center gap-2 text-violet-500 cursor-pointer hover:text-violet-600 transition-all"
            >
                {showAll ? "Show Less" : "Show More"} 
                {showAll ? <FaChevronUp /> : <FaChevronDown />}
            </p>
        </motion.div>
    );
};

export async function getStaticProps() {
    const stats = await fetch(`https://api.github-star-counter.workers.dev/user/erslly`).then(res => res.json());
    const repos = await fetch(`https://api.github.com/users/erslly/repos?type=owner&per_page=10`).then(res =>
        res.json()
    );

    return {
        props: { stats, repos },
        revalidate: 3600,
    };
}

export default Index;

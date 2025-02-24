import { useEffect, useState } from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { AiOutlineStar } from "react-icons/ai";
import { BiGitRepoForked } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

const Languages = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  CSS: "#264DE4",
  HTML: "#E34F26",
};

interface Repository {
  id: number;
  html_url: string;
  full_name: string;
  description: string;
  language: "JavaScript" | "TypeScript" | "Python" | "CSS" | "HTML";
  stargazers_count: number;
  forks_count: number;
}

interface RepoProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: "JavaScript" | "TypeScript" | "Python" | "CSS" | "HTML";
}

const RepoItem = ({ name, description, stars, forks, language }: RepoProps) => {
  return (
    <a href={`https://github.com/${name}`} rel="noreferrer" target="_blank">
      <div className="flex flex-col h-36 p-4 bg-white/10 dark:bg-black/10 rounded-md border border-slate-400 hover:border-slate-700 dark:border-slate-800 dark:hover:border-slate-600 transition-colors duration-75 cursor-pointer">
        <h1 className="font-semibold mb-1">{name}</h1>
        <p className="text-sm text-gray-800/70 dark:text-gray-100/70">{description}</p>
        <div className="mt-auto flex flex-row gap-4 text-gray-700 dark:text-gray-300 text-sm">
          <div className="flex flex-row items-center">
            <motion.div
              className="w-3 h-3 rounded-full mr-1"
              style={{ background: Languages[language], border: `solid 3px ${Languages[language]}` }}
            />
            {language}
          </div>

          <div className="flex flex-row items-center justify-center">
            <AiOutlineStar className="mr-1 w-4 h-4" /> {stars}
          </div>
          <div className="flex flex-row items-center justify-center">
            <BiGitRepoForked className="mr-1 w-4 h-4" /> {forks}
          </div>
        </div>
      </div>
    </a>
  );
};

export default function Repos() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    fetch("https://api.github.com/users/erslly/repos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.slice(0, 6)); 
        } else {
          setError("Failed to load repositories");
        }
      })
      .catch((err) => {
        setError(`Error fetching data: ${err.message}`);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 pt-40">
      <div className="mb-8 w-full text-left">
        <h2 className="font-semibold text-3xl mb-2">Repositories 📦</h2>
        <p className="font-light text-sm text-gray-600 dark:text-gray-400">
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center space-x-2 mb-8">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full"> 
          {repos.length === 0 ? (
            <div>No repositories found</div>
          ) : (
            repos.map((repo) => (
              <RepoItem
                key={repo.id}
                name={repo.full_name}
                description={repo.description || "No description available."}
                stars={repo.stargazers_count}
                forks={repo.forks_count}
                language={repo.language as "JavaScript" | "TypeScript" | "Python" | "CSS" | "HTML"}
              />
            ))
          )}
        </div>
      )}

      <div className="mt-8 w-full flex justify-end">
        <a
          href="https://github.com/erslly"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
        >
          <FaGithub className="w-6 h-6" />
          <span>View My Repositories</span>
        </a>
      </div>
    </div>
  );
}

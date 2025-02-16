import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <motion.div
            key="talk"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="mt-36 mb-96 w-full flex flex-col items-center text-center"
        >
            <h1 className="text-black dark:text-white font-bold text-3xl mb-3 mt-40">Hmm... Thinking... 🤔</h1>
            <p className="text-black dark:text-gray-200 mb-6">It appears that what you're looking for isn't here.</p>

            <div className="relative inline-block">
                <h2
                    className="text-[120px] font-extrabold uppercase"
                    style={{
                        backgroundImage: "url('https://p.erslly.xyz/123213213.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    404
                </h2>
            </div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-full shadow-md 
                hover:bg-blue-700 dark:hover:bg-blue-600 transition-all mb-10"
            >
                Go Back <span>→</span>
            </motion.button>    
        </motion.div>
    );
};

export default NotFound;

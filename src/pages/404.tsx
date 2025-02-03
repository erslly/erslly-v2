import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <motion.div
            key="talk"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="mt-36 mb-80 w-full text-center"
        >
            <h1 className="text-black dark:text-white font-bold text-3xl mb-3 mt-8">Hmm... Thinking... 🤔</h1>
            <p className="text-black dark:text-gray-200 mb-6">It appears that what you're looking for isn't here.</p>

            {/* 404 Anime Background */}
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

            {/* Anime kız GIF'i */}
            <img
                src="https://media.tenor.com/p-tsA5hdz2cAAAAi/crying-cute-anime.gif" 
                alt="Sad Anime Girl"
                className="mx-auto mb-6"
                style={{ width: "200px", height: "auto" }}
            />
        </motion.div>
    );
};

export default NotFound;

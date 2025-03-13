// @ts-ignore
import { useLanyard } from "use-lanyard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Spotify = () => {
    const { data: user } = useLanyard("815668704435896321");
    const [elapsedTime, setElapsedTime] = useState(0);
    const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);

    useEffect(() => {
        if (user?.spotify) {
            const startTime = user.spotify.timestamps.start;
            const totalDuration = user.spotify.timestamps.end - startTime;

            if (currentTrackId !== user.spotify.track_id) {
                setElapsedTime(0);
                setCurrentTrackId(user.spotify.track_id);
            }

            const updateElapsedTime = () => {
                const newElapsedTime = Date.now() - startTime;
                if (newElapsedTime >= totalDuration) {
                    setElapsedTime(totalDuration); 
                } else {
                    setElapsedTime(newElapsedTime);
                }
            };

            const timer = setInterval(updateElapsedTime, 1000);
            return () => clearInterval(timer);
        }
    }, [user?.spotify, currentTrackId]);

    if (!user || !user.spotify) {
        return null;
    }

    const totalDuration = user.spotify.timestamps.end - user.spotify.timestamps.start;
    const progress = Math.min((elapsedTime / totalDuration) * 100, 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: -100 }}
            transition={{ duration: 0.5, easing: [0, 0.5, 0.28, 0.99] }}
            className="fixed left-6 -bottom-20 w-[20rem] h-[7rem] hidden lg:flex flex-col items-start justify-start"
        >
            <h1 className="text-black dark:text-gray-100 font-semibold text-base mb-2 flex items-center justify-center">
                Listening to Spotify
                <span className="ml-2 w-2 h-2">
                    <span className="absolute w-2 h-2 bg-red-600 rounded-full animate-ping" />
                    <span className="absolute w-2 h-2 bg-red-600 rounded-full" />
                </span>
            </h1>

            <div className="w-full h-[6rem] flex flex-row items-center justify-start">
                <img
                    src={user.spotify.album_art_url ?? ""}
                    className="w-[4.5rem] h-[4.5rem] rounded-md mr-4 pointer-events-none"
                    alt={user.spotify.album}
                />
                <div className="w-56 h-full flex flex-col items-start justify-center">
                    <a
                        href={`https://open.spotify.com/track/${user.spotify.track_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full font-medium text-gray-900 dark:text-[#e1eafd] hover:underline truncate"
                    >
                        {user.spotify.song}
                    </a>
                    <p className="w-full text-gray-600 dark:text-[#cad2e0] font-normal text-sm truncate">
                        {user.spotify.artist}
                    </p>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 h-1.5 rounded-full mt-2 relative">
                        <div
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-500 ease-in-out"
                            style={{
                                width: `${progress}%`,
                                transition: "width 1s ease-in-out",
                            }}
                        />
                        <div
                            className="absolute top-0 left-0 h-1.5 w-1.5 bg-white dark:bg-gray-100 rounded-full shadow-md"
                            style={{
                                transform: `translateX(${progress}%)`,
                                transition: "transform 1s ease-in-out",
                            }}
                        />
                    </div>
                    <p className="text-gray-600 dark:text-[#cad2e0] text-xs mt-1">
                        {Math.floor(elapsedTime / 60000)}:{(Math.floor((elapsedTime / 1000) % 60)).toString().padStart(2, "0")} / 
                        {Math.floor(totalDuration / 60000)}:{(Math.floor((totalDuration / 1000) % 60)).toString().padStart(2, "0")}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Spotify;

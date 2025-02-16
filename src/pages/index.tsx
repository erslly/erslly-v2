import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaEnvelope, FaSpotify } from "react-icons/fa";
import React, { useEffect, useState } from 'react';

interface LanyardData {
    data: {
        discord_status: string;
        spotify?: {
            track_id: string;
            song: string;
            artist: string;
            album_art_url: string;
        };
    };
}

const Index = () => {
    const [status, setStatus] = useState<string>('bg-gray-500');
    const [loading, setLoading] = useState<boolean>(true);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [spotifyTrack, setSpotifyTrack] = useState<string>(''); 
    const [spotifyArtist, setSpotifyArtist] = useState<string>(''); 
    const [spotifyCover, setSpotifyCover] = useState<string>(''); 
    const [spotifyTrackId, setSpotifyTrackId] = useState<string>(''); 

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await fetch('https://api.lanyard.rest/v1/users/815668704435896321'); // USER_ID'yi gerçek ID ile değiştirin
                const data: LanyardData = await response.json();

                const userStatus = data.data.discord_status;

                if (userStatus === 'online') {
                    setStatus('bg-green-500');
                } else if (userStatus === 'idle') {
                    setStatus('bg-yellow-500');
                } else if (userStatus === 'dnd') {
                    setStatus('bg-red-500');
                } else {
                    setStatus('bg-gray-500');
                }

                // Spotify bilgilerini kontrol et
                if (data.data.spotify) {
                    setSpotifyTrack(data.data.spotify.song);
                    setSpotifyArtist(data.data.spotify.artist);
                    setSpotifyCover(data.data.spotify.album_art_url);
                    setSpotifyTrackId(data.data.spotify.track_id);
                } else {
                    setSpotifyTrack('');
                    setSpotifyArtist('');
                    setSpotifyCover('');
                    setSpotifyTrackId('');
                }
            } catch (error) {
                console.error("Lanyard API hatası:", error);
                setStatus('bg-gray-500');
            } finally {
                setLoading(false);
            }
        };

        const updateDateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };
            setCurrentDate(now.toLocaleString('en-US', options));
        };

        setInterval(updateDateTime, 1000);

        fetchUserStatus();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="h-screen flex flex-col justify-start items-start text-white overflow-hidden px-8 py-60"
        >
            <div className="flex flex-col items-start text-left">
                <h1 className="font-bold text-6xl md:text-6xl mb-2">erslly!</h1>
                <p className="text-gray-400 text-lg font-light mb-4">
                    Hey! I'm <span className="font-semibold">erslly, </span>a
                    <span className="font-semibold text-blue-500"> 16 year old developer </span> from
                    <span className="font-semibold text-red-500"> Turkey</span>.
                </p>

                <div className="flex space-x-4 mt-2 text-2xl">
                    <a href="https://erslly.xyz/github" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="hover:text-gray-400 cursor-pointer" />
                    </a>
                    <a href="https://erslly.xyz/discord" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="hover:text-gray-400 cursor-pointer" />
                    </a>
                    <a href="https://open.spotify.com/user/31y5bespqsim2zsgq47lwnmgsw64" target="_blank" rel="noopener noreferrer">
                        <FaSpotify className="hover:text-gray-400 cursor-pointer" />
                    </a>
                    <a href="mailto:dev@erslly.xyz">
                        <FaEnvelope className="hover:text-gray-400 cursor-pointer" />
                    </a>
                </div>
            </div>

            <div className="mt-4 flex flex-col items-start space-y-2 text-gray-300 text-sm">
                <span>{currentDate}</span>
                <div className="w-full border-t border-gray-600 my-2"></div>
            </div>

            <div className="mt-4 relative flex items-center">
                <div className="relative">
                    <img
                        src="https://p.erslly.xyz/ersllydev.jpg"
                        alt="Avatar"
                        className="w-24 h-24 rounded-full"
                    />
                    {loading ? (
                        <span className="absolute bottom-0 right-0 w-5 h-5 bg-gray-300 rounded-full border-2 border-gray-900"></span>
                    ) : (
                        <span className={`absolute bottom-0 right-0 w-5 h-5 ${status} rounded-full border-2 border-gray-900`}></span>
                    )}
                </div>
                <div className="ml-4">
                    <p className="text-2xl font-bold">Erdem</p>
                    <p className="text-sm font-light">Erslly</p>
                </div>
            </div>

            {spotifyTrack && spotifyCover ? (
                <div className="mt-10 flex items-center space-x-6">
                    <img src={spotifyCover} alt="Spotify Cover" className="w-24 h-30 rounded-lg" />
                    <div className="flex flex-col">
                        <a
                            href={`https://open.spotify.com/track/${spotifyTrackId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-semibold text-lg hover:underline"
                        >
                            {spotifyTrack}
                        </a>
                        <a
                            href={`https://open.spotify.com/search/${encodeURIComponent(spotifyArtist)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 text-sm hover:underline"
                        >
                            {spotifyArtist}
                        </a>
                        <span className="text-gray-500 text-xs">🎵 Now Playing on Spotify</span>
                    </div>
                </div>
            ) : (
                <div className="mt-4 flex items-center space-x-4">
                    <FaSpotify className="text-gray-400 text-2xl" />
                    <div className="flex flex-col">
                        <p className="text-sm font-light text-gray-400">Not Listening to Anything</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Index;

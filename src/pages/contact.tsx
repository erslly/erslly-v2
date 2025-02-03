import React from "react";
import MessageComponent from "../components/talk/MessageComponent";
import ContactLink from "../components/talk/ContactLink";
import { SiTwitter, SiDiscord, SiX, SiInstagram } from "react-icons/si";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import TimeStatus from "../components/talk/TimeStatus";

const Talk = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="mt-36 w-full"
        >
            <h1 className="text-black dark:text-white font-bold text-3xl mb-3 mt-8">Let's chat 💬</h1>
            <p className="text-gray-800 dark:text-gray-200 mb-6">
                Have an inquiry, or want to connect? Feel free to leave a message below, or get in touch via Discord,
                X, or email.
            </p>

            <TimeStatus />

            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 mb-20">
                <MessageComponent />

                <div className="row-start-1 md:row-auto">
                    <ContactLink
                        name="@erslly"
                        icon={<SiDiscord className="w-6 h-6 text-[#5865F2]" />}
                        link="https://erslly.xyz/discord"
                        borderColor="hover:border-[#5865F2]/50"
                    />

                    <ContactLink
                        name="@ersllydev"
                        icon={<SiX className="w-6 h-6 text-[#000000]" />}
                        link="https://erslly.xyz/x"
                        borderColor="hover:border-[#000000]/50"
                    />

                    
                    <ContactLink
                    name="@erdemozbebek_"
                    icon={<SiInstagram className="w-6 h-6 text-[#C13584]" />}
                    link="https://erslly.xyz/instagram"
                    borderColor="hover:border-[#C13584]/50"
                />
                


                    <ContactLink
                        name="dev@erslly.xyz"
                        icon={<FiMail className="w-6 h-6 text-gray-400" />}
                        link="mailto:dev@erslly.xyz"
                        borderColor="hover:border-gray-400/50"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Talk;

// @ts-ignore
import { useLanyard } from "use-lanyard";

const date = new Date();

const statusStyles: Record<string, { color: string; text: string }> = {
    online: { color: "bg-green-500 shadow-green-500/50", text: "" },
    idle: { color: "bg-yellow-500 shadow-yellow-500/50", text: "" },
    dnd: { color: "bg-red-500 shadow-red-500/50", text: "" },
    offline: { color: "bg-gray-500 shadow-gray-500/50", text: "" },
};

const Footer = () => {
    const { data: user } = useLanyard("815668704435896321");
    const status = user?.discord_status || "offline"; 
    const { color, text } = statusStyles[status];

    return (
        <div className="w-full flex flex-col items-start border-t-2 border-slate-800 px-4 py-8 dark:border-opacity-50 mb-20">
            <div className="flex items-center space-x-3">
                <h1 className="text-black dark:text-white/50 text-2xl font-semibold">Erslly</h1>
                
                <div className="flex items-center space-x-1">
                    <span 
                        className={`w-4 h-4 rounded-full ${color} shadow-md animate-pulse`}
                        title={text}
                    />
                    <span className="text-sm font-medium text-black/60 dark:text-white/40">{text}</span>
                </div>
            </div>
            <h2 className="text-black/60 dark:text-white/30 text-base">
                Front-end Developer • {date.getFullYear()}
            </h2>
        </div>
    );
};

export default Footer;

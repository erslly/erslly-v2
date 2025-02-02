// @ts-ignore
import { useLanyard } from "use-lanyard";

const date = new Date();

const statusColors: Record<string, string> = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
};

const Footer = () => {
    const { data: user } = useLanyard("815668704435896321");
    const status = user?.discord_status || "offline"; 

    return (
        <div className="w-full flex flex-col items-start border-t-2 border-slate-800 px-4 py-8 dark:border-opacity-50 mb-20">
            <div className="flex items-center space-x-2">
                <h1 className="text-black dark:text-white/50 text-2xl font-semibold">Erslly</h1>
                <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} title={status} />
            </div>
            <h2 className="text-black/60 dark:text-white/30 text-base">
                Front-end Developer • {date.getFullYear()}
            </h2>
        </div>
    );
};

export default Footer;

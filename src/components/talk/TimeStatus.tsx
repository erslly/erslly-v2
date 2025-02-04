import { useEffect, useState } from "react";

const TimeStatus = () => {
    const [time, setTime] = useState<string>("00:00:00");
    const [awake, setAwake] = useState<boolean>(true);

    useEffect(() => {
        const updateTime = () => {
            const current = new Date();
            
            const formattedTime = new Intl.DateTimeFormat("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "Europe/Istanbul" 
            }).format(current);

            setTime(formattedTime);

            const hours = current.getHours();
            setAwake(hours >= 7);
        };

        const interval = setInterval(updateTime, 1000); 
        updateTime(); 

        return () => clearInterval(interval);
    }, []);

    return (
        <p className="text-black/50 dark:text-white/50 text-sm mb-10">
            Şu an saat <span className="font-semibold text-black/60 dark:text-white/60">{time}</span> olduğu için
            büyük ihtimalle{" "}
            <span className="font-semibold text-black/60 dark:text-white/60">{awake ? "uyanığım" : "uyuyorum"}</span>.
            Yakında döneceğim.{" "}
        </p>
    );
};

export default TimeStatus;

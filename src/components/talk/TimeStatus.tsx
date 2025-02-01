import { useEffect, useState } from "react";

const TimeStatus = () => {
    const [time, setTime] = useState<string>("00:00:00 p.m.");
    const [awake, setAwake] = useState<boolean>(true);

    function updateTime() {
        let current = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
        setTime(`${current.slice(-11, -6)}${current.slice(-3, -1)}.Ö.M.`); // Updated for Turkish time format
        setTimeout(updateTime, 60 * 1000);

        if (new Date().getHours() < 7) setAwake(false);
    }

    useEffect(() => {
        updateTime();
    }, []);

    return (
        <p className="text-black/50 dark:text-white/50 text-sm mb-10">
            Şu an saat <span className="font-semibold text-black/60 dark:text-white/60">{time}</span> olduğu için
            büyük ihtimalle{" "}
            <span className="font-semibold text-black/60 dark:text-white/60">{awake ? "uyanığım" : "uyuyorum"}</span>.
            Yakında döneceğim.
        </p>
    );
};

export default TimeStatus;

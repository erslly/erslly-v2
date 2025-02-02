import { useEffect, useState } from "react";

const TimeStatus = () => {
    const [time, setTime] = useState<string>("00:00:00");
    const [awake, setAwake] = useState<boolean>(true);

    function updateTime() {
        const current = new Date();
        const hours = current.getHours();
        const minutes = current.getMinutes();
        const seconds = current.getSeconds();
        
        // 12 saatlik format için, AM/PM hesaplama
        const isAM = hours < 12;
        const formattedTime = `${String(hours % 12 || 12).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${isAM ? "AM" : "PM"}`;

        setTime(formattedTime);

        if (hours < 7) setAwake(false); // 07:00'dan önce uyandığımı varsayıyoruz
        setTimeout(updateTime, 60 * 1000); // Her dakika güncelle
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

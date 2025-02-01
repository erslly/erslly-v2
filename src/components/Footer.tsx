const date = new Date();

const Footer = () => {
    return (
        <div className="w-full flex flex-col items-start border-t-2 border-slate-800 px-4 py-8 dark:border-opacity-50 mb-20">
            <h1 className="text-black dark:text-white/50 text-2xl font-semibold">Erslly</h1>
            <h2 className="text-black/60 dark:text-white/30 text-base">Front-end Developer • {date.getFullYear()}</h2>
        </div>
    );
};

export default Footer;

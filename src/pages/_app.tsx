import "../css/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Nav from "../components/Nav";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-tippy/dist/tippy.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (typeof window !== "undefined") {
            void new Audio("").play().catch(() => null);
        }
    }, [router.pathname]);

    useEffect(() => {
        const handleStart = (url: string) => {
            setDirection(url > router.pathname ? 1 : -1);
            NProgress.start();
        };
        const handleStop = () => NProgress.done();

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleStop);
        router.events.on("routeChangeError", handleStop);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleStop);
            router.events.off("routeChangeError", handleStop);
        };
    }, [router]);

    const pageVariants = {
        initial: (direction: number) => ({
            x: direction * 100,
            opacity: 0,
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] },
        },
        exit: (direction: number) => ({
            x: direction * -100,
            opacity: 0,
            transition: { duration: 0.3, ease: [0.6, 0.05, -0.01, 0.9] },
        }),
    };

    const itemVariants = {
        initial: {
            y: -20,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Erslly</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="keywords" content="erslly, ersllydev, erslly.xyz, ersllyweb, web developer, github, typescript" />
                <meta name="description" content="Erslly - Front-end developer" />
                <meta name="author" content="Erslly" />
                <link rel="icon" href="/ersllydev.jpg" />
            </Head>

            <div className="text-black dark:text-white flex flex-row justify-center w-full h-full dark min-h-screen">
                <Nav />
                <div className="w-[80%] md:w-[45rem]">
                    <AnimatePresence exitBeforeEnter custom={direction}>
                        <motion.div
                            key={router.pathname}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            custom={direction}
                        >
                            <motion.div
                                variants={itemVariants}
                                initial="initial"
                                animate="animate"
                            >
                                <Component {...pageProps} />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute top-10 right-20 hidden md:block">
                <a
                    href="https://github.com/erslly/erslly-v2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-500 transition-all duration-300 flex items-center space-x-1 group"
                >
                    <span className="font-semibold text-sm">Get this template for free</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-lg">➔</span>
                </a>
            </div>
        </>
    );
}

export default MyApp;

import "../css/globals.css";
import type { AppProps } from "next/app";
import Spotify from "../components/Spotify";
import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "react-tippy/dist/tippy.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            void new Audio("/pop.mp3").play().catch(() => null);
        }
    }, [router.pathname]);

    useEffect(() => {
        const handleStart = () => NProgress.start();
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
                <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.pathname} />
            </AnimatePresence>
                    <Footer />
                </div>
                <Spotify />
            </div>
        </>
    );
}

export default MyApp;

import "../css/globals.css";
import type { AppProps } from "next/app";
import Spotify from "../components/Spotify";
import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
import { Router } from "next/router";

import "react-tippy/dist/tippy.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, router }: AppProps) {
    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        void new Audio("/pop.mp3").play().catch(() => null);
    }, [router.pathname]);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>ersllydev</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="keywords" content="erslly, ersllydev, erslly.xyz, ersllyweb, web developer, github, typescript" />
                <meta name="description" content="Erslly - Front-end developer" />
                <meta name="author" content="Erslly" />
                <link rel="icon" href="/ersllydev.jpg" />

                {/* Twitter Card Meta Tags */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://erslly.xyz" />
                <meta property="twitter:title" content="Erslly - Front-end Developer" />
                <meta property="twitter:description" content="I'm a front-end developer passionate about building interactive web applications." />
                <meta property="twitter:image" content="https://c4.wallpaperflare.com/wallpaper/722/533/218/anime-girls-mahiru-shiina-yellow-eyes-blonde-nature-hd-wallpaper-preview.jpg" />
            </Head>

            <div className="text-black dark:text-white flex flex-row justify-center w-full h-full bg-gradient-to-bl from-white to-[#fff] dark:from-black dark:to-[#0d131f] min-h-screen">
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

import "../css/globals.css";
import type { AppProps } from "next/app";
import Spotify from "../components/Spotify";
import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "react-tippy/dist/tippy.css";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            NProgress.start();
        };
        const handleRouteComplete = () => {
            NProgress.done();
        };

        router.events.on("routeChangeStart", handleRouteChange);
        router.events.on("routeChangeComplete", handleRouteComplete);
        router.events.on("routeChangeError", handleRouteComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
            router.events.off("routeChangeComplete", handleRouteComplete);
            router.events.off("routeChangeError", handleRouteComplete);
        };
    }, [router.events]);

    useEffect(() => {
        new Audio("/pop.mp3").play().catch(() => null);

        const snowContainer = document.createElement("div");
        snowContainer.style.position = "fixed";
        snowContainer.style.top = "0";
        snowContainer.style.left = "0";
        snowContainer.style.width = "100%";
        snowContainer.style.height = "100%";
        snowContainer.style.pointerEvents = "none";
        snowContainer.style.zIndex = "9999";
        document.body.appendChild(snowContainer);

        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes fall {
                0% { transform: translateY(-10vh); opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
            .snowflake {
                position: absolute;
                user-select: none;
                pointer-events: none;
                color: white;
            }
        `;
        document.head.appendChild(style);

        for (let i = 0; i < 25; i++) {
            const snowflake = document.createElement("div");
            snowflake.className = "snowflake";
            snowflake.innerHTML = "❄";
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.top = `-${Math.random() * 10}vh`;
            snowflake.style.opacity = (Math.random() * 0.8 + 0.2).toString();
            snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
            snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
            snowflake.style.animationDelay = `${Math.random() * 2}s`;

            snowContainer.appendChild(snowflake);
        }

        return () => {
            document.body.removeChild(snowContainer);
            document.head.removeChild(style);
        };
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

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://erslly.xyz" />
                <meta property="twitter:title" content="Erslly - Front-end Developer" />
                <meta property="twitter:description" content="I'm a front-end developer passionate about building interactive web applications." />
                <meta property="twitter:image" content="https://erslly.xyz/assets/og-image.jpg" />
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

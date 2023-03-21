import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToTop from "../components/ToTop";
import PreLoader from "../components/PreLoader";

const LayoutMain = (props) => {
    const [pageLoaded, setPageLoaded] = useState(false);
    const navbarRef = useRef(null);
    const totopRef = useRef(null);
    const preloadpRef = useRef(null);
    useEffect(() => {
        setPageLoaded(true);
        console.log(pageLoaded);
        if (pageLoaded) {
            const preloader = preloadpRef.current;
            const navbar = navbarRef.current;
            const totop = totopRef.current;
            const timer = setTimeout(
                () => preloader.classList.add("fadeOut"),
                500
            );

            window.addEventListener("scroll", () => {
                if (window.pageYOffset > 50) {
                    navbar.classList.add("main-navigation-bg");
                } else {
                    navbar.classList.remove("main-navigation-bg");
                }

                if (window.pageYOffset > 400) {
                    totop.classList.add("show");
                } else {
                    totop.classList.remove("show");
                }
            });
            return () => clearTimeout(timer);
        }
    }, [pageLoaded]);

    return (
        <>
            <PreLoader nr={preloadpRef} />

            <Header nr={navbarRef} />

            {props.children}

            <Footer />
            <ToTop nr={totopRef} />
        </>
    );
};

export default LayoutMain;

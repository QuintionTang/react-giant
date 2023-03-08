import Link from "next/link";
import React from "react";
import Image from "next/image";
import logoPic from "../../public/assets/images/logo-dark.png";
import cn from "classnames";
const Header = () => {
    return (
        <nav className={cn("navbar navbar-fixed-top navbar-bg-switch")}>
            <div className={cn("container")}>
                <div className={cn("navbar-header fadeIn-element")}>
                    <div className={cn("logo")}>
                        <Link href="/" className={cn("navbar-brand logo")}>
                            <Image
                                src={logoPic}
                                alt="Logo"
                                className={cn("logo-light")}
                            />
                            <Image
                                src={logoPic}
                                alt="Logo"
                                className={cn("logo-dark")}
                            />
                        </Link>
                    </div>
                </div>
                <div className={cn("main-navigation dark fadeIn-element")}>
                    <div className={cn("navbar-header")}>
                        <button
                            aria-expanded="false"
                            className={cn("navbar-toggle dark collapsed")}
                            data-target="#navbar-collapse"
                            data-toggle="collapse"
                            type="button"
                        >
                            <span className={cn("sr-only")}>
                                Toggle navigation
                            </span>
                            <span className={cn("icon-bar")}></span>
                            <span className={cn("icon-bar")}></span>
                            <span className={cn("icon-bar")}></span>
                        </button>
                    </div>
                    <div
                        className={cn("collapse navbar-collapse")}
                        id="navbar-collapse"
                    >
                        <ul className={cn("nav navbar-nav navbar-right")}>
                            <li className={cn("active")}>
                                <a className={cn("page-scroll")} href="#home">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className={cn("page-scroll")} href="#about">
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    className={cn("page-scroll")}
                                    href="#services"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a className={cn("page-scroll")} href="#works">
                                    Works
                                </a>
                            </li>
                            <li>
                                <a
                                    className={cn("page-scroll")}
                                    href="#timeline"
                                >
                                    Story
                                </a>
                            </li>
                            <li>
                                <a
                                    className={cn("page-scroll")}
                                    href="#contact"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;

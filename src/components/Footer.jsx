import Link from "next/link";
import React from "react";
import Image from "next/image";
import footerLogo from "../../public/assets/images/logo-footer.png";
import cn from "classnames";
const Footer = () => {
    return (
        <section id="footer">
            <div className={cn("container-fluid sections")}>
                <div className={cn("row footer-credits")}>
                    <div className={cn("footer-credits-logo")}>
                        <Link href="/">
                            <Image src={footerLogo} alt="Logo Footer" />
                        </Link>
                    </div>
                    <div className={cn("social-icons-wrapper")}>
                        <ul className={cn("social-icons")}>
                            <li className={cn("social-icon")}>
                                <a
                                    className={cn("ion-social-twitter")}
                                    href="#"
                                ></a>
                            </li>
                            <li className={cn("social-icon")}>
                                <a
                                    className={cn("ion-social-facebook")}
                                    href="#"
                                ></a>
                            </li>
                            <li className={cn("social-icon")}>
                                <a
                                    className={cn("ion-social-googleplus")}
                                    href="#"
                                ></a>
                            </li>
                            <li className={cn("social-icon")}>
                                <a
                                    className={cn("ion-social-youtube")}
                                    href="#"
                                ></a>
                            </li>
                            <li className={cn("social-icon")}>
                                <a
                                    className={cn("ion-social-linkedin")}
                                    href="#"
                                ></a>
                            </li>
                            <li className={cn("social-icon")}>
                                <a
                                    className={cn("ion-social-instagram")}
                                    href="#"
                                ></a>
                            </li>
                            <li className={cn("social-icon")}>
                                <a
                                    className={cn("ion-social-pinterest")}
                                    href="#"
                                ></a>
                            </li>
                            <li className={cn("social-icon")}>
                                <a
                                    className={cn("ion-social-dribbble")}
                                    href="#"
                                ></a>
                            </li>
                        </ul>
                    </div>
                    <div id="subscribe-wrapper">
                        <h2 className={cn("section-heading newsletter")}>
                            Newsletter sign up
                        </h2>
                        <div id="newsletter">
                            <div className={cn("newsletter")}>
                                <form
                                    action="subscribe.php"
                                    id="subscribe"
                                    method="post"
                                    name="subscribe"
                                >
                                    <input
                                        className={cn(
                                            "subscribe-requiredField subscribe-email"
                                        )}
                                        id="subscribe-email"
                                        name="subscribe-email"
                                        placeholder="Email"
                                        type="text"
                                    />
                                    <div
                                        className={cn("subscribe-error")}
                                    ></div>
                                    <button
                                        className={cn("c-btn fullwidth")}
                                        id="submit-2"
                                        type="submit"
                                    >
                                        <span>Subscribe</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={cn("footer-credits-copyright-wrapper")}>
                        <div className={cn("footer-credits-copyright")}>
                            <a href="#">
                                Crayon.dev &copy;2023 All Rights Reserved.
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;

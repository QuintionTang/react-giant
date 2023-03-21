import Link from "next/link";
import axios from "axios";
import React from "react";
import Image from "next/image";
import footerLogo from "../../public/assets/images/logo-footer.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
const Footer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [apiOutput, setApiOutput] = useState("");
    const [apiError, setApiError] = useState("");

    const handleChange = (event) => {
        setApiError("");
        setApiOutput("");
    };

    async function onSubmitForm(values) {
        setApiError("");
        setLoading(true);
        setApiOutput("");
        let config = {
            method: "post",
            url: `/api/subscribe`,
            headers: {
                "Content-Type": "application/json",
            },
            data: values,
        };

        try {
            const response = await axios(config);

            if (response.status === 201) {
                setApiOutput(`Your mail submitted!`);
                reset();
            } else {
                console.log(response);
            }
        } catch (error) {
            setApiError(error.response.data);
            reset();
        }
        setLoading(false);
    }
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
                                    onSubmit={handleSubmit(onSubmitForm)}
                                    id="subscribe"
                                    method="post"
                                    name="subscribe"
                                >
                                    <input
                                        className={cn(
                                            "subscribe-requiredField subscribe-email"
                                        )}
                                        id="firstname"
                                        name="firstname"
                                        {...register("firstname", {
                                            onChange: handleChange,
                                            required: {
                                                value: true,
                                                message:
                                                    "You most enter firstname",
                                            },
                                        })}
                                        placeholder="Your First Name*"
                                        type="text"
                                    />
                                    <input
                                        className={cn(
                                            "subscribe-requiredField subscribe-email"
                                        )}
                                        id="email"
                                        name="email"
                                        placeholder="Your email*"
                                        type="text"
                                        {...register("email", {
                                            onChange: handleChange,
                                            required: {
                                                value: true,
                                                message:
                                                    "You must enter email address",
                                            },
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message:
                                                    "invalid email address",
                                            },
                                        })}
                                    />
                                    {apiOutput && (
                                        <div
                                            className={cn("subscribe-success")}
                                        >
                                            Thank you {"for"} subscribing.
                                        </div>
                                    )}

                                    <div className={cn("subscribe-error")}>
                                        {errors?.email?.message}
                                        {errors?.name?.message}
                                        {apiError?.message}
                                    </div>
                                    <button
                                        className={cn("c-btn fullwidth")}
                                        id="submit-2"
                                        type="submit"
                                    >
                                        {loading ? (
                                            <span>Loading…</span>
                                        ) : (
                                            <span>Subscribe</span>
                                        )}
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

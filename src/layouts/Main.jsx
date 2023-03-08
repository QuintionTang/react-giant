import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ToTop from "../components/ToTop";
import PreLoader from "../components/PreLoader";

const LayoutMain = (props) => {
    return (
        <>
            <PreLoader />

            <Header />

            {props.children}

            <Footer />
            <ToTop />
        </>
    );
};

export default LayoutMain;

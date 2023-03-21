import { scrollToTop } from "../libs/helper.js";
import React from "react";
import cn from "classnames";
const ToTop = ({ nr }) => {
    return (
        <a ref={nr} className={cn("to-top-arrow")} onClick={scrollToTop}>
            <span className={cn("ion-ios-arrow-up")}></span>
        </a>
    );
};

export default ToTop;

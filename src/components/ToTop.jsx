import { scrollToTop } from "../libs/helper.js";
import React from "react";
import cn from "classnames";
const ToTop = () => {
    return (
        <a className={cn("page-scroll")} onClick={scrollToTop}>
            <div className={cn("to-top-arrow")}>
                <span className={cn("ion-ios-arrow-up")}></span>
            </div>
        </a>
    );
};

export default ToTop;

import React from "react";
import cn from "classnames";

const PreLoader = () => {
    return (
        <>
            <div className={cn("preloader-bg")}></div>
            <div id="preloader">
                <div id="preloader-status">
                    <div className={cn("preloader-position loader")}>
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PreLoader;

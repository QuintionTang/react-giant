import { Html, Head, Main, NextScript } from "next/document";

import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />

                <Script
                    strategy="beforeInteractive"
                    id="vendor"
                    src="/assets/scripts/vendor.min.js"
                ></Script>
                <Script
                    strategy="beforeInteractive"
                    id="master"
                    src="/assets/scripts/master.min.js"
                ></Script>
            </body>
        </Html>
    );
}

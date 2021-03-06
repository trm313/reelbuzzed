import { useEffect } from "react";
import Router from "next/router";
import * as gtag from "../lib/gtag";

import "../styles/fonts.css";
import "../styles/index.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return <Component {...pageProps} />;
}

import Head from "next/head";
import styles from "./layout.module.css";
import Link from "next/link";

import Footer from "./footer";

const name = "Reel Buzzed";
export const siteTitle = "Reel Buzzed | Movie Drinking Games";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Movie drinking games to get your buzz on"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a className="text-gray-800">
            <h1>{name}</h1>
          </a>
        </Link>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a className="shadow border border-gray-200 rounded-full py-2 px-4 hover:bg-gray-200">
              ← Back to home
            </a>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import MovieItem from "../components/movieItem";
import Layout, { siteTitle } from "../components/layout";
import MovieSearch from "../components/movieSearch";

import utilStyles from "../styles/utils.module.css";

import { fetchMovieRecords } from "../lib/movies";

export async function getStaticProps() {
  const allMovieData = await fetchMovieRecords();
  return {
    props: {
      allMovieData,
    },
  };
}

export default function Home({ allMovieData = [] }) {
  const [visibleMovieList, setVisibleMovieList] = useState(allMovieData);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <MovieSearch
          allMovies={allMovieData}
          setVisibleMovieList={setVisibleMovieList}
        />
        <h2 className={utilStyles.headingLg}>All Movies</h2>
        <ul className={utilStyles.list}>
          {visibleMovieList.map((movie) => (
            <MovieItem movie={movie} key={movie.id} />
          ))}
          {visibleMovieList.length === 0 && (
            <div className="flex flex-col items-center text-center">
              <i className="ri-ghost-line text-3xl text-gray-600" />
              <p className="text-sm text-gray-600">
                Sorry! Looks like we don't have a game for that movie yet..
                <br />
                We'll be adding a request form shortly!
              </p>
            </div>
          )}
        </ul>
      </section>
    </Layout>
  );
}

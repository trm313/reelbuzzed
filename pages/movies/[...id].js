import Head from "next/head";
import Layout from "../../components/layout";
import MovieDetails from "../../components/movieDetails";

import { getAllMovieIds, getMovieRecord } from "../../lib/movies";

export async function getStaticPaths() {
  const paths = await getAllMovieIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movieData = await getMovieRecord(params.id[2]);

  return {
    props: {
      movieData,
    },
  };
}

export default function Movie({ movieData }) {
  if (!movieData) {
    return (
      <Layout>
        <h2>Crap, something went wrong</h2>
        <p>Apparently our website is drunk too..</p>
        <p>Try refreshing the page again</p>
      </Layout>
    );
  }
  const { Movie, Year, RulesHtml, omdb } = movieData;
  return (
    <Layout>
      <Head>
        <title>
          {Movie} ({Year}) Drinking Game
        </title>
      </Head>
      <article>
        <MovieDetails movie={movieData} />

        <div className="">
          <h3 className="text-2xl my-3">Drink when...</h3>
          <div
            dangerouslySetInnerHTML={{ __html: RulesHtml }}
            className="markdown"
          />
        </div>
      </article>
    </Layout>
  );
}

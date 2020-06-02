import Airtable from "airtable";
import remark from "remark";
import html from "remark-html";
import axios from "axios";
import { parse } from "date-fns";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const fetchMovieRecords = async () => {
  let movies = await getAirtableMovieRecords();
  const moviesCompiled = await Promise.all(
    movies.map(async (m) => {
      m.omdb = await getOMDbDataForMovie({
        imdb_id: m.imdb_id,
        title: m.Movie,
      });
      m.RulesHtml = await parseMarkdown(m.Rules);
      return m;
    })
  );

  return movies;
};

// Fetch airtable movies
export const getAirtableMovieRecords = async () => {
  const fetchPromise = new Promise((resolve, reject) => {
    let allMovies = [];
    base("Movies")
      .select({
        view: "Grid view",
        filterByFormula: "{Published}",
      })
      .all()
      .then((records) => {
        records.forEach(function (record) {
          allMovies.push({
            id: record.id,
            slug: [
              slugify(record.fields.Movie),
              slugify(record.fields.Year),
              record.id,
            ],
            ...record.fields,
          });
        });
        resolve(allMovies);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  let airtableMovieRecords = await fetchPromise;

  return airtableMovieRecords.sort((a, b) => {
    if (a.Movie > b.Movie) {
      return 1;
    } else {
      return -1;
    }
  });
};

export async function getAllMovieIds() {
  let allMovies = await getAirtableMovieRecords();
  return allMovies.map((movie) => {
    return {
      params: {
        // id: movie.id,
        id: movie.slug,
      },
    };
  });
}
getAllMovieIds().catch((err) => {
  console.error(err);
});

// Fetch OMDB data for movie
/* API: https://www.omdbapi.com/ */
// http://www.omdbapi.com/?apikey=[yourkey]&[i=imdb_id || t=Movie&y=Year]
const getOMDbDataForMovie = async ({
  imdb_id = null,
  title = null,
  year = null,
}) => {
  let OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API}&`;
  let params;
  if (imdb_id) {
    params = `i=${imdb_id}`;
  } else {
    params = `t=${title}&y=${year}`;
  }

  let omdbRes = await axios.get(OMDB_URL + params);
  return omdbRes.data;
};

// Use remark to convert the markdown into HTML string
const parseMarkdown = async (md) => {
  const processContent = await remark().use(html).process(md);
  return processContent.toString();
};

export async function getMovieRecord(id) {
  const getMoviePromise = new Promise((resolve, reject) => {
    base("Movies").find(id, (err, record) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve({
        id: record.id,
        ...record.fields,
      });
    });
  });

  let movieRecord = await getMoviePromise;

  // Append OMDB data
  movieRecord.omdb = await getOMDbDataForMovie({
    imdb_id: movieRecord.imdb_id,
    title: movieRecord.Movie,
    year: movieRecord.Year,
  });

  movieRecord.RulesHtml = await parseMarkdown(movieRecord.Rules);

  return movieRecord;
}

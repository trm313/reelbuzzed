import Airtable from "airtable";
import remark from "remark";
import html from "remark-html";
import axios from "axios";

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
  const fetchPromise = new Promise((resolve, reject) => {
    let allMovies = [];
    base("Movies")
      .select({
        view: "Grid view",
        // filterByFormula: "NOT({Published} = false)",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            allMovies.push({
              id: record.id,
              ...record.fields,
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            reject(err);
          }
          console.log("Returned movie count: ", allMovies.length);
          resolve(allMovies);
        }
      );
  });

  let allMovies = await fetchPromise;
  return allMovies;
};

export async function getAllMovieIds() {
  let allMovies = await fetchMovieRecords();
  console.log("Creating IDs for " + allMovies.length + " movies");
  return allMovies.map((movie) => {
    // const slug = slugify(`${movie.id} ${movie.Movie} ${movie.Year}`);
    return {
      params: {
        id: movie.id,
      },
    };
  });
}
getAllMovieIds().catch((err) => {
  console.error(err);
});

/* API: https://www.omdbapi.com/ */
// http://www.omdbapi.com/?apikey=[yourkey]&[i=imdb_id || t=Movie&y=Year]

async function getOMDbData({ imdb_id = null, title = null, year = null }) {
  const fetchOMDbPromise = new Promise((resolve, reject) => {
    let OMDB_URL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API}&`;
    let params;
    if (imdb_id) {
      params = `i=${imdb_id}`;
    } else {
      params = `t=${title}&y=${year}`;
    }
    axios
      .get(OMDB_URL + params)
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

  let omdbData = await fetchOMDbPromise;
  return omdbData;
}

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
  movieRecord.omdb = await getOMDbData({
    imdb_id: movieRecord.imdb_id,
    title: movieRecord.Movie,
    year: movieRecord.Year,
  });

  // Use remark to convert the markdown into HTML string
  const processedContent = await remark().use(html).process(movieRecord.Rules);
  movieRecord.RulesHtml = processedContent.toString();

  return movieRecord;
}

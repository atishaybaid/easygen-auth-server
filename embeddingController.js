import { generateEmbeddings } from "./aiEmbeddings.js";
import Movies from "./moviesModel.js";

export const findSimilar = async (req, res) => {
  const { input } = req.body;
  const embeddings = await generateEmbeddings(input);
  console.log("embeddings");
  console.log(embeddings);
  res.send({ embeddings: embeddings });
  res.end();
};

export const storeBulk = async (req, res) => {
  const { movieList = [] } = req.body;
  movieList.forEach(async (movieItem) => {
    const { title, year, genre, description } = movieItem;
    const embeddings = await generateEmbeddings(description);
    console.log("embedding at store bulk");
    console.log(embeddings);
    const createdMovie = await Movies.create({
      title: title,
      year: year,
      genre: genre,
      description: description,
      embedding: embeddings,
    });
    // console.log("created movie");
    // console.log(createdMovie);
  });

  res.send({ Message: "embedding stored sucessful" });
  res.end();
};

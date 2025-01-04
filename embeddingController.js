import { generateEmbeddings, cosineSimilarity } from "./aiEmbeddings.js";
import Movies from "./moviesModel.js";

export const findSimilar = async (req, res) => {
  const { input } = req.body;
  const inputEmbedding = await generateEmbeddings(input);
  const moviesInDb = await Movies.find({});
  console.log("moviesInDb");
  console.log(moviesInDb);

  const moviesDbWithSimilarity = moviesInDb.map((movieItem) => {
    const { title, description, genre, _id } = movieItem;
    // console.log("embedding a");
    // console.log(movieItem.embedding);
    // console.log("inputEmbedding");
    // console.log(inputEmbedding);
    const similarity = cosineSimilarity(movieItem.embedding, inputEmbedding);
    const obj = {
      similarity: similarity,
    };
    // console.log("similarity");
    // console.log(similarity);
    return {
      similarity: similarity,
      title: title,
      description: description,
      genre: genre,
      _id: _id,
    };
  });
  console.log("movie db with similarity");

  moviesDbWithSimilarity.sort((a, b) => a.similarity - b.similarity);

  //   console.log("moviesDbWithSimilarity");
  //   console.log(moviesDbWithSimilarity);

  const dbLength = moviesDbWithSimilarity.length;
  res.send({
    similarMovies: [
      moviesDbWithSimilarity[dbLength - 1],
      moviesDbWithSimilarity[dbLength - 2],
      moviesDbWithSimilarity[dbLength - 3],
    ],
  });
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

  res.send({ Message: `embedding of ${movieList.length} stored sucessful` });
  res.end();
};

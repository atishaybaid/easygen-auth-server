import OpenAI from "openai";

const { env } = process;
const { OPENAI_API_KEY, AI_AGENT_CREDS } = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const generateEmbeddings = async (inputText) => {
  try {
    //@todo:Change the model
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: inputText,
      encoding_format: "float",
    });
    return embedding.data[0].embedding;
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};

function dotProduct(embedding1, embedding2) {
  if (embedding1.length !== embedding2.length) {
    throw new Error("Embeddings must have the same length.");
  }
  return embedding1.reduce(
    (sum, value, index) => sum + value * embedding2[index],
    0
  );
}

export const cosineSimilarity = (embedding1, embedding2) => {
  const dotProd = dotProduct(embedding1, embedding2);
  const norm1 = Math.sqrt(
    embedding1.reduce((sum, value) => sum + value ** 2, 0)
  );
  const norm2 = Math.sqrt(
    embedding2.reduce((sum, value) => sum + value ** 2, 0)
  );

  if (norm1 === 0 || norm2 === 0) {
    throw new Error("Embeddings must not be zero vectors.");
  }

  return dotProd / (norm1 * norm2);
};

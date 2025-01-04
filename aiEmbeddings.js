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

import OpenAI from "openai";

const { env } = process;
const { OPENAI_API_KEY, AI_AGENT_CREDS } = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

console.log("ai agent creds");
console.log(AI_AGENT_CREDS);

function getTimeofTheDay() {
  return "Time of the day is 1:43pm";
}

const tools = [
  {
    type: "function",
    function: {
      name: "getTimeofTheDay",
      description: "Get time of the day",
    },
  },
];

const formateMessageObjectForOpenAI = (messageList = []) => {
  /*{ role: "user", content: message }*/
  //@todo:think about better way to loop and formate

  /*
  what are all the options that we can use to refactor the loop

   - map,
   - forEach
   - 



  */

  const formattedList = [];
  formattedList = messageList.map((messageItem) => {
    const { _id, text } = messageItem;
    const role = _id == "6770f0ebdc79775c22dccf3a" ? "assistant" : "user";
    const message = {
      role: role,
      content: text,
    };
    return message;
  });
  return formattedList;
};

export const generateAIReplies = async (messageList) => {
  try {
    const formattedMessages = formateMessageObjectForOpenAI(messageList);

    const chatCompletion = await openai.chat.completions.create({
      messages: [...formattedMessages],
      //max_completion_tokens: 200,
      model: "gpt-4o-mini",
      tools: tools,
      tool_choice: "auto",
    });

    console.log("chat completion");
    console.log(chatCompletion.choices[0]);

    const formattedMessageForDb = formateMessageForDb(
      chatCompletion.choices[0]
    );
    console.log("formatted message for db");
    console.log(formattedMessageForDb);
    return formattedMessageForDb;
  } catch (error) {
    console.log("error occured while generating the reply from open ai");
    console.log(error);
  }
};

const formateMessageForDb = (messageItem = {}) => {
  const { message } = messageItem;
  const { content } = message;
  /*{ role: "user", content: message }*/
  console.log("ai agent creds at formateMessageForDb");
  console.log(AI_AGENT_CREDS["id"]);
  return { text: content, author: "6770f0ebdc79775c22dccf3a" };
};

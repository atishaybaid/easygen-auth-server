import mongoose from "mongoose";
const { SchemaTypes } = mongoose;

/*
DataStructure of a message
 -{
    id:
    title:"",
   "year": 1999,
    "genre": ["Drama", "Mystery", "Thriller"],
    "description": "A young boy communicates with spirits, leading his psychologist to a life-changing discovery.",
    embedding:[]



}



*/

const MoviesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number },
    embedding: { type: [Number], required: true },
    year: { type: Number },
    description: { type: String, required: true },
    genre: { type: [String], required: true },
  },
  { timestamps: true }
);

const Movies = mongoose.model("Movies", MoviesSchema);

export default Movies;

/*

{
    text:"Hi how are you",
    userDetails:{

    } -> can be get from jwt,
    

}


res {
    messageID:"",
    conversationID:"",
    status:"success",
    failureMessage:""
}


messageSchema
{id:"",userInfo:"123456,userId:-1/forAI",sendAT:timeStamp["can be captured from browser"],text:""}


Steps
1. Get message from browser
2. Store the message in db and send success to user,update last sentMessage As well
3. get all the message from db put it in openAI model,get the response
4. Store the resone in db and send it to socket as well



/*
How will conter for two message,
    - the processing of the previous message should be stopped if send is in between
        - there could be few race conditions as well


conversations Schema
{
    id:"conversationId",
    userID,
    lastMessageID:1321423,
    lastMessageTimeStamp:12344756,


}


messages {
        id:"conversationId",
        conversationID:""
    lastMessageID:1321423,
    lastMessageTimeStamp:12344756,
    userInfo:"123456,userId:-1/forAI",
    sendAT:timeStamp["can be captured from browser"],
    text:""
}


dataFLow
when a new converesation is initiated,
- create a new conversation ,and send a welcome message
- create a message in message model as well


*/

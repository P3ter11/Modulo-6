import { Schema, model } from "mongoose";

/*
Tipi di dato accettati:
    String
    Number
    Boolean
    Array
    Buffer
    Date
    ObjectId
    UUID
*/

const commentsSchema = new Schema(
    { 
      content: {
          type: String ,
          required: true,
      },
  
      user: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
        
      ],
    },
         
      
    { collection: "comments"}
  )
  
  export default model("Comments", commentsSchema);
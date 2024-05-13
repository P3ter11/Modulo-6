import { Schema, model } from "mongoose";
import { type } from "os";

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

const userSchema = new Schema(
    {
      name: {
          type: String,
          required: false,
      },
  
      email: {
          type: String,
          required: true,
      },

      password: {
        type: String, 
        required: false
      },
  
      posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        }
        
      ],

      googleId: {
        type: String,
        required: false
      },
    },
         
    { collection: "users" }
  )
  
  export default model("User", userSchema);
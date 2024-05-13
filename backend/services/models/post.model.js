import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
      categoria: {
          type: String,
          required: true,
      },
  
      titolo: {
          type: String ,
          required: true,
      },
  
      cover: {
          type: String ,
          required: true,
  
      }, 
      readTime:{         
            type: String ,
            required: true,   
      },
  
      content: {
          type: String,
          required: false,
      },
      comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
      user: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    { collection: "post" }
  )
  
  export default model("Post", postSchema)
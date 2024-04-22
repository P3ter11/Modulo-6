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
          numero: {
              type: Number,
              required: true,
          },
          unit :{
              type: String ,
              required: true,
          }
      },
  
      autore: {
          nome: {
              type: String,
              required: true,
          },
          avatar: {
              type: String,
              required: false,
          }
  
      },
      content: {
          type: String,
          required: false,
      }
    },
    { collection: "post" }
  )
  
  export default model("Post", postSchema)
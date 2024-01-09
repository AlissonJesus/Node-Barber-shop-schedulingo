import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../server.js";
dotenv.config()
mongoose.connect(process.env.DB_CONNECT_STRING)
.then(() => app.emit("pronto"))
.catch(() => console.log("deu problema"));
/*

{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
*/

  export default mongoose
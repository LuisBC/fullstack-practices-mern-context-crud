import express from "express";
import postsRoutes from "./routes/posts.routes.js";
import fileUpload from "express-fileupload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); // To deploy in Heroku

// Middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

// Routes
app.use(postsRoutes);

// Static files
app.use(express.static(join(__dirname, "../client/build")));

export default app;

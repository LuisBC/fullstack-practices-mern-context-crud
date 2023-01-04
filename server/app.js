import express from "express";
import postsRoutes from "./routes/posts.routes.js";
import fileUpload from "express-fileupload";

const app = express();

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

export default app;

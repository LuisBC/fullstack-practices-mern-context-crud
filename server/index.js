import { connectDB } from "./db.js";
import { PORT } from "./config.js";
import app from "./app.js";

connectDB();

app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});

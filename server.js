import { app } from "./app.js";
import { connectDB } from "./database/database.js";

connectDB();
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is working at ${PORT}`);
});

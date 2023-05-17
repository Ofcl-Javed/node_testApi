import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URI, {
      dbName: "backendapi",
    })
    .then(() => console.log("Databse connected"))
    .catch((e) => console.log(e));
};

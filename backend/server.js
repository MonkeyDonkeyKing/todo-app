import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js"
import todoRoutes from "./routes/todos.js"

config();
const app = express();

app.use(cors());
app.use(json());
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB verbunden"))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => console.log(`Server läuft auf Port ${process.env.PORT}`));
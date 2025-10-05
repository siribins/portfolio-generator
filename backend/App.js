import express from "express";
     import { connect } from "mongoose";
     import { json } from "body-parser";
     import cors from "cors";
     import userRoutes from "./routes/userRoutes";

     const app = express();
     app.use(cors());
     app.use(json());

     // MongoDB Connection
     connect("mongodb://localhost:27017/portfolio", {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });

     // Routes
     app.use("/api/users", userRoutes);

     export default app;
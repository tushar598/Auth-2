import express from "express";

import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";
import passwordRoutes from "./routes/passwordRouter.js";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).send("hello user");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/password", passwordRoutes);

export default app;

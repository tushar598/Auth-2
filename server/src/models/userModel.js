import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});

const user = mongoose.model("user", userSchema);

export default user;

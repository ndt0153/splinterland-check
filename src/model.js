const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
});

export const User = mongoose.model("User", UserSchema, "User");

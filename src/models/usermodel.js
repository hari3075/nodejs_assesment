import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    profileImage: String,
    latitude: { type: Number, required: true }, 
    longitude: { type: Number, required: true },
  });
  const User = mongoose.model('User', UserSchema);
  export default User;
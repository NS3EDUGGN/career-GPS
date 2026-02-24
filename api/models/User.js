import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  testGiven: { type: Boolean, default: false },
  scores: Object
})

export default mongoose.models.User || mongoose.model("User", UserSchema)

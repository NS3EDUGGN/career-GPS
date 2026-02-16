import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

let cached = global.mongoose || { conn: null, promise: null }
global.mongoose = cached

async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then(m => m)
  }

  cached.conn = await cached.promise
  return cached.conn
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  testGiven: { type: Boolean, default: false },
  scores: Object
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default async function handler(req, res) {

  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" })

  try {
    await connectDB()

    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user)
      return res.status(404).json({ message: "User not found" })

    res.status(200).json({
      scores: user.scores,
      testGiven: user.testGiven,
      name: user.name
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

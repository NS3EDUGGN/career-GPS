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

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" })
  }

  try {
    await connectDB()

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    res.status(200).json({
      message: "Login successful",
      email: user.email,
      testGiven: user.testGiven
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

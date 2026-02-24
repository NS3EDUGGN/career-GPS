
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

const resultSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  year: String,
  course: String,
  topCareer: String,
  scores: Object,
  answers: Array,
  contacted: { type: Boolean, default: false },
  attemptDate: { type: Date, default: Date.now }
})

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema)

export default async function handler(req, res) {
  try {
    await connectDB()
    const students = await Result.find().sort({ attemptDate: -1 })
    res.status(200).json(students)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

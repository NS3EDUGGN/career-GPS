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

  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" })

  try {
    await connectDB()

    const data = req.body

    const existing = await Result.findOne({ email: data.email })

    if (existing) {
      Object.assign(existing, data)
      existing.attemptDate = new Date()
      await existing.save()
    } else {
      await Result.create(data)
    }

    res.status(200).json({ message: "Result saved successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

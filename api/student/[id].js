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

const Result = mongoose.models.Result || mongoose.model("Result", new mongoose.Schema({}))

export default async function handler(req, res) {

  if (req.method !== "DELETE")
    return res.status(405).json({ message: "Only DELETE allowed" })

  await connectDB()

  const { id } = req.query

  await Result.findByIdAndDelete(id)

  res.status(200).json({ success: true })
}

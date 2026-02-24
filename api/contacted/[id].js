
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
  contacted: Boolean
})

const Result = mongoose.models.Result || mongoose.model("Result", resultSchema)

export default async function handler(req, res) {
  await connectDB()

  const { id } = req.query

  const student = await Result.findById(id)
  student.contacted = !student.contacted
  await student.save()

  res.status(200).json({ success: true })
}

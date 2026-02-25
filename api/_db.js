import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI
const MONGO_DB = process.env.MONGO_DB   // 👈 NEW

if (!MONGO_URI) {
  throw new Error("MONGO_URI not found in environment variables")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB,      // ⭐ THIS SWITCHES DATABASE
      bufferCommands: false
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.js"

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api", authRoutes)

// ✅ GOOGLE APPS SCRIPT PROXY (FIXES CORS)
app.post("/api/lead", async (req, res) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwEh1cngfYSNx_Whucl72FTWUqYibPdzkMxcFkt1xiQTNyFaPaak3NaIsSIbodk33bj/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    )

    res.json({ success: true })
  } catch (error) {
    console.error("Google Script Error:", error)
    res.status(500).json({ success: false })
  }
})

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err))

// Server start
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))

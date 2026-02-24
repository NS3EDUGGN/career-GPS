import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.js"
import resultRoutes from "./routes/result.js"   // ⭐ ADD THIS

dotenv.config()

const app = express()

// ================= MIDDLEWARE =================
app.use(cors())
app.use(express.json())

// ================= ROUTES =================

// login & register
app.use("/api", authRoutes)

// admin panel student results (VERY IMPORTANT)
app.use("/api", resultRoutes)


// ================= GOOGLE APPS SCRIPT PROXY =================
app.post("/api/lead", async (req, res) => {
  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbwEgPfoSG4peAxa9c5-yRdjEa9GEvbJfdWNfIagbBszgFGI7qzP2uf7tmdrVT9rhR9R9g/exec",
     /* "https://script.google.com/macros/s/AKfycbwmm2CNZaisE_EyRDd7zhILgHlE6c7lMaN-OZmlPrAI8sfODCPC7J19IyP_73XNw9B6/exec",*/
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


// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI, { dbName: "career" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err))


// ================= SERVER =================
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

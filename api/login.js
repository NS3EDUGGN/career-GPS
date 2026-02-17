import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

let isConnected = false

async function connectDB() {
  if (isConnected) return

  await mongoose.connect(MONGO_URI, {
    dbName: "resume"
  })

  isConnected = true
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" })
  }

  try {

    await connectDB()

    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      testGiven: { type: Boolean, default: false },
      scores: Object
    })

    const User = mongoose.models.User || mongoose.model("User", userSchema)

    const { email, password } = req.body

    // 🔴 important change
    const user = await User.findOne({ email: email.trim() })

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // compare properly
    if (String(user.password).trim() !== String(password).trim()) {
      return res.status(401).json({ message: "Wrong password" })
    }

    return res.status(200).json({
      message: "Login successful",
      email: user.email,
      testGiven: user.testGiven
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}

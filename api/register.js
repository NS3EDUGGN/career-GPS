import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

let isConnected = false

async function connectDB() {
  if (isConnected) return

 await mongoose.connect(MONGO_URI, {
  dbName: "test"
})

  isConnected = true
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" })
  }

  try {

    await connectDB()

    // create schema AFTER connection
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      testGiven: { type: Boolean, default: false },
      scores: Object
    })

    const User =
      mongoose.models.User || mongoose.model("User", userSchema)

   const { name, email, password, phone, interest, other_interest } = req.body


    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "User already exists" })
    }

    await User.create({ name, email, password })
    // send to google sheet
await fetch("https://script.google.com/macros/s/AKfycbw60kk4O_cGwpVYB8oloSX5Qh8sUdNHqbWiWVtJ5rhJ-lWQ9HYPUlZt-lzzibZRl75-/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    email,
    phone,
    interest,
    other,
    password
  })
})


    return res.status(200).json({ message: "Registered Successfully" })

  } catch (err) {
    console.log(err)   // VERY IMPORTANT (shows in Vercel logs)
    return res.status(500).json({ message: err.message })
  }
}

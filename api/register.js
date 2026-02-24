import { connectDB } from "./_db.js"
import User from "./models/User.js"

export default async function handler(req, res) {

  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" })

  try {

    await connectDB()

    const { name, email, password, phone } = req.body

    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({ message: "User already exists" })
    }

    await User.create({
      name,
      email,
      password,
      phone
    })

    return res.status(200).json({ success: true })

  } catch (err) {
    console.log("REGISTER ERROR:", err)
    return res.status(500).json({ message: "Server error" })
  }
}

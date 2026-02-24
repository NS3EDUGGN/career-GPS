import { connectDB } from "./_db.js"
import User from "./models/User.js"

export default async function handler(req, res) {

  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" })

  try {

    await connectDB()

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user)
      return res.status(401).json({ success:false, message:"User not found" })

    if (String(user.password) !== String(password))
      return res.status(401).json({ success:false, message:"Wrong password" })

    return res.status(200).json({
      success:true,
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        testGiven:user.testGiven
      }
    })

  } catch (err) {
    console.log("LOGIN ERROR:", err)
    return res.status(500).json({ message:"Server error" })
  }
}

import { connectDB } from "./_db.js"
import Result from "./models/Result.js"
import User from "./models/User.js"

export default async function handler(req, res) {

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Only DELETE allowed" })
  }

  try {

    await connectDB()

    const { id } = req.body

    if (!id) {
      return res.status(400).json({ message: "Student id missing" })
    }

    // 1️⃣ Find result first
    const studentResult = await Result.findById(id)

    if (!studentResult) {
      return res.status(404).json({ message: "Student not found" })
    }

    const studentEmail = studentResult.email

    // 2️⃣ Delete quiz result
    await Result.findByIdAndDelete(id)

    // 3️⃣ Delete login account
    await User.findOneAndDelete({ email: studentEmail })

    res.status(200).json({
      success: true,
      message: "Student and account deleted"
    })

  } catch (err) {
    console.log("DELETE ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
}

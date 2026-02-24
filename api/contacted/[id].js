import { connectDB } from "../_db.js"
import Result from "../models/Result.js"

export default async function handler(req, res) {

  // only PUT allowed
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Only PUT allowed" })
  }

  try {

    await connectDB()

    // ⭐ GET ID FROM URL
    const { id } = req.query

    if (!id) {
      return res.status(400).json({ message: "Student ID missing" })
    }

    const student = await Result.findById(id)

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // ⭐ TOGGLE CONTACT STATUS
    student.contacted = !student.contacted

    await student.save()

    return res.status(200).json({
      success: true,
      contacted: student.contacted
    })

  } catch (err) {
    console.log("CONTACT TOGGLE ERROR:", err)
    return res.status(500).json({ message: "Server error" })
  }
}

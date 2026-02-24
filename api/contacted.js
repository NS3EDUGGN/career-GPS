import { connectDB } from "./_db.js"
import Result from "./models/Result.js"

export default async function handler(req, res) {

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Only PUT allowed" })
  }

  try {

    await connectDB()

    const { id } = req.body

    if (!id) {
      return res.status(400).json({ message: "Student id missing" })
    }

    const student = await Result.findById(id)

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // TOGGLE
    student.contacted = !student.contacted
    await student.save()

    res.status(200).json({
      success: true,
      contacted: student.contacted
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error" })
  }
}

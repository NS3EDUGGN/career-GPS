import { connectDB } from "./_db.js"
import Result from "./models/Result.js"

export default async function handler(req, res) {

  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" })

  try {

    await connectDB()

    const {
      name, email, phone,
      college, course, year,
      scores, topCareer, answers
    } = req.body

    const existing = await Result.findOne({ email })

    if (existing) {
      return res.status(200).json({ message: "Already saved" })
    }

    await Result.create({
      name,
      email,
      phone,
      college,
      course,
      year,
      scores,
      topCareer,
      answers
    })

    res.status(200).json({ success:true })

  } catch (err) {
    console.log("SAVE RESULT ERROR:", err)
    res.status(500).json({ message:"Server error" })
  }
}

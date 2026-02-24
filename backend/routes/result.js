import express from "express"
import Result from "../models/Result.js"
import User from "../models/User.js"
import fetch from "node-fetch"

const router = express.Router()

// ================= SAVE RESULT =================
router.post("/save-result", async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      college,
      course,
      year,
      scores,
      topCareer,
      answers
    } = req.body

    if (!name || !email || !scores || !topCareer) {
      return res.status(400).json({ message: "Missing required data" })
    }

    let existing = await Result.findOne({ email })

    if (existing) {
      // UPDATE EXISTING
      existing.name = name
      existing.phone = phone
      existing.college = college
      existing.course = course
      existing.year = year
      existing.scores = scores
      existing.topCareer = topCareer
      existing.answers = answers
      existing.attemptDate = new Date()

      await existing.save()
    } else {
      // CREATE NEW
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
    }
    // ===== SEND RESULT TO GOOGLE SHEET (DIRECT WEBHOOK) =====
try {

  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbwEgPfoSG4peAxa9c5-yRdjEa9GEvbJfdWNfIagbBszgFGI7qzP2uf7tmdrVT9rhR9R9g/exec",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        college: college,
        year: year,
        course: course,
        date: new Date(),
        status: "Pending"
      }),
    }
  );

  console.log("Google webhook status:", response.status);

} catch (err) {
  console.log("GOOGLE WEBHOOK ERROR:", err);
}

    res.json({ success: true })

  } catch (err) {
    console.log("SAVE RESULT ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
})

// ================= GET RESULTS =================
router.get("/results", async (req, res) => {
  try {
    const results = await Result.find().sort({ attemptDate: -1 })
    res.json(results)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
})

// ================= CONTACTED TOGGLE =================
router.put("/contacted/:id", async (req, res) => {
  try {
    const student = await Result.findById(req.params.id)
    student.contacted = !student.contacted
    await student.save()
    res.json({ success: true })
  } catch {
    res.status(500).json({ message: "Error updating" })
  }
})

router.delete("/student/:id", async (req, res) => {
  try {

    // 1️⃣ Find the result first
    const studentResult = await Result.findById(req.params.id)

    if (!studentResult) {
      return res.status(404).json({ message: "Student not found" })
    }

    const studentEmail = studentResult.email

    // 2️⃣ Delete quiz result
    await Result.findByIdAndDelete(req.params.id)

    // 3️⃣ Delete login account using email
    await User.findOneAndDelete({ email: studentEmail })

    res.json({ success: true, message: "Student account deleted completely" })

  } catch (err) {
    console.log("DELETE ERROR:", err)
    res.status(500).json({ message: "Delete failed" })
  }
})

export default router
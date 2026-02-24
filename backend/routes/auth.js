import express from "express"
import bcrypt from "bcrypt"
import User from "../models/User.js"

const router = express.Router()

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body


    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const passwordHash = await bcrypt.hash(password, 10)

await User.create({
  name,
  email,
  phone,
  passwordHash
  
})


    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: "Registration failed" })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    })
  } catch (err) {
    res.status(500).json({ message: "Login failed" })
  }
})

router.get("/check-user/:email", async (req, res) => {
  try {

    const user = await User.findOne({ email: req.params.email })

    if (!user) {
      return res.json({ exists: false })
    }

    res.json({ exists: true })

  } catch (err) {
    res.status(500).json({ exists: false })
  }
})

export default router

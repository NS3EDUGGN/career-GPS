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
const params = new URLSearchParams()
params.append("name", name)
params.append("email", email)
params.append("phone", phone)
params.append("interest", interest)
params.append("other", other_interest)

await fetch("https://script.google.com/macros/s/AKfycbyIue5yHzPK3szBBK_PM90bW4qOc9gVUms9-uiIGIpgVSTmWpkMogQBNchbw0e6ekeI/exec", {
  method: "POST",
  body: params
})


    return res.status(200).json({ message: "Registered Successfully" })

  } catch (err) {
    console.log(err)   // VERY IMPORTANT (shows in Vercel logs)
    return res.status(500).json({ message: err.message })
  }
}

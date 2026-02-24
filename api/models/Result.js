import mongoose from "mongoose"

const ResultSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  course: String,
  year: String,
  scores: Object,
  topCareer: String,
  answers: Array,
  contacted: { type: Boolean, default: false },
  attemptDate: { type: Date, default: Date.now }
})

export default mongoose.models.Result || mongoose.model("Result", ResultSchema)

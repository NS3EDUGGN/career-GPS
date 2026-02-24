import mongoose from "mongoose"

// ⭐ answer sub-schema
const answerSchema = new mongoose.Schema({
  question: String,
  selected: String,
  career: String,
  score: mongoose.Schema.Types.Mixed   // allows {web:2} or {ai:1}
},{ _id:false })


const resultSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,

  college: { type: String, default: "" },
  course: { type: String, default: "" },
  year: { type: String, default: "" },

  scores: mongoose.Schema.Types.Mixed,
  topCareer: String,

  // ⭐ THIS IS THE IMPORTANT CHANGE
  answers: [answerSchema],

  attemptDate: {
    type: Date,
    default: Date.now
  },

  contacted: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model("Result", resultSchema)
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Clock, Brain, ShieldCheck, Laptop } from "lucide-react"

function Instructions() {

  const navigate = useNavigate()
  const [agree, setAgree] = useState(false)

  const handleStart = () => {
    if (!agree) return
    navigate("/quiz")
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-12">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100" />

      {/* FLOATING BLOBS (Liquid Effect) */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-300/30 rounded-full blur-3xl top-[-120px] left-[-120px] animate-pulse" />
      <div className="absolute w-[450px] h-[450px] bg-green-400/20 rounded-full blur-3xl bottom-[-150px] right-[-100px] animate-pulse" />
      <div className="absolute w-[350px] h-[350px] bg-teal-300/20 rounded-full blur-3xl top-[40%] left-[40%]" />

      {/* GLASS CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="
        relative z-10 w-full max-w-5xl
        rounded-[28px]
        border border-white/40
        bg-white/25
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(16,185,129,0.25)]
        p-6 md:p-10
      "
      >

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800">
            Career Diagnosis Assessment
          </h1>
          <p className="text-emerald-900/70 mt-2">
            Please read the instructions carefully before starting the assessment
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

          <GlassCard icon={<Clock size={30} />} title="Duration" text="15–20 Minutes" />
          <GlassCard icon={<Brain size={30} />} title="Assessment Type" text="Psychometric Test" />
          <GlassCard icon={<Laptop size={30} />} title="Device Rule" text="Do Not Refresh" />
          <GlassCard icon={<ShieldCheck size={30} />} title="Accuracy" text="Honest Answers" />

        </div>

        {/* INSTRUCTIONS SECTIONS */}
        <div className="grid md:grid-cols-2 gap-8">

          <InstructionBox
            title="General Instructions"
            items={[
              "There are no right or wrong answers",
              "Choose what naturally matches you",
              "Do not try to impress the system",
              "Avoid overthinking",
              "Complete in one sitting",
            ]}
          />

          <InstructionBox
            title="Important Rules"
            items={[
              "Do not refresh the page",
              "Do not switch tabs",
              "Random answers reduce accuracy",
              "Results depend on your responses",
              "Answer sincerely",
            ]}
          />

        </div>

        {/* WARNING BOX */}
        <div className="mt-10 rounded-2xl border border-emerald-300/60 bg-emerald-200/30 backdrop-blur-md p-5">
          <p className="font-semibold text-emerald-900">⚠ Important Notice</p>
          <p className="text-emerald-900/80 text-sm mt-1">
            This assessment analyzes your personality, interests and aptitude to
            recommend suitable career domains. Rushed or dishonest answers may
            generate incorrect recommendations.
          </p>
        </div>

        {/* AGREEMENT */}
        <div className="flex items-start gap-3 mt-8">
          <input
            type="checkbox"
            className="mt-1 w-5 h-5 accent-emerald-600"
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label className="text-emerald-900">
            I have read and understood the instructions and I agree to attempt
            the assessment sincerely.
          </label>
        </div>

        {/* START BUTTON */}
        <div className="flex justify-center mt-8">
          <button
            disabled={!agree}
            onClick={handleStart}
            className={`
            px-12 py-3 rounded-xl text-lg font-semibold text-white
            transition-all duration-300
            ${agree
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-[0_10px_30px_rgba(16,185,129,0.45)] hover:scale-105"
                : "bg-gray-400 cursor-not-allowed"}
          `}
          >
            Start Assessment
          </button>
        </div>

      </motion.div>
    </div>
  )
}

/* -------- COMPONENTS -------- */

function GlassCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl p-4 text-center hover:scale-105 transition">
      <div className="text-emerald-700 mb-2 flex justify-center">{icon}</div>
      <p className="font-semibold text-emerald-900">{title}</p>
      <p className="text-sm text-emerald-900/70">{text}</p>
    </div>
  )
}

function InstructionBox({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/25 backdrop-blur-xl p-5">
      <h2 className="text-xl font-semibold mb-4 text-emerald-900">{title}</h2>
      <ul className="space-y-2 text-emerald-900/85">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}

export default Instructions

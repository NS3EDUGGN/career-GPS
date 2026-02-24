import { useLocation, useNavigate } from "react-router-dom"
import { generateResult } from "../utils/generateResult"
import { useState, useEffect } from "react"
import { get30DayPlan } from "../utils/get30DayPlan"
import CareerCard from "../components/CareerCard"
import Modal from "../components/Modal"   // ⭐ IMPORTANT

function Result() {

  const location = useLocation()
  const answers = location.state?.answers || []
  const navigate = useNavigate()
  const [scores, setScores] = useState(null)
  const userData = JSON.parse(localStorage.getItem("userData") || "{}")


  /* ---------- LOGIN PROTECTION ---------- */
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      window.location.href = "/login"
    }
  }, [])

  /* ---------------- LOAD SCORES ---------------- */
  useEffect(() => {

    if (location.state?.scores) {
      setScores(location.state.scores)
      sessionStorage.setItem("careerScores", JSON.stringify(location.state.scores))
      return
    }

    const stored = sessionStorage.getItem("careerScores")
    if (stored) {
      setScores(JSON.parse(stored))
    } else {
      setTimeout(() => navigate("/quiz"), 0)
    }

  }, [location, navigate])

  /* ---------------- POPUPS ---------------- */
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showReviewPopup, setShowReviewPopup] = useState(false)

  useEffect(() => {
    if (!scores) return

    const email = sessionStorage.getItem("userEmail") || "guest"
    const alreadyShown = localStorage.getItem(`reviewShown_${email}`)

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowReviewPopup(true)
        localStorage.setItem(`reviewShown_${email}`, "yes")
      }, 12000)

      return () => clearTimeout(timer)
    }
  }, [scores])

  /* ---------------- RESULT CALCULATION ---------------- */
  const result = scores ? generateResult(scores) : null

  const topCareer = result
    ? [...result.breakdown].sort((a, b) => b.percent - a.percent)[0]
    : null

  const careerTitle = topCareer ? topCareer.title : null
  const careerPercent = topCareer ? topCareer.percent : 0

  /* ---------------- SAVE RESULT TO DATABASE ---------------- */
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"))
    const studentProfile = JSON.parse(localStorage.getItem("studentProfile") || "{}")

    if (!scores || !careerTitle || !user || !user.email || !user.email || !userData) {
      return
    }

    // ⭐ Prevent duplicate save on refresh
    const alreadySaved = sessionStorage.getItem("resultSaved")
    if (alreadySaved) return
    sessionStorage.setItem("resultSaved", "yes")

    const saveResult = async () => {
      try {
        await fetch("http://localhost:5000/api/save-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
              college: userData.college,
              course: userData.course,
              year: userData.year,
            scores: scores,
            topCareer: careerTitle,
            answers: answers
          })
        })
      } catch (err) {
        console.log("Save result error:", err)
      }
    }

    saveResult()

  }, [scores, careerTitle])

  /* 🛑 WAIT UNTIL DATA EXISTS */
  if (!scores || !result || !topCareer) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-200 bg-[#0E1F1A]">
        Loading your career report...
      </div>
    )
  }

  /* ---------------- LINKS ---------------- */

  const WHATSAPP_NUMBER = "919821442746"
  const WHATSAPP_MESSAGE =
    "Hi, I just completed the Career Diagnosis Test and would like guidance on my result."

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  // ⭐ normalize for safety
  const normalizedCareer = careerTitle?.trim()

  const plan30Days = get30DayPlan(normalizedCareer)
  const brochureLink = getBrochure(normalizedCareer)

  /* ---------------- BROCHURE FUNCTION ---------------- */
  function getBrochure(career) {
    if (!career) return "/brochures/default.pdf"

    const normalized = career.trim().toLowerCase()

    const brochures = {
      "web development": "/brochures/web-development.pdf",
      "data science": "/brochures/data-science.pdf",
      "cyber security": "/brochures/cyber-security.pdf",
      "networking": "/brochures/networking.pdf",
      "digital marketing": "/brochures/digital-marketing.pdf",
      "human resources (hr)": "/brochures/hr.pdf",
      "hr": "/brochures/hr.pdf",
      "finance professional": "/brochures/finance.pdf",
      "ai / ml engineer": "/brochures/aiml.pdf",
      "ai/ml": "/brochures/aiml.pdf",
      "logistics & operations": "/brochures/logistics.pdf",
      "cloud & devops": "/brochures/cloud-devops.pdf",
      "content creator": "/brochures/content-creator.pdf"
    }

    return brochures[normalized] || "/brochures/default.pdf"
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E1F1A] via-[#102822] to-[#0B1A15] text-white px-6 py-10">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT PANEL */}
        <div className="lg:col-span-1 space-y-6">

          <div className="relative border border-green-400/30 rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/0 backdrop-blur shadow-[0_0_35px_rgba(34,197,94,0.18)]">

            <p className="text-xs uppercase tracking-widest text-green-400">
              Your Career DNA
            </p>

            <h1 className="text-3xl font-extrabold mt-3">
              {result.bestCareer}
            </h1>

            <p className="mt-2 text-sm text-green-200/70">Match Confidence</p>

            <div className="mt-4 text-4xl font-black text-green-400">
              {result.confidence}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {result.strengths.map((s, i) => (
                <span key={i}
                  className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-300 border border-green-400/30">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowRoadmap(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold">
            View Career Roadmap →
          </button>

        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 space-y-6">

          <h2 className="text-xl font-bold text-green-100">
            Top Career Matches
          </h2>

          <CareerCard
            rank={1}
            title={careerTitle}
            percent={careerPercent}
          />

          <div className="mt-10 flex flex-wrap gap-4">

            <a href={brochureLink} download
              className="px-6 py-3 rounded-xl bg-white text-green-900 font-semibold">
              Download {careerTitle} Brochure
            </a>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-green-400/30">
              Talk to Counselor
            </a>

          </div>

        </div>
      </div>

 {/* ================= 30 DAY ROADMAP SECTION ================= */}

{plan30Days?.length > 0 && (
  <div className="max-w-7xl mx-auto mt-24">

    <h2 className="text-4xl md:text-5xl font-extrabold text-green-300 text-center mb-16 tracking-wide">
      Your 30-Day Action Plan for {careerTitle}
    </h2>

    <div className="grid md:grid-cols-2 gap-10">

      {plan30Days.map((weekTopics, index) => (
        <div key={index}
          className="relative rounded-[28px] p-10 border border-emerald-400/25
          bg-gradient-to-br from-[#0f2a23] via-[#0d221c] to-[#081713]
          shadow-[0_0_40px_rgba(16,185,129,0.15)]
          hover:shadow-[0_0_70px_rgba(16,185,129,0.35)]
          transition-all duration-300">

          <div className="absolute inset-0 rounded-[28px] pointer-events-none
            bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_60%)]">
          </div>

          {/* WEEK TITLE */}
          <h3 className="text-2xl font-bold text-emerald-300 mb-6 relative z-10">
            Week {index + 1}
          </h3>

          {/* TOPICS */}
          <ul className="space-y-4 text-emerald-100/90 relative z-10">
            {weekTopics.map((topic, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed">
                <span className="mt-2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]"></span>
                <span className="text-[15.5px]">{topic}</span>
              </li>
            ))}
          </ul>

        </div>
      ))}

    </div>
  </div>
)}
      {/* ⭐ ROADMAP MODAL (THIS WAS MISSING) */}
      {showRoadmap && (
        <Modal
          career={careerTitle}
          onClose={() => setShowRoadmap(false)}
        />
      )}

    </div>
  )
}

export default Result

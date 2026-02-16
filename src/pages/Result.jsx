import { useLocation, useNavigate } from "react-router-dom"
import { generateResult } from "../utils/generateResult"
import { useState, useEffect } from "react"

function Result() {
  
  const location = useLocation()
const [scores, setScores] = useState(null)

useEffect(() => {
  // first try router state
  if (location.state?.scores) {
    setScores(location.state.scores)
    return
  }

  // fallback (THIS fixes popup)
  const stored = sessionStorage.getItem("careerScores")
  if (stored) {
    setScores(JSON.parse(stored))
  }
}, [location])

  const navigate = useNavigate()
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



if (!scores) {
  return (
    <div className="min-h-screen flex items-center justify-center text-green-200 bg-[#0E1F1A]">
      Loading your career report...
    </div>
  )
}


 const result = generateResult(scores)
  // ✅ Only top career
  const topCareer = [...result.breakdown]
    .sort((a, b) => b.percent - a.percent)[0]

  const WHATSAPP_NUMBER = "919821442746"
  const WHATSAPP_MESSAGE =
    "Hi, I just completed the Career Diagnosis Test and would like guidance on my result."
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`

  const plan30Days = get30DayPlan(topCareer.title)
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
    "content creator":"/brochures/content-creator.pdf"
  }

  return brochures[normalized] || "/brochures/default.pdf"
}
const brochureLink = getBrochure(topCareer.title)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E1F1A] via-[#102822] to-[#0B1A15] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* LEFT PANEL */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative border border-green-400/30 rounded-3xl p-6 bg-gradient-to-br from-white/10 to-white/0 backdrop-blur shadow-[0_0_35px_rgba(34,197,94,0.18)] hover:shadow-[0_0_55px_rgba(34,197,94,0.35)] transition-all duration-500">

            <p className="text-xs uppercase tracking-widest text-green-400">
              Your Career DNA
            </p>

            <h1 className="text-3xl font-extrabold mt-3 leading-tight">
              {result.bestCareer}
            </h1>
            <p className="mt-2 text-sm text-green-200/70">Match Confidence</p>

            <div className="mt-4 text-4xl font-black text-green-400">
              {result.confidence}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {result.strengths.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-300 border border-green-400/30"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowRoadmap(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-bold hover:scale-105 active:scale-95 transition"
          >
            View Career Roadmap →
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold tracking-wide text-green-100">
            Top Career Matches
          </h2>

          <div className="relative">
            <CareerCard
              rank={1}
              title={topCareer.title}
              percent={topCareer.percent}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <MiniPanel title="Learning Style" items={result.learning} />
            <MiniPanel title="Needs Improvement" items={result.improvements} />
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
          <a
  href={brochureLink}
  download
  className="px-6 py-3 rounded-xl bg-white text-green-900 font-semibold hover:scale-105 transition"
>
  Download {topCareer.title} Brochure
</a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-green-400/30 hover:bg-green-400/10 transition"
            >
              Talk to Counselor
            </a>
          </div>
        </div>
      </div>

      {/* 🔥 30 DAY PLAN SECTION */}
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="text-2xl font-extrabold mb-6 text-green-300">
          Your 30-Day Action Plan for {topCareer.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {plan30Days.map((week, i) => (
            <div
              key={i}
              className="border border-green-400/30 rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/0 shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:shadow-[0_0_50px_rgba(34,197,94,0.3)] transition-all"
            >
              <h3 className="font-bold text-green-200 mb-3">
                Week {i + 1}
              </h3>

              <ul className="space-y-2 text-sm text-green-100/80">
                {week.map((task, idx) => (
                  <li key={idx}>• {task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {showRoadmap && (
        <Modal onClose={() => setShowRoadmap(false)} career={topCareer.title}/>
        )}
        {showReviewPopup && (
  <ReviewPopup onClose={() => setShowReviewPopup(false)} />
)}


    </div>
  )
}

/* ================= HELPERS ================= */

function get30DayPlan(career) {

  const plans = {

    /* ---------------- WEB DEVELOPMENT ---------------- */

    "Web Development": [
      [
        "Understand how websites work (Frontend vs Backend)",
        "Learn HTML tags & page structure",
        "Practice building a personal webpage"
      ],
      [
        "Learn CSS styling & layouts (Flexbox, Grid)",
        "Make your webpage responsive for mobile",
        "Host your site on GitHub Pages"
      ],
      [
        "Learn JavaScript fundamentals (variables, loops, functions)",
        "DOM manipulation & events",
        "Build a dynamic To-Do List project"
      ],
      [
        "Learn React basics (components, props, state)",
        "Create a portfolio website",
        "Prepare GitHub + Resume"
      ]
    ],

    /* ---------------- DATA SCIENCE ---------------- */

    "Data Science": [
      [
        "Install Python & VS Code",
        "Learn Python basics (variables, loops, functions)",
        "Practice simple coding problems"
      ],
      [
        "Learn NumPy & Pandas",
        "Work with CSV datasets",
        "Basic data cleaning"
      ],
      [
        "Learn Data Visualization (Matplotlib, Seaborn)",
        "Exploratory Data Analysis",
        "Mini data analysis project"
      ],
      [
        "Intro to Machine Learning",
        "Train a simple prediction model",
        "Upload project on GitHub"
      ]
    ],

    /* ---------------- CYBER SECURITY ---------------- */

    "Cyber Security": [
      [
        "Understand what hacking & cybersecurity actually is",
        "Learn networking basics (IP, DNS, HTTP, HTTPS)",
        "Install Kali Linux / Virtual Machine"
      ],
      [
        "Learn Linux commands & terminal usage",
        "Understand ports & protocols",
        "Intro to ethical hacking concepts"
      ],
      [
        "Learn vulnerability scanning (Nmap)",
        "Password attacks & brute force basics",
        "Try Capture The Flag (CTF) practice"
      ],
      [
        "Learn web security (SQL Injection, XSS basics)",
        "Create a cybersecurity learning portfolio",
        "Join TryHackMe / HackTheBox beginner labs"
      ]
    ],

    /* ---------------- NETWORKING ---------------- */

    "Networking": [
      [
        "Understand computer networks & internet basics",
        "Learn OSI Model",
        "Learn IP addressing & subnetting"
      ],
      [
        "Routing vs Switching concepts",
        "Learn DHCP, DNS",
        "Practice Packet Tracer simulations"
      ],
      [
        "Configure routers & switches",
        "Understand VLANs",
        "Practice small lab setup"
      ],
      [
        "Prepare for CCNA concepts",
        "Troubleshoot network issues",
        "Document learning in notes"
      ]
    ],

    /* ---------------- DIGITAL MARKETING ---------------- */

    "Digital Marketing": [
      [
        "Understand digital marketing ecosystem",
        "Create Gmail + LinkedIn profile",
        "Learn SEO basics"
      ],
      [
        "Keyword research",
        "On-page SEO optimization",
        "Write 2 blog articles"
      ],
      [
        "Social media marketing (Instagram, LinkedIn)",
        "Create content calendar",
        "Learn Canva content design"
      ],
      [
        "Intro to Google Ads & Meta Ads",
        "Run a small campaign (demo)",
        "Build portfolio case study"
      ]
    ],

    /* ---------------- HR ---------------- */

    "HR": [
      [
        "Understand HR roles & responsibilities",
        "Learn recruitment lifecycle",
        "Create professional LinkedIn profile"
      ],
      [
        "Learn resume screening",
        "Practice interview questioning",
        "Understand HR documentation"
      ],
      [
        "Learn payroll & employee engagement",
        "Learn HRMS tools basics",
        "Mock interview practice"
      ],
      [
        "Learn labor laws basics",
        "Create HR portfolio",
        "Apply for HR internships"
      ]
    ],

    /* ---------------- FINANCE ---------------- */

    "Finance": [
      [
        "Understand basics of finance & accounting",
        "Learn financial statements",
        "Excel basics"
      ],
      [
        "Advanced Excel formulas",
        "Budgeting & forecasting",
        "Basic taxation concepts"
      ],
      [
        "Investment basics (stocks, mutual funds)",
        "Financial ratio analysis",
        "Case study practice"
      ],
      [
        "Prepare financial reports",
        "Create finance portfolio",
        "Apply for internships"
      ]
    ],

    /* ---------------- AI ML ---------------- */

    "AI/ML": [
      [
        "Learn Python basics",
        "Understand data types & loops",
        "Install Jupyter Notebook"
      ],
      [
        "Learn NumPy & Pandas",
        "Data preprocessing",
        "Dataset exploration"
      ],
      [
        "Supervised vs Unsupervised learning",
        "Train simple ML models",
        "Model evaluation"
      ],
      [
        "Build ML mini project",
        "Upload to GitHub",
        "Prepare portfolio"
      ]
    ]
  }

  return plans[career] || [
    [
      "Research the career field",
      "Watch beginner tutorials",
      "Note required skills"
    ],
    [
      "Start foundational learning",
      "Practice small exercises",
      "Track daily progress"
    ],
    [
      "Do mini projects",
      "Improve weak areas",
      "Seek mentor feedback"
    ],
    [
      "Create portfolio",
      "Prepare resume",
      "Plan next 90 days"
    ]
  ]
}


/* ================= EXISTING COMPONENTS ================= */

function CareerCard({ rank, title, percent }) {
  return (
    <div className="relative border border-green-400/30 rounded-2xl p-6 bg-gradient-to-br from-white/10 to-white/0 shadow-[0_0_40px_rgba(34,197,94,0.15)] hover:shadow-[0_0_60px_rgba(34,197,94,0.3)] hover:border-green-400/60 transition-all duration-500">
      <span className="absolute -top-3 -left-3 w-10 h-10 flex items-center justify-center rounded-full bg-green-400 text-green-900 font-bold shadow-lg">
        {rank}
      </span>

      <span className="absolute top-4 right-4 text-[10px] px-3 py-1 rounded-full bg-green-400/10 text-green-300 border border-green-400/30 uppercase">
        Best Match
      </span>

      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <div className="flex items-center justify-between text-sm text-green-200/70">
        <span>Match Score</span>
        <span className="text-green-400 font-bold">{percent}%</span>
      </div>

      <div className="mt-3 h-1.5 bg-green-900/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function MiniPanel({ title, items }) {
  return (
    <div className="border border-green-400/30 rounded-2xl p-5 bg-gradient-to-br from-white/10 to-white/0">
      <h4 className="text-sm font-semibold mb-3 text-green-200/80">
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function Modal({ onClose, career }) {
  const normalizedCareer = career?.trim().toLowerCase()

    const roadmapImages = {
  "web development": "/roadmaps/webdev.png",
  "data science": "/roadmaps/datascience.png",
  "cyber security": "/roadmaps/cybersecurity.png",
  "networking": "/roadmaps/networking.png",
  "digital marketing": "/roadmaps/digitalmarketing.png",
  "human resources (hr)": "/roadmaps/hr.png",
  "finance professional": "/roadmaps/finance.png",
  "ai / ml engineer": "/roadmaps/aiml.png",
  "content creator": "/roadmaps/content.png",
  "logistics & operations": "/roadmaps/logistics.png",
  "cloud & devops": "/roadmaps/cloud.png"
}

const roadmapSrc = roadmapImages[normalizedCareer] || "/roadmaps/default.png"

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-[#0E1F1A] border border-green-400/30 rounded-2xl w-full max-w-4xl max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-400 text-green-900 font-bold"
        >
          ✕
        </button>

        <div className="overflow-y-auto max-h-[90vh] p-6">
  <h2 className="text-xl font-bold text-green-300 mb-4">
    {career} Career Roadmap
  </h2>
          <img
  src={roadmapSrc}
  alt={`${career} Roadmap`}
  className="w-full rounded-xl"
/>

        </div>
      </div>
      
    </div>
    
  )
  
}
function ReviewPopup({ onClose }) {

  const reviewLink = "https://www.google.com/search?newwindow=1&sca_esv=04305cf44267baf0&rlz=1C1CHZN_enIN1082IN1082&sxsrf=ANbL-n7JWdc9uBS5Q0ehVAoKZrHbZg-K1A:1770965796291&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZBwhco5PVqLFrZxhO2-JYkxpYG5o63UrgrbAvhLQ0gPJWe5Bl2h3SjipTKwmsAkQtshLUZ3knp5qrHSUXf_Ebrpryg0&q=Ns3Edu+Reviews&sa=X&ved=2ahUKEwjV4MnZ8dWSAxVNR2wGHWSTJacQ0bkNegQIIhAH&biw=1536&bih=695&dpr=1.25"

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl max-w-md w-full p-7 text-center shadow-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Enjoyed Your Career Report?
        </h2>

        <p className="text-gray-600 mb-5">
          If our Career Diagnosis helped you, please support us with a quick review.
        </p>

        <div className="text-3xl mb-4 text-yellow-400">
          ⭐⭐⭐⭐⭐
        </div>

        <a
          href={reviewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Give a Google Review
        </a>

        <p className="text-xs text-gray-400 mt-4">
          It takes less than 30 seconds 🙌
        </p>

      </div>
    </div>
  )
}

export default Result

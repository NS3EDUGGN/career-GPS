import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import exploreMenuData from "../data/exploreMenuData"
function Navbar() {
 const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = location.pathname.startsWith("/admin")
  const [showExplore, setShowExplore] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [currentTime, setCurrentTime] = useState("")


useEffect(() => {
  const storedUser = localStorage.getItem("user")

  if (storedUser) {
    const parsed = JSON.parse(storedUser)
    setUserEmail(parsed.email)
  } else {
    setUserEmail("")
  }
}, [location])

useEffect(() => {
  if (!isAdmin) return

  const updateClock = () => {
    const now = new Date()

    const time = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    })

    setCurrentTime(time)
  }

  updateClock() // run once immediately

  const interval = setInterval(updateClock, 1000)

  return () => clearInterval(interval)
}, [isAdmin])

useEffect(() => {

  const email = localStorage.getItem("userEmail")
  if (!email) return

  const verifyUser = async () => {
    try {

      const res = await fetch(`http://localhost:5000/api/check-user/${email}`)
      const data = await res.json()

      // USER DELETED BY ADMIN
      if (!data.exists) {

        localStorage.removeItem("userEmail")
        localStorage.removeItem("isLoggedIn")

        alert("Your account has been removed by admin.")

        window.location.href = "/login"
      }

    } catch (err) {
      console.log(err)
    }
  }

  verifyUser()

}, [])


const handleLogout = () => {
  localStorage.clear()
  sessionStorage.clear()
  window.location.href = "/login"
}




   const pathname = location.pathname
const isResult = pathname === "/result"
const isStartTest = pathname === "/start-test"
const isLogin = pathname === "/login"
const isQuiz = pathname.startsWith("/quiz")
const isInstructions = pathname === "/instructions"

const isProtectedPage = isQuiz || isResult || isInstructions


  return (
    <motion.nav initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 120, damping: 16 }} className=" sticky top-0 z-40 backdrop-blur-2xl bg-gradient-to-r from-white/60 via-white/80 to-white/60 border-b border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-visible" >
    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-r from-transparent via-green-200/20 to-transparent"
 animate={{ x: ["-120%", "120%"] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-y-3">


        <Link to="/" className="flex items-center gap-2 group min-w-0">

          <motion.img src="/logo.png" alt="NS3 Logo" className="h-8 w-auto" animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.12, rotate: -3 }} />
          <div className="flex items-baseline gap-1 min-w-0">

            <motion.span className="text-xl sm:text-2xl font-extrabold text-gray-900" whileHover={{ scale: 1.05 }} > NS3 </motion.span>
            <motion.span className="text-xl sm:text-2xl font-extrabold text-[#2F6F6A] relative truncate" whileHover={{ scale: 1.05 }} > Career GPS
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-70" />
            </motion.span>
          </div>
        </Link>

{!isAdmin && (
<div className="hidden md:flex items-center gap-2">

  {/* Home & About */}
  {[
    { name: "Home", path: "/" },
    { name: "About", path: "/diagnosis" }
  ].map(link => {
    const isActive = location.pathname === link.path

    return (
      <motion.div key={link.name} whileHover={{ y: -2 }} className="relative">
        <Link to={link.path}
          className={`px-4 py-2 rounded-full font-medium transition
          ${isActive ? "text-green-700 bg-green-50" : "text-gray-700 hover:bg-green-50"}`}>
          {link.name}
        </Link>
      </motion.div>
    )
  })}

  {/* EXPLORE DROPDOWN */}
<div
  className="relative"
  onMouseEnter={() => setShowExplore(true)}
  onMouseLeave={() => setShowExplore(false)}
>

<button
  onClick={() => setShowExplore(prev => !prev)}
  className="px-4 py-2 rounded-full font-medium text-gray-700 hover:bg-green-50"
>
  Explore ▾
</button>

    {showExplore && (
  <div onMouseLeave={() => setShowExplore(false)}>
    <ExploreDropdown />
  </div>
)}
  </div>

</div>
)}
<div className="flex items-center justify-end gap-2 flex-wrap md:flex-nowrap">
  {/* ADMIN SYSTEM STATUS */}
{isAdmin && (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3
    px-4 py-2
    rounded-full
    bg-gradient-to-r from-emerald-500/15 to-green-500/15
    border border-emerald-400/40
    shadow-[0_0_18px_rgba(16,185,129,0.35)]
    backdrop-blur-md"
  >

    {/* Pulsing dot */}
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
    </span>

    {/* Text */}
    <span className="text-sm font-semibold text-emerald-700">
      System Active
    </span>

    {/* Divider */}
    <span className="text-emerald-500">•</span>

    {/* Live Time */}
    <span className="font-mono text-sm text-gray-800">
      {currentTime}
    </span>

  </motion.div>
)}

  {/* QUIZ PAGE → Email + Logout */}
{isProtectedPage && userEmail && !isAdmin && (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 sm:gap-3"
  >

    {/* EMAIL BADGE */}
    <div className="
      flex items-center gap-2
      px-3 py-1.5
      rounded-full
      bg-white/70
      border border-white/40
      shadow-sm
      text-gray-800
      text-xs sm:text-sm
      max-w-[150px] sm:max-w-[220px]
    ">
      <span className="text-emerald-600 text-sm">✉</span>

      <span className="truncate font-medium">
        {userEmail}
      </span>
    </div>

    {/* LOGOUT BUTTON */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="
        px-4 py-1.5
        rounded-full
        text-xs sm:text-sm
        font-semibold
        text-white
        bg-gradient-to-r from-red-500 to-rose-600
        shadow-md
        whitespace-nowrap
      "
    >
      Logout
    </motion.button>

  </motion.div>
)}

  {/* Register */}
{!isStartTest && !isProtectedPage && !isAdmin && (

    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Link
        to="/start-test"
        className="relative inline-flex items-center justify-center px-7 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 shadow-[0_10px_30px_rgba(16,185,129,0.45)] overflow-hidden"
      >
        {/* effects */}
        <span className="relative z-10 tracking-wide">Register</span>
      </Link>
    </motion.div>
  )}

{/* Login */}
{!isLogin && !isProtectedPage && !isAdmin && (

    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Link
        to="/login"
        className="relative inline-flex items-center justify-center px-7 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 shadow-[0_10px_30px_rgba(6,182,212,0.45)] overflow-hidden"
      >
        {/* effects */}
        <span className="relative z-10 tracking-wide">Login</span>
      </Link>
    </motion.div>
  )}

</div>


      </div>
    </motion.nav>
  )
}
export default Navbar

function ExploreDropdown() {
  return (
    <div className="fixed left-0 top-[78px] w-full bg-white shadow-2xl border-t border-gray-200 z-40">



      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">


        {/* Career Domains */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Explore Career Domains
          </h2>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
            {exploreMenuData.careers.map((career, index) => (
              <div key={index}>
                <h3 className="font-semibold text-[#2F6F6A]">
                  {career.title}
                </h3>

                <ul className="text-sm text-gray-600 ml-2 mt-1 space-y-1">
                  {career.roles.map((role, i) => (
                    <li key={i}>
                     
                      <Link
                        className="hover:text-[#2F6F6A]"
                      >
                        {role}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* What user gets */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Your Report Includes
          </h2>

          <ul className="space-y-3 text-gray-600 text-sm">
            <li>✔ Career suitability score</li>
            <li>✔ Personality type</li>
            <li>✔ Best matched domain</li>
            <li>✔ Learning roadmap</li>
            <li>✔ Required skills</li>
            <li>✔ Strength & weakness analysis</li>
            <li>✔ Future demand prediction</li>
            <li>✔ Recommended career path</li>
          </ul>
        </div>

        {/* Trending Skills */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Trending Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {exploreMenuData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-green-100 cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}


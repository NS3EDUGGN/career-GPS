import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import exploreMenuData from "../data/exploreMenuData"
function Navbar() {
 const navigate = useNavigate()
  const location = useLocation()
  const [showExplore, setShowExplore] = useState(false)
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"))


 useEffect(() => {
  setUserEmail(localStorage.getItem("userEmail"))
}, [location])

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
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2 group">
          <motion.img src="/logo.png" alt="NS3 Logo" className="h-8 w-auto" animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.12, rotate: -3 }} />
          <div className="flex items-baseline gap-1">
            <motion.span className="text-xl sm:text-2xl font-extrabold text-gray-900" whileHover={{ scale: 1.05 }} > NS3 </motion.span>
            <motion.span className="text-xl sm:text-2xl font-extrabold text-[#2F6F6A] relative" whileHover={{ scale: 1.05 }} > Career GPS
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-70" />
            </motion.span>
          </div>
        </Link>

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

<div className="flex items-center gap-3">
  {/* QUIZ PAGE → Email + Logout */}
{isProtectedPage && userEmail && (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3"
  >
    <span className="px-4 py-2 rounded-xl bg-white/70 text-gray-800 font-semibold shadow">
      {userEmail}
    </span>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl font-semibold text-white
                 bg-gradient-to-r from-red-500 to-rose-600
                 shadow-[0_8px_25px_rgba(239,68,68,0.45)]"
    >
      Logout
    </motion.button>
  </motion.div>
)}

  {/* Register */}
  {!isStartTest && !isProtectedPage && (

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
  {!isLogin && !isProtectedPage && (

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


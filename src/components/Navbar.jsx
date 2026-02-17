import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import exploreMenuData from "../data/exploreMenuData"

function Navbar() {

  const location = useLocation()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"))

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"))
  }, [location])

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/"
  }

  // route checks
  const pathname = location.pathname
  const isResult = pathname === "/result"
  const isStartTest = pathname === "/start-test"
  const isLogin = pathname === "/login"
  const isQuiz = pathname.startsWith("/quiz")
  const isInstructions = pathname === "/instructions"
  const isProtectedPage = isQuiz || isResult || isInstructions

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="sticky top-0 z-[999] bg-white/80 backdrop-blur-xl border-b shadow-sm relative"
      >

        {/* NAV CONTENT */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="NS3 Logo" className="h-8"/>
            <span className="text-xl sm:text-2xl font-extrabold text-[#2F6F6A]">
              NS3 Career GPS
            </span>
          </Link>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-2">

            <Link to="/" className="px-4 py-2 rounded-full hover:bg-green-50">
              Home
            </Link>

            <Link to="/diagnosis" className="px-4 py-2 rounded-full hover:bg-green-50">
              About
            </Link>

            {/* EXPLORE BUTTON */}
            <div
              className="py-2"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="px-4 py-2 rounded-full hover:bg-green-50">
                Explore ▾
              </button>
            </div>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="hidden md:flex items-center gap-3">

            {isProtectedPage && userEmail && (
              <>
                <span className="px-4 py-2 bg-gray-100 rounded-xl font-semibold">
                  {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl"
                >
                  Logout
                </button>
              </>
            )}

            {!isStartTest && !isProtectedPage && (
              <Link
                to="/start-test"
                className="px-6 py-3 rounded-xl text-white bg-green-500"
              >
                Register
              </Link>
            )}

            {!isLogin && !isProtectedPage && (
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl text-white bg-teal-500"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* ====== MEGA MENU DROPDOWN (FIXED LOCATION) ====== */}
        {dropdownOpen && (
          <div
            className="absolute left-0 top-full w-full bg-white border-t shadow-xl"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <ExploreDropdown />
          </div>
        )}
      </motion.nav>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="fixed right-0 top-0 h-full w-72 bg-white p-6 flex flex-col gap-4">
            <button className="self-end text-2xl" onClick={() => setMobileOpen(false)}>✕</button>
            <Link to="/" onClick={()=>setMobileOpen(false)}>Home</Link>
            <Link to="/diagnosis" onClick={()=>setMobileOpen(false)}>About</Link>
            <Link to="/start-test" onClick={()=>setMobileOpen(false)}>Register</Link>
            <Link to="/login" onClick={()=>setMobileOpen(false)}>Login</Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar


/* ---------- DROPDOWN CONTENT ---------- */

function ExploreDropdown() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

      {/* Career Domains */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Explore Career Domains</h2>
        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
          {exploreMenuData.careers.map((career, index) => (
            <div key={index}>
              <h3 className="font-semibold text-[#2F6F6A]">{career.title}</h3>
              <ul className="text-sm text-gray-600 ml-2 mt-1 space-y-1">
                {career.roles.map((role, i) => (
                  <li key={i} className="hover:text-[#2F6F6A] cursor-pointer">{role}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Report */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Report Includes</h2>
        <ul className="space-y-2 text-gray-600 text-sm">
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

      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Trending Skills</h2>
        <div className="flex flex-wrap gap-2">
          {exploreMenuData.skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-green-100 cursor-pointer">
              {skill}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

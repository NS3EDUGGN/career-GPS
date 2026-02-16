import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

 const handleLogin = async (e) => {
  e.preventDefault()

  // 🔥 clear previous session
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userEmail")
  sessionStorage.clear()

  setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        alert("Incorrect credentials, try again")
        setLoading(false)
        return
      }

      const data = await res.json()
localStorage.setItem("isLoggedIn", "true")
localStorage.setItem("userEmail", data.email || email)


      setLoading(false)
      navigate("/instructions")
    } catch (err) {
      alert("Something went wrong")
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 px-4">

      {/* floating background blobs */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-300/30 rounded-full blur-3xl -top-40 -left-40 animate-pulse"></div>
      <div className="absolute w-[450px] h-[450px] bg-teal-300/30 rounded-full blur-3xl -bottom-40 -right-40 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-green-200/40 rounded-full blur-3xl top-20 right-10 animate-pulse"></div>

      {/* glass card */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-10">

        {/* logo circle */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">CG</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Login to continue your career diagnosis
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all shadow-sm"
            />
          </div>

          {/* password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all shadow-sm"
            />
          </div>

          {/* button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-[1.03] hover:shadow-emerald-300/40 hover:shadow-xl"
            }`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login & Start Quiz"
            )}
          </button>

        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          🔒 Your credentials are securely verified
        </p>

      </div>
    </section>
  )
}

export default Login

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminLogin() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [show,setShow] = useState(false)

  const navigate = useNavigate()

  const handleLogin = (e)=>{
    e.preventDefault()

    if(email === "admin@ns3edu.com" && password === "admin123"){
      localStorage.setItem("adminAuth","true")
      navigate("/admin/dashboard")
    }else{
      setError("Invalid admin credentials")
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden
      bg-gradient-to-br from-[#021a12] via-[#063d2b] to-[#0b5e3f]">

      {/* ambient glow effects */}
      <div className="absolute w-96 h-96 bg-emerald-400/20 rounded-full blur-[140px] top-[-80px] left-[-80px]"></div>
      <div className="absolute w-96 h-96 bg-green-300/20 rounded-full blur-[140px] bottom-[-80px] right-[-80px]"></div>

      {/* glass card */}
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20
        shadow-[0_0_60px_rgba(0,255,170,0.15)]
        rounded-3xl p-10 w-[390px] relative">

        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-200 tracking-wide">
            Career Admin Portal
          </h1>
          <p className="text-emerald-100/70 text-sm mt-2">
            Authorized counsellor access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL FLOATING INPUT */}
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 rounded-xl
              bg-white/5 border border-emerald-200/20
              text-emerald-100 placeholder-transparent
              focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/40 transition"
              placeholder="Email"
            />
            <label
              className="absolute left-4 top-2 text-xs text-emerald-200/70
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
              peer-placeholder-shown:text-emerald-200/50
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-300
              transition-all"
            >
              Admin Email
            </label>
          </div>

          {/* PASSWORD FLOATING INPUT */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 rounded-xl
              bg-white/5 border border-emerald-200/20
              text-emerald-100 placeholder-transparent
              focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-400/40 transition pr-12"
              placeholder="Password"
            />
            <label
              className="absolute left-4 top-2 text-xs text-emerald-200/70
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
              peer-placeholder-shown:text-emerald-200/50
              peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-300
              transition-all"
            >
              Password
            </label>

            {/* show/hide */}
            <span
              onClick={()=>setShow(!show)}
              className="absolute right-4 top-4 text-emerald-200/70 cursor-pointer hover:text-emerald-100"
            >
              {show ? "🙈" : "👁"}
            </span>
          </div>

          {/* error */}
          {error && (
            <p className="text-red-300 text-sm text-center -mt-3">
              {error}
            </p>
          )}

          {/* button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold tracking-wide
            bg-gradient-to-r from-emerald-400 to-green-500
            text-[#01241a]
            hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]
            transition duration-300"
          >
            Access Dashboard
          </button>

        </form>

        {/* footer */}
        <p className="text-center text-xs text-emerald-100/60 mt-7">
          Career Diagnosis Management System
        </p>

      </div>

    </div>
  )
}

export default AdminLogin

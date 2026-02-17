import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function StartTestForm() {

  const navigate = useNavigate()

  // form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState("")
  useEffect(() => {
  if (interest !== "Others") {
    setOtherInterest("")
  }
}, [interest])
  const [otherInterest, setOtherInterest] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      // 1️⃣ REGISTER USER → MongoDB + Google Sheet
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          interest,
          other_interest: otherInterest
        })
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.message)
        setLoading(false)
        return
      }

      // 2️⃣ SEND EMAIL → EmailJS via Vercel backend
      await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          interest,
          other_interest: otherInterest
        })
      })

      alert("Account created successfully")
      navigate("/login")

    } catch (err) {
      console.log(err)
      alert("Server error. Please try again.")
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 px-4 pt-24 pb-12">

      <div className="relative w-full max-w-2xl backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-10">

        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Start Your Career Diagnosis
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Tell us a little about yourself before we begin
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          {/* PHONE */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          {/* INTEREST */}
          <select
            value={interest}
            onChange={(e)=>setInterest(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
          >
            <option value="">Select Primary Interest</option>
            <option>Software Development</option>
            <option>Cloud / DevOps</option>
            <option>Networking</option>
            <option>Cybersecurity</option>
            <option>Data / Analytics</option>
            <option>AI ML</option>
            <option>Others</option>
          </select>

          {/* OTHER INTEREST */}
          {interest === "Others" && (
            <input
              type="text"
              placeholder="Please specify your interest"
              value={otherInterest}
              onChange={(e)=>setOtherInterest(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
          >
            {loading ? "Creating account..." : "Create Account & Continue"}
          </button>

        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </section>
  )
}

export default StartTestForm


import { useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function StartTestForm() {

  const formRef = useRef()
  const navigate = useNavigate()
  const [interest, setInterest] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)

    try {

      // 1️⃣ REGISTER USER (MongoDB)
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          interest: data.interest,
          other_interest: data.other_interest
        })
      })

      const result = await res.json()

      if (!res.ok) {
        alert(result.message)
        setLoading(false)
        return
      }

      // 2️⃣ SEND EMAIL (EmailJS through Vercel backend)
      await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          interest: data.interest
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 px-4 pt-24 pb-12">

      {/* background blobs */}
      <div className="absolute w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-3xl -left-40 top-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl -right-40 bottom-0"></div>
      <div className="absolute w-[300px] h-[300px] bg-green-300/30 rounded-full blur-3xl right-1/3 -top-20"></div>

      <div className="relative w-full max-w-2xl backdrop-blur-xl bg-white/65 border border-white/40 rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center mb-6">
          <div className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-md">
            Career Diagnosis Registration
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Start Your Career Diagnosis
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Tell us a little about yourself before we begin
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            required
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-emerald-400 outline-none"
          />

          <select
            name="interest"
            required
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-emerald-400 outline-none"
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

          {interest === "Others" && (
            <input
              type="text"
              name="other_interest"
              placeholder="Please specify your interest"
              required
              className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-emerald-400 outline-none"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
          >
            {loading ? "Creating account..." : "Create Account & Continue"}
          </button>

        </form>

        <p className="text-xs text-gray-500 text-center mt-5">
          🔒 Your information is safe and used only for career guidance
        </p>

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

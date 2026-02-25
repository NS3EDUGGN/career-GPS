import { useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import emailjs from "@emailjs/browser"

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

  // ---------- PASSWORD VALIDATION ----------
  const password = data.password.trim()

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/

  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
    )
    setLoading(false)
    return
  }
  // ----------------------------------------

  // remove password from lead data
  const { password: _, ...leadData } = data

  try {

    // 1️⃣ Save lead (NO PASSWORD)
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    })

    formRef.current.password.value = ""

    {/* 
    if (emailjs?.sendForm) {
      await emailjs.sendForm(
        "service_zoq17qo",
        "template_aes52t8",
        formRef.current,
        "g47AuvieCWG4013xG"
      )
    }
    */}

    // 2️⃣ Register account
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: password,
      }),
    })

    const result = await res.json()

    if (!res.ok) {
      alert(result.message || "Registration failed")
      setLoading(false)
      return
    }

    // 👉 SEND EMAIL HERE
await fetch("/api/sendMail", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: data.name,
    email: data.email,
    phone: data.phone,
    college: data.college,
    course: data.course,
    year: data.year
  })
});
    
    localStorage.setItem("userData", JSON.stringify(data))
    localStorage.setItem("studentProfile", JSON.stringify({
  name: data.name,
  email: data.email,
  phone: data.phone,
  college: data.college,
  course: data.course,
  year: data.year
}))
    navigate("/login")

  } catch (err) {
    console.error(err)
    alert("Server error. Please try again.")
    setLoading(false)
  }
}
  return (
   <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 px-4 pt-24 pb-12">


      {/* soft floating background */}
      <div className="absolute w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-3xl -left-40 top-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl -right-40 bottom-0"></div>
      <div className="absolute w-[300px] h-[300px] bg-green-300/30 rounded-full blur-3xl right-1/3 -top-20"></div>

      {/* onboarding card */}
      <div className="relative w-full max-w-2xl backdrop-blur-xl bg-white/65 border border-white/40 rounded-3xl shadow-2xl p-10">

        {/* top badge */}
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
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition shadow-sm"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition shadow-sm"
          />

<input
  type="password"
  name="password"
  placeholder="Create Password"
  required
  minLength={8}
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$"
  title="Password must be at least 8 characters and include uppercase, lowercase, number and special character"
  className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition shadow-sm"
/>

<input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  required
  maxLength={10}
  inputMode="numeric"
  pattern="[6-9]{1}[0-9]{9}"
  title="Enter a valid 10 digit Indian mobile number (starts with 6-9)"
  onInput={(e) => {
    e.target.value = e.target.value.replace(/\D/g, "")
  }}
  className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition shadow-sm"
/>

{/* COLLEGE NAME */}
<input
  type="text"
  name="college"
  placeholder="College Name"
  required
  className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400"
/>

{/* COURSE */}
<input
  type="text"
  name="course"
  placeholder="Course (BCA, BTech, MCA...)"
  required
  className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400"
/>

{/* YEAR */}
<select
  name="year"
  required
  className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400"
>
  <option value="">Select Current Year</option>
  <option>1st Year</option>
  <option>2nd Year</option>
  <option>3rd Year</option>
  <option>4th Year</option>
  <option>Passout</option>
</select>

{/* 

          <select
            name="interest"
            required
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none text-gray-700 shadow-sm"
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
              className="w-full p-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition shadow-sm"
            />
            
          )}
*/}
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
                Creating account...
              </>
            ) : (
              "Create Account & Continue"
            )}
          </button>

        </form>

        <p className="text-xs text-gray-500 text-center mt-5">
          🔒 Your information is safe and used only for career guidance
        </p>
        <div className="text-center mt-4">
  <p className="text-sm text-gray-600">
    Already have an account?{" "}
    <Link
      to="/login"
      className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition"
    >
      Login here
    </Link>
  </p>
</div>

      </div>
    </section>
  )
}

export default StartTestForm



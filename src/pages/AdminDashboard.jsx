import { useEffect, useState } from "react"

function AdminDashboard(){

  const [students,setStudents] = useState([])
  const [search,setSearch] = useState("")
  const [openMenu,setOpenMenu] = useState(false)
  const [selectedStudent,setSelectedStudent] = useState(null)

  // protect page
  useEffect(()=>{
    if(localStorage.getItem("adminAuth") !== "true"){
      window.location.href="/admin"
      return
    }
    loadStudents()
  },[])
  useEffect(()=>{
  const handleClickOutside = (e)=>{
    if(!e.target.closest(".relative")){
      setOpenMenu(false)
    }
  }

  document.addEventListener("click",handleClickOutside)
  return ()=>document.removeEventListener("click",handleClickOutside)
},[])

const loadStudents = ()=>{
  fetch("http://localhost:5000/api/results")
    .then(res=>res.json())
    .then(data=>setStudents(data))
}
 const toggleContacted = async(id)=>{
  try{
    await fetch(`http://localhost:5000/api/contacted/${id}`,{
      method:"PUT"
    })
    loadStudents()
  }catch(err){
    console.log(err)
    alert("Failed to update status")
  }
}

  // delete student
  const deleteStudent = async (id, name) => {

  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${name}? This cannot be undone.`
  )
  if (!confirmDelete) return

  try {

    const res = await fetch(`http://localhost:5000/api/student/${id}`, {
      method: "DELETE"
    })

    const data = await res.json()
    console.log("Delete response:", data)

    loadStudents()

  } catch (err) {
    console.log(err)
    alert("Failed to delete student")
  }
}
  // whatsapp
const openWhatsApp = (phone,name)=>{

  if(!phone){
    alert("Student phone number not available")
    return
  }

  // 1. remove spaces, +, -, ()
  let cleanPhone = phone.toString().replace(/\D/g,'')

  // 2. remove leading 0 (Indian numbers)
  if(cleanPhone.length === 11 && cleanPhone.startsWith("0")){
    cleanPhone = cleanPhone.substring(1)
  }

  // 3. add India country code if missing
  if(cleanPhone.length === 10){
    cleanPhone = "91" + cleanPhone
  }

  // 4. final safety check
  if(cleanPhone.length < 12){
    alert("Invalid phone number saved for this student")
    return
  }

  const message =
    `Hello ${name}, I am contacting you regarding your Career Test Result and counselling session from NS3 Career GPS.`

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`

  window.open(url, "_blank")
}

const filtered = students.filter((s) => {
  const query = search.toLowerCase().trim()

  return (
    s.name?.toLowerCase().includes(query) ||
    s.college?.toLowerCase().includes(query) ||
     s.course?.toLowerCase().includes(query) ||
    s.email?.toLowerCase().includes(query)
  )
})

  const total = students.length
  const contacted = students.filter(s=>s.contacted).length
  const pending = total - contacted

return(
  <>
  <div className="min-h-screen bg-gradient-to-br from-[#02120e] via-[#041f18] to-[#010807] text-white p-6 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

        <div>
<h1 className="flex items-center gap-3 text-4xl font-bold">
  <span className="bg-gradient-to-r from-emerald-300 to-green-500 bg-clip-text text-transparent">
    Welcome Admin
  </span>

  <span className="wave-hand">👋</span>
</h1>
          <p className="text-emerald-400/70 text-sm mt-1">
            NS3 Career GPS Admin Panel
          </p>
        </div>

<div className="relative">

  {/* Avatar */}
  <div
    onClick={()=>setOpenMenu(!openMenu)}
    className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-green-600
    flex items-center justify-center text-lg font-bold cursor-pointer
    shadow-lg hover:scale-105 transition select-none"
  >
    A

    {/* Online dot */}
    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-[#02120e] rounded-full"></span>
  </div>

  {/* Dropdown */}
  {openMenu && (
    <div className="absolute right-0 mt-3 w-44 rounded-2xl
    bg-[#0b1f1a] border border-emerald-400/20 shadow-2xl overflow-hidden z-50">

      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-sm text-emerald-300 font-semibold">Admin</p>
        <p className="text-xs text-emerald-400/60">Administrator</p>
      </div>

      <button
        onClick={()=>{
          localStorage.removeItem("adminAuth")
          window.location.href="/admin"
        }}
        className="w-full text-left px-4 py-3 text-red-300 hover:bg-red-500/10 transition"
      >
        Logout
      </button>

    </div>
  )}

</div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <StatCard title="Total Students" value={total} color="emerald" />
        <StatCard title="Contacted" value={contacted} color="green" />
        <StatCard title="Pending" value={pending} color="yellow" />

      </div>

      {/* SEARCH BAR */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by Name,Email,College or Course..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full px-5 py-4 rounded-2xl 
          bg-white/5 backdrop-blur-xl
          border border-emerald-400/20
          focus:outline-none focus:ring-2 focus:ring-emerald-400
          placeholder:text-emerald-200/40"
        />
      </div>

      {/* TABLE */}
      <div className="rounded-3xl border border-emerald-400/20 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">

        <div className="overflow-x-auto">
<table className="w-full text-left min-w-[1300px]">

            <thead className="bg-white/10 text-emerald-300 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-5">Student</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Career</th>
                <th>College</th>
                <th>Year</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s)=>(
                <tr
                  key={s._id}
                  className="border-t border-white/10 hover:bg-emerald-400/5 transition"
                >

                  <td className="p-5 font-semibold text-emerald-200">
                    {s.name}
                  </td>

                  <td className="text-emerald-100/80">{s.email}</td>

                  <td className="text-emerald-100/80">{s.phone}</td>

<td className="text-emerald-300 font-medium">
  {s.topCareer}
</td>

<td className="text-emerald-100/80">
  {s.college || "-"}
</td>

<td className="text-emerald-100/80">
  {s.year || "-"}
</td>

<td className="text-emerald-100/80">
  {s.course || "-"}
</td>

<td className="text-emerald-100/70">
  {new Date(s.attemptDate).toLocaleDateString()}
</td>

                  {/* STATUS */}
                  <td>
                    {s.contacted ? (
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-400/30">
                        Contacted
                      </span>
                    ) : (
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={()=>openWhatsApp(s.phone,s.name)}
                        className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-400/40 hover:bg-green-500/40 transition text-sm"
                      >
                        WhatsApp
                      </button>

{s.contacted ? (
  <button
    onClick={()=>toggleContacted(s._id)}
    className="px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-400/40 hover:bg-yellow-500/40 transition text-sm"
  >
    Mark Pending
  </button>
) : (
  <button
    onClick={()=>toggleContacted(s._id)}
    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 hover:bg-emerald-500/40 transition text-sm"
  >
    Mark Contacted
  </button>
)}
<button
  onClick={()=>setSelectedStudent(s)}
  className="px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/40 hover:bg-indigo-500/40 transition text-sm"
>
  View Report
</button>

                      <button
                        onClick={()=>deleteStudent(s._id,s.name)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-400/40 hover:bg-red-500/40 transition text-sm"
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
            </div>
    </div>

    {/* ================= REPORT MODAL ================= */}
    {selectedStudent && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">

        <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#071914] border border-emerald-400/30 p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-300">
                Full Quiz Report
              </h2>
              <p className="text-emerald-400/70 text-sm">
                {selectedStudent.name} • {selectedStudent.topCareer}
              </p>
            </div>

            <button
              onClick={()=>setSelectedStudent(null)}
              className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-400/40 hover:bg-red-500/40"
            >
              Close
            </button>
          </div>

          {/* Answers */}
          {!selectedStudent.answers || selectedStudent.answers.length === 0 ? (
            <p className="text-yellow-300">No answers stored.</p>
          ) : (
            selectedStudent.answers.map((ans,index)=>(
              <div key={index} className="mb-5 p-4 rounded-xl bg-white/5 border border-emerald-400/20">
                <p className="font-semibold text-white mb-2">
                  Q{index+1}. {ans.question}
                </p>

                <p className="text-emerald-300">
                  ✔ Selected: {ans.selected}
                </p>

<p className="text-cyan-300 text-sm mt-1">
  Career Mapping:
  {typeof ans.career === "string"
    ? ans.career
    : ans.career
      ? Object.keys(ans.career).join(", ")
      : "General"}
</p>
<p className="text-emerald-400/60 text-xs mt-1">
  Score:
  {ans.score && typeof ans.score === "object"
    ? Object.entries(ans.score).map(([k,v]) => ` ${k}:${v}`).join(", ")
    : " 0"}
</p>
              </div>
            ))
          )}

        </div>
      </div>
    )}
</>
  )
}  

/* STAT CARD COMPONENT */
function StatCard({title,value,color}){

  const colorMap={
    emerald:"from-emerald-400/20 to-emerald-700/10 border-emerald-400/30 text-emerald-300",
    green:"from-green-400/20 to-green-700/10 border-green-400/30 text-green-300",
    yellow:"from-yellow-400/20 to-yellow-700/10 border-yellow-400/30 text-yellow-300"
  }

  return(
    <div className={`rounded-3xl p-6 backdrop-blur-xl bg-gradient-to-br ${colorMap[color]} border shadow-xl`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
     
    </div>
    
  )
}

export default AdminDashboard
import { useNavigate } from "react-router-dom"
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function Home() {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.45
  });
  const statVariants = {
  hidden: { opacity: 0, y: 70, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.18,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};
  const navigate = useNavigate()

  return (

<div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-6">
  <img src="/logo(1).png" alt="Logo" className="h-12 w-auto mx-auto" />
      <section className="max-w-7xl mx-auto px-6 py-7 text-center">
        <h3 className="text-4xl md:text-4xl font-bold text-gray-900">Discover Your <span className="text-[#2F6F6A]">Perfect IT Career With NS3 Career GPS</span></h3>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Confused between Development, Cloud, Networking, Cybersecurity or Data roles?
          Take NS3Edu’s Career Diagnostic Test and get a clear career direction.
        </p>

        <button onClick={() => navigate("/start-test")}
          className="mt-8 px-8 py-4 bg-green-800 text-white rounded-lg text-lg font-semibold hover:bg-indigo-500  transition">Start Free Career Diagnosis
        </button>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900">How It Works </h2>
            <p className="mt-3 text-center text-gray-600">A simple 4-step journey to discover the career that truly fits you</p>
            
            <div className="mt-14 grid gap-8 md:grid-cols-4">
                {[
                    {step: "01", title: "Answer Smart Questions", desc: "Interest, role preference, tools, and real-world problem-solving questions",icon: "📝"},
                    {step: "02",title: "Career Fit Analysis", desc: "Your responses are scored and mapped to suitable tech career paths",icon: "📊"},
                    {step: "03",title: "Personalized Career Roadmap", desc: "Get a clear learning roadmap aligned with your best-fit career",icon: "🧭"},
                    {step: "04",title: "Skill Gap & Growth Report",desc: "Understand your strengths, improvement areas, and next learning steps",icon: "📄"}
                ].map((item, index) => (
                <div key={index} className="group relative p-8 bg-white rounded-2xl border hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                    <span className="absolute top-4 right-5 text-sm font-bold text-gray-300">{item.step} </span>
                     <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#2F6F6A]/10 text-2xl group-hover:bg-[#2F6F6A] group-hover:text-white transition">{item.icon}</div>
                     <h3 className="mt-5 text-xl font-semibold text-[#2F6F6A] text-center">{item.title}</h3>
                     <p className="mt-3 text-gray-600 text-center text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
            </div>
            </div>
            </section>

            
<section className="stats-section">
  <div ref={ref} className="stats-wrapper">

    <div className="stats-container">

      {/* Tests Taken */}
      <motion.div
        className="stat-box"
        variants={statVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
      >
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {inView && <CountUp start={0} end={1500} duration={2.4} separator="," />}+
        </motion.h2>
        <p>Career Tests Taken</p>
      </motion.div>

      {/* Domains */}
      <motion.div
        className="stat-box"
        variants={statVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={1}
      >
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          {inView && <CountUp start={0} end={9} duration={2.2} />}
        </motion.h2>
        <p>Career Fields Evaluated</p>
      </motion.div>

      {/* Accuracy */}
      <motion.div
        className="stat-box"
        variants={statVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={2}
      >
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {inView && <CountUp start={0} end={94} duration={2.4} />}%
        </motion.h2>
        <p>Recommendation Accuracy</p>
      </motion.div>

      {/* Roles */}
      <motion.div
        className="stat-box"
        variants={statVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={3}
      >
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          {inView && <CountUp start={0} end={98} duration={2.4} />}%+
        </motion.h2>
        <p>Students Become Job-Ready</p>
      </motion.div>

    </div>

  </div>
</section>



            <section className="py-20 bg-[#F4FBF9]">
                <div className="max-w-5xl mx-auto px-6">
                    
                    <h2 className="text-4xl font-bold text-center text-gray-900">Who Should Take This Test?</h2>
                    <p className="mt-3 text-center text-gray-600">Find out if this career diagnosis is right for you</p>
                    <div className="mt-16 space-y-10">
                        {[{title: "Students confused about IT careers",icon: "🎓"},
                        {title: "Freshers & Graduates",icon: "📘"},
                        {title: "Career Switchers",icon: "🔄"},
                        {title: "Internship Seekers",icon: "💼"},
                    ].map((item, index) => (
                    <div key={index} className={`flex items-center gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition ${index % 2 === 0 ? "md:ml-20" : "md:mr-20"}`}>
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#2F6F6A] text-white text-2xl">{item.icon}</div>
                        <p className="text-lg font-medium text-gray-800">{item.title}</p></div>
                    ))}
                    </div>
                </div>
            </section>
            
            <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900">Why NS3EDU?</h2>
                    <p className="mt-3 text-gray-600">Built to make you industry-ready, not just certified</p>
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                        <div className="space-y-10">
                            {["Industry-oriented IT Training","Real-time project exposure",
                            ].map((item, index) => (
                            <div key={index} className="flex items-center gap-4 justify-end md:justify-start">
                                <span className="w-3 h-3 rounded-full bg-[#2F6F6A]" />
                                <p className="text-lg font-semibold text-gray-800">{item}</p>
                            </div>
                         ))}
                        </div>
                        
                        <div className="relative">
                            <div className="mx-auto w-40 h-40 rounded-full bg-[#2F6F6A]/10 flex items-center justify-center">
                            <span className="text-3xl font-bold text-[#2F6F6A]">NS3EDU</span>
                            </div>
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2F6F6A]/40 animate-spin-slow" />
                            </div>
                            
                            <div className="space-y-10">
                                {["Placement & internship focused","Hands-on learning",
                                ].map((item, index) => (
                                <div key={index} className="flex items-center gap-4 justify-start">
                                    <span className="w-3 h-3 rounded-full bg-[#2F6F6A]" />
                                    <p className="text-lg font-semibold text-gray-800">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="w-full bg-black">
                <div className="w-full aspect-video">
                    <iframe className="w-full h-full" src="https://youtu.be/MyPWI31hk_8?si=Lxa5DB9fFjQb_Urv" title="NS3 Career GPS Overview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </section>


      <section className="py-20 bg-[#2F6F6A] text-white text-center">
        <h2 className="text-3xl font-bold">Still Confused About Your Career?</h2>

        <p className="mt-4 text-lg opacity-90">Take the test and get clarity in Within Minutes.</p>

        <button onClick={() => navigate("/start-test")}
          className="mt-8 px-10 py-4 bg-black text-white-600 rounded-lg font-semibold hover:bg-cyan-800 transition">Start Career Diagnosis Now
        </button>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p className="text-sm"> © {new Date().getFullYear()} NS3Edu. All rights reserved.</p>
      </footer>

    </div>
    
  )
}
export default Home



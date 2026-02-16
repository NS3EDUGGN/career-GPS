import { useNavigate } from "react-router-dom"
import { Briefcase, Brain, BarChart3, Target, CheckCircle, Cpu, Users, ClipboardCheck, LineChart, Star} from "lucide-react"
function ReasonCard({ number, title, text }) {
  return (
    <div className="group bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative">
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 text-white flex items-center justify-center font-bold text-lg shadow">{number}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-green-500 to-emerald-400 group-hover:w-full transition-all duration-300 rounded-b-3xl" /></div>
  )
}
function ReviewCard({ name, text }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">

      {/* Stars */}
      <div className="flex gap-1 text-yellow-400 mb-3">
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        "{text}"
      </p>

      {/* Name */}
      <p className="font-semibold text-gray-800">
        {name}
      </p>

    </div>
  )
}

function MethodCard({ icon, title, text }) {
  return (
    <div className="group bg-gray-50 p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
      
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 text-white flex items-center justify-center text-2xl group-hover:scale-110 transition">
        {icon}
      </div>

      <h3 className="font-semibold text-lg text-gray-800 mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {text}
      </p>

    </div>
  )
}


function Diagnosis() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Career Diagnosis Program</h1>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto">Find your ideal career path through a structured assessment of interests, thinking patterns, and practical technology scenarios designed for students.</p>
          <button onClick={() => navigate("/start-test")} className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">Start Career Diagnosis</button>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">What is Career Diagnosis?</h2>
            <p className="text-gray-600 leading-relaxed">Career Diagnosis is a smart assessment system that evaluates a student’s strengths, interests, and thinking style to recommend the most suitable career options.</p>
            <p className="text-gray-600 leading-relaxed">Instead of guessing or following trends, this portal provides data-driven career suggestions based on your responses.</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Feature icon={<Brain />} text="Aptitude Analysis" />
            <Feature icon={<Target />} text="Interest Mapping" />
            <Feature icon={<BarChart3 />} text="Skill Evaluation" />
            <Feature icon={<Briefcase />} text="Career Matching" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Step number="01" title="Start Test" desc="Begin the diagnosis by answering carefully designed questions."/>
            <Step number="02" title="Answer MCQs" desc="Questions assess aptitude, logic, interest, and preferences."/>
            <Step number="03" title="Smart Analysis" desc="Your responses are scored and analyzed intelligently."/>
            <Step number="04" title="Career Result" desc="Get your best-fit career with detailed breakdown."/>
          </div>
        </div>
      </section>

      {/* ================= METHODOLOGY SECTION ================= */}

<section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        Our Assessment Methodology
      </h2>

      <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
        This career diagnosis is not a random quiz. The questionnaire is structured using
        psychometric evaluation principles and developed after consulting career counselors
        and psychology-based assessment frameworks.  
        AI-assisted algorithms analyze response patterns, consistency, and behavioral indicators
        to identify career domains where a student is naturally more likely to succeed and stay satisfied.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <MethodCard
        icon={<ClipboardCheck />}
        title="Psychology-Based Questions"
        text="Questions are designed around aptitude, interest patterns, and personality indicators used in student assessment frameworks."
      />

      <MethodCard
        icon={<Users />}
        title="Counselor Consultation"
        text="The structure of the test is aligned with guidance approaches followed by career counselors and student advisors."
      />

      <MethodCard
        icon={<Cpu />}
        title="AI Response Analysis"
        text="AI algorithms detect answer patterns, remove random guessing bias, and evaluate consistency across multiple sections."
      />

      <MethodCard
        icon={<LineChart />}
        title="Career Matching Engine"
        text="Your profile is mapped with career pathways to suggest fields where performance potential and satisfaction probability are higher."
      />

    </div>

    {/* Trust Line */}
    <div className="mt-14 bg-green-50 border border-green-100 p-6 rounded-2xl text-center">
      <p className="text-green-700 font-medium">
        Prepared using AI-assisted analysis and psychology-based evaluation methods
      </p>
    </div>

    {/* ================= STUDENT REVIEWS ================= */}

<div className="mt-20">
  <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
    What Students Say
  </h3>

  <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
    Real feedback from students who used the career diagnosis to choose their path.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    <ReviewCard
      name="Rohan Sharma"
      text="I was confused between Web Development and Cyber Security. After this test I got clear direction and now I am confidently learning networking."
    />

    <ReviewCard
      name="Priya Verma"
      text="Best career predictor tool. The questions actually understood my interest and suggested Digital Marketing which I really enjoy now."
    />

    <ReviewCard
      name="Aditya Singh"
      text="Previously I had no idea what to choose after 12th. The report explained my strengths and helped me decide my career path."
    />

    <ReviewCard
      name="Neha Gupta"
      text="Very accurate assessment. It suggested Web Development and I realized that matches my creativity and thinking style."
    />

    <ReviewCard
      name="Kunal Mehta"
      text="Not like random internet quizzes. This actually analyzed my answers and gave proper career explanation."
    />

    <ReviewCard
      name="Sakshi Jain"
      text="My parents also trusted the result because it showed skill analysis. It removed a lot of confusion."
    />

  </div>
</div>


  </div>
</section>

      
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">How We Discover Your Design Potential</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Our assessment evaluates your creativity, thinking style, and design preferences 
                to help you find the design role that fits you best.
            </p>

    <div className="grid md:grid-cols-3 gap-8">
      <AnalysisCard title="Creative Interest" desc="What excites you most—designing interfaces, improving user experience, visual storytelling, or branding."/>
      <AnalysisCard title="Design Thinking" desc="How you approach problems such as usability issues, layout balance, accessibility, and user flow."/>
      <AnalysisCard title="Tools & Style Preference" desc="Your inclination toward design tools, workflows, and styles used in real-world UI/UX and product design."/>
    </div>
  </div>
</section>

<section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose This Career Diagnosis?</h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">A smart, student-first approach to career guidance—clear, reliable, and result-driven.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <ReasonCard number="01" title="Scientifically Designed" text="Questions are carefully crafted using aptitude, interest, and logical patterns—not guesswork."/>
      <ReasonCard number="02" title="No Random Suggestions" text="Every career recommendation is backed by your answers and scoring logic."/>
      <ReasonCard number="03" title="Student-Friendly Experience" text="Simple language, clear questions, and an intuitive flow designed especially for students."/>
      <ReasonCard number="04" title="Instant Career Insights" text="Get a detailed, easy-to-understand career report immediately after completing the test."/>
    </div>
  </div>
</section>


      <section className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-14 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to Discover Your Career Path?</h2>
          <p className="text-green-100">Take the first step towards a confident and informed future.</p>
          <button onClick={() => navigate("/start-test")} className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">Take the Diagnosis Test</button>
        </div>
      </section>
    </div>
  )
}

export default Diagnosis

function Feature({ icon, text }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex items-center gap-3">
      <div className="text-green-600">{icon}</div>
      <p className="font-medium text-gray-700">{text}</p>
    </div>
  )
}

function Step({ number, title, desc }) {
  return (
    <div className="text-center space-y-3">
      <div className="text-green-600 text-4xl font-bold">{number}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  )
}

function AnalysisCard({ title, desc }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-t-3xl" />
      <div className=" w-12 h-12 mb-4 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-xl group-hover:scale-110 transition">✦</div>
      <h3 className="font-semibold text-xl text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
    </div>
  )
}

function Reason({ text }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
      <CheckCircle className="text-green-600" />
      <p className="text-gray-700">{text}</p>
    </div>
  )
}

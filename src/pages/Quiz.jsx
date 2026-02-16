import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import trackGateQuestion from "../data/trackGateQuestion"
import subTrackGateQuestions from "../data/subTrackGateQuestions"
import subTrackConfirmQuestions from "../data/subTrackConfirmQuestions"
import foundation from "../data/foundationQuestions"
import tech from "../data/techSignalQuestions"
import psychometric from "../data/psychometricQuestions"
import signal from "../data/signalLockQuestions"
import demographic from "../data/demographicQuestions"
import effort from "../data/effortQuestions"
import cognitive from "../data/cognitiveQuestions"
import trackQuestions from "../data/trackQuestions"
import QuestionCard from "../components/QuestionCard"
import AnimatedBackground from "../components/AnimatedBackground"

const QUESTION_TIME = 30
const SOUND_START_TIME = 10

function getStrongestTrack(scores) {
  const tracks = ["web","ai","data","network","security","cloud","hr","marketing","logistics","finance","content"]
  let best = null
  let max = -Infinity
  tracks.forEach(track => {
    const value = scores[track] || 0
    if (value > max) {
      max = value
      best = track
    }
  })
  return best
}
const FEEDBACK_INTERVAL = 4

const FEEDBACK_MESSAGES = [
  "Well done! 🌟",
  "Nice choice 👏",
  "Keep going 🚀",
  "You're doing great 💚",
  "That makes sense 👍"
]
function Quiz() {
  const [socialProof, setSocialProof] = useState([])
  /* -------- SOCIAL PROOF SYSTEM -------- */

useEffect(() => {

  const createNotification = () => {

    const notification = {
      id: Date.now(),
      name: randomItem(SOCIAL_NAMES),
      city: randomItem(SOCIAL_CITIES),
      time: randomItem(SOCIAL_TIME)
    }

    // keep max 5 cards
    setSocialProof(prev => [notification, ...prev.slice(0, 4)])

    // auto remove after 7 seconds
    setTimeout(() => {
      setSocialProof(prev => prev.filter(n => n.id !== notification.id))
    }, 7000)
  }

  // first popup after 12 sec (so user settles first)
  const firstTimeout = setTimeout(createNotification, 12000)

  // then random interval 60–120 sec
  const interval = setInterval(() => {
    createNotification()
  }, Math.floor(Math.random() * 60000) + 60000)

  return () => {
    clearTimeout(firstTimeout)
    clearInterval(interval)
  }

}, [])

  const [answered, setAnswered] = useState(0)
  const [answeredInPhase, setAnsweredInPhase] = useState(0)
  const timeUpHandledRef = useRef(false)
  const [phase, setPhase] = useState("gate")
  const [index, setIndex] = useState(0)
  const [scores, setScores] = useState({})
  const [trackScores, setTrackScores] = useState({})
  const [lockedTrack, setLockedTrack] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const finalScoresRef = useRef({})
  const hasNavigatedRef = useRef(false)
  const beepRef = useRef(null)
  const navigate = useNavigate()
  const [trackGroup, setTrackGroup] = useState(null)

  /* ---------- SOUND ---------- */
  useEffect(() => {
    beepRef.current = new Audio("/sounds/beep.mp3")
    beepRef.current.volume = 0.5
  }, [])

  /* ---------- TIMER ---------- */
  useEffect(() => {
    setTimeLeft(QUESTION_TIME)

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          stopBeep()
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
      stopBeep()
    }
  }, [phase, index])

  useEffect(() => { timeUpHandledRef.current = false }, [phase, index])
  useEffect(() => { setAnsweredInPhase(0) }, [phase])

  useEffect(() => {
    if (!beepRef.current) return
    if (timeLeft > 0 && timeLeft <= SOUND_START_TIME) {
      beepRef.current.currentTime = 0
      beepRef.current.play().catch(() => {})
    }
  }, [timeLeft])

  const stopBeep = () => {
    if (beepRef.current) {
      beepRef.current.pause()
      beepRef.current.currentTime = 0
    }
  }

  /* -------- SOCIAL PROOF DATA -------- */

const SOCIAL_NAMES = [
  "Rahul Saini","Aman Verma","Priya Sharma","Karan Mehta",
  "Sneha Patel","Rohit Yadav","Pooja Gupta","Aditya Singh",
  "Neha Jain","Vikas Kumar","Arjun Nair","Kritika Das",
  "Sahil Khan","Ritika Joshi","Ankit Agarwal","Mohit Chauhan"
]

const SOCIAL_CITIES = [
  "Delhi","Mumbai","Pune","Jaipur","Indore","Bangalore",
  "Hyderabad","Lucknow","Ahmedabad","Chandigarh",
  "Bhopal","Surat","Nagpur","Noida","Patna"
]

const SOCIAL_TIME = ["just now","1 min ago","2 min ago","3 min ago"]

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

const handleTimeUp = () => {
  if (hasNavigatedRef.current || timeUpHandledRef.current) return

  timeUpHandledRef.current = true

  setFeedback("Time’s up ⏰")

  setTimeout(() => {
    setFeedback("")   // <-- missing line (main bug)
    setIndex(prev => prev + 1)
  }, 900)
}


  /* ---------- ANSWER HANDLER ---------- */
  const handleAnswer = (option) => {

    if (hasNavigatedRef.current) return
    setAnsweredInPhase(prev => prev + 1)
    stopBeep()
    // ---- motivational feedback ----
const nextAnswered = answered + 1
setAnswered(nextAnswered)

if (nextAnswered % FEEDBACK_INTERVAL === 0) {
  const randomMsg =
    FEEDBACK_MESSAGES[Math.floor(Math.random() * FEEDBACK_MESSAGES.length)]

  setFeedback(randomMsg)

  setTimeout(() => {
    setFeedback("")
  }, 1200)
}


    if (phase === "gate") {
      setTrackGroup(option.lockTrack)
      setPhase("subgate")
      return
    }

    if (phase === "subgate") {
      if (option.weight) {
        setTrackScores(prev => {
          const updated = { ...prev }
          Object.entries(option.weight).forEach(([k, v]) => {
            updated[k] = (updated[k] || 0) + v
          })
          return updated
        })
      }

      const totalSubgate = subTrackGateQuestions[trackGroup]?.length || 0
      const nextIndex = index + 1

      if (nextIndex < totalSubgate) setIndex(nextIndex)
      else { setPhase("confirm"); setIndex(0) }
      return
    }

    if (phase === "confirm") {
      let updatedScores = { ...trackScores }

      if (option.weight) {
        Object.entries(option.weight).forEach(([k, v]) => {
          updatedScores[k] = (updatedScores[k] || 0) + v
        })
      }

      setTrackScores(updatedScores)

      const confirmQs = subTrackConfirmQuestions[trackGroup] || []
      const nextIndex = index + 1

      if (nextIndex >= confirmQs.length) {
        const bestTrack = Object.entries(updatedScores)
          .sort((a, b) => b[1] - a[1])[0]?.[0]

        setLockedTrack(bestTrack)
        setPhase("track")
        setIndex(0)
      } else setIndex(nextIndex)

      return
    }

    setScores(prev => {
      const updated = { ...prev }
      if (option.score) {
        Object.entries(option.score).forEach(([k, v]) => {
          updated[k] = (updated[k] || 0) + v
        })
      }
      finalScoresRef.current = updated
      return updated
    })

    setIndex(prev => {
      const nextIndex = prev + 1
     if (
  phase === "track" &&
  lockedTrack &&
  nextIndex >= (trackQuestions[lockedTrack] || []).length
) {
  hasNavigatedRef.current = true

  // 🔥 IMPORTANT FIX
  sessionStorage.setItem(
    "careerScores",
    JSON.stringify(finalScoresRef.current)
  )

  navigate("/result", { state: { scores: finalScoresRef.current } })
  return prev
}
      return nextIndex
    })
  }

  /* ---------- PROGRESS CALCULATION ---------- */
  let phaseTotal = 1
  let phaseAnswered = answeredInPhase

  if (phase === "subgate") phaseTotal = subTrackGateQuestions[trackGroup]?.length || 1
  else if (phase === "confirm") phaseTotal = subTrackConfirmQuestions[trackGroup]?.length || 1
  else if (phase === "track") phaseTotal = trackQuestions[lockedTrack]?.length || 1

  const progressPercent = Math.min(100, Math.round((phaseAnswered / phaseTotal) * 100))

  /* ---------- CURRENT QUESTION ---------- */
  let currentQuestion = null
  if (phase === "gate") currentQuestion = trackGateQuestion
  else if (phase === "subgate" && trackGroup) currentQuestion = subTrackGateQuestions[trackGroup]?.[index]
  else if (phase === "confirm" && trackGroup) currentQuestion = subTrackConfirmQuestions[trackGroup]?.[index]
  else if (phase === "track") currentQuestion = trackQuestions[lockedTrack]?.[index]

  if (!currentQuestion) return null

  return (

<section className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 pb-24
  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
  from-green-100 via-white to-white">

  <div className="absolute inset-0 -z-10 pointer-events-none">
    <AnimatedBackground />
  </div>

  <AnimatePresence>
    {feedback && (
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -14 }}
        className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-full shadow-2xl text-base sm:text-lg font-semibold text-white z-30"
      >
        {feedback}
      </motion.div>
    )}
  </AnimatePresence>

  <div className="w-full max-w-4xl z-10">

    <div className="flex justify-center mb-4">
      <span className="px-5 py-1.5 rounded-full text-xs font-semibold bg-white/80 backdrop-blur text-green-700 shadow-md">
        {phase.toUpperCase()} PHASE
      </span>
    </div>

    {/* PROGRESS BAR */}
    <div className="mb-6">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>{phaseAnswered}/{phaseTotal}</span>
        <span>{progressPercent}%</span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-6 items-start">

      <motion.div
        className="flex md:flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-green-200 px-4 py-3 min-w-[90px]"
        animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: timeLeft <= 5 ? Infinity : 0, duration: 0.6 }}
      >
        <span className="text-xs text-gray-500">Time</span>
        <span className={`text-2xl font-bold ${timeLeft <= 5 ? "text-red-500" : "text-green-600"}`}>
          {timeLeft}
        </span>
        <span className="text-xs text-gray-400">sec</span>
      </motion.div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <QuestionCard key={`${phase}-${index}`} question={currentQuestion} onAnswer={handleAnswer} />
        </AnimatePresence>
      </div>

    </div>
  </div>

  {/* -------- SOCIAL PROOF POPUPS -------- */}

<div className="fixed bottom-28 left-4 z-40 flex flex-col gap-3 pointer-events-none">

  <AnimatePresence>
    {socialProof.map((n) => (
      <motion.div
        key={n.id}
        initial={{ opacity: 0, x: -80, scale: 0.85 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-green-100 shadow-2xl rounded-xl px-4 py-3 w-72"
      >
        <div className="text-sm text-gray-800 font-medium leading-snug">
          <span className="text-green-600 font-semibold">{n.name}</span>{" "}
          from <span className="font-medium">{n.city}</span> just completed the
          <span className="font-semibold text-emerald-600"> Career Diagnosis Test</span>
        </div>

        <div className="text-xs text-gray-400 mt-1">
          {n.time}
        </div>
      </motion.div>
    ))}
  </AnimatePresence>

</div>


  {/* FIXED FOOTER */}
  <div className="fixed bottom-0 left-0 w-full z-20 pointer-events-none">
    <div className="max-w-7xl mx-auto px-4 pb-3">
      <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-xl shadow-md px-6 py-3 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-gray-600">
        <div className="font-semibold text-[#2F6F6A]">NS3 Career GPS</div>
        <div>Psychometric career assessment platform</div>
        <div>© {new Date().getFullYear()} NS3Edu. All rights reserved.</div>
      </div>
    </div>
  </div>

</section>
  )
}

export default Quiz

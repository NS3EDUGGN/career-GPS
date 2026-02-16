import { motion } from "framer-motion"
export default function AnimatedBackground() {
  return (
    <>
      <motion.div className="absolute -top-32 -left-32 w-96 h-96 bg-green-200/50 rounded-full blur-3xl" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 -right-32 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl" animate={{ x: [0, -40, 0], y: [0, -30, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }} />
    </>
  )
}

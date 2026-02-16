import { motion } from "framer-motion"

function QuizFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mt-10 border-t border-gray-200 bg-white/70 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">

        {/* Left */}
        <div className="text-center md:text-left">
          <p className="font-medium text-gray-700">
            © {new Date().getFullYear()} NS3 Career GPS
          </p>
          <p className="text-xs text-gray-500">
            Career diagnosis powered by psychometric intelligence
          </p>
        </div>

        {/* Center */}
        <div className="flex gap-4">
          <button className="hover:text-green-600 transition">
            Privacy Policy
          </button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-green-600 transition">
            Terms
          </button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-green-600 transition">
            Help
          </button>
        </div>

        {/* Right */}
        <div className="text-xs text-gray-500 text-center md:text-right">
          <p>
            Time-bound • Adaptive • Bias-aware
          </p>
        </div>

      </div>
    </motion.footer>
  )
}

export default QuizFooter

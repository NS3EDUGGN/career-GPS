import { motion } from "framer-motion"
function QuestionCard({ question, onAnswer }) {
  if (!question) return null
  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.98 }} transition={{ duration: 0.3, ease: "easeOut" }}
      className=" bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] border border-white/50"
    >
      <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed"> {question.question} </h2>
     
      {question.image && ( <img src={question.image} alt="question" className="rounded-2xl mb-6 border" /> )}
      <div className="space-y-3">
        {question?.options?.map((option, index) => (
          <motion.button key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }} onClick={() => onAnswer(option)}
            className=" w-full text-left px-5 py-4 rounded-2xl bg-white border text-gray-700 hover:bg-green-50 hover:border-green-300 shadow-sm hover:shadow-md transition-all duration-200">
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )}
export default QuestionCard

function CareerCard({ rank, title, percent }) {

  const getColor = (p) => {
    if (p >= 80) return "from-green-400 to-emerald-300"
    if (p >= 60) return "from-yellow-400 to-amber-300"
    if (p >= 40) return "from-orange-400 to-orange-300"
    return "from-red-400 to-rose-300"
  }

  return (
    <div className="relative rounded-2xl p-6 border border-green-400/20 bg-white/5 backdrop-blur">

      {/* Rank badge */}
      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-green-500 text-black font-bold flex items-center justify-center shadow-lg">
        #{rank}
      </div>

      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <div className="mt-4">

        {/* Progress bar */}
        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getColor(percent)} transition-all duration-700`}
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mt-2 text-sm text-green-300">
          Match Score: <span className="font-bold">{percent}%</span>
        </div>

      </div>

    </div>
  )
}

export default CareerCard

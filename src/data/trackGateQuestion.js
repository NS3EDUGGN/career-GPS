const trackGateQuestion = {
  id: "track-gate",
  question: "Which option best describes you?",
  options: [
    { text: "Technical and I like coding", lockTrack: "tech_coding", unlocks: ["web", "ai", "data"] },
    { text: "Technical but almost zero coding", lockTrack: "tech_noncoding", unlocks: ["network", "security"] },
    { text: "Non-technical", lockTrack: "non_technical", unlocks: ["marketing", "hr", "logistics"] }
]
}

export default trackGateQuestion

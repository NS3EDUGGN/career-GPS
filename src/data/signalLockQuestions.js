const signalLockQuestions = [
  {
    id: 15,
    question: "If you had to spend 3 months learning one thing, which sounds tolerable?",
    options: [
      { text: "Building something visible", score: { creative: 4 }, unlocks: ["web"] },
      { text: "Working with data and logic", score: { data: 2, ai: 3 }, unlocks: ["data", "ai"] },
      { text: "Understanding technical systems", score: { systems: 4, network: 1 }, unlocks: ["network"] },
      { text: "Learning rules and protection methods", score: { security: 4 }, unlocks: ["security"] },
      { text: "Learning how teams and businesses run", score: { management: 2, hr: 3, logistics: 1 } }
    ]
  }
]

export default signalLockQuestions

const techSignalQuestions = [
  {
    id: 10,
    question: "If given a computer problem, what would you do?",
    options: [
      { text: "Try fixing it myself", score: { technical: 2, web: 1, ai: 1 }, unlocks: ["web", "ai", "data"] },
      { text: "Search and understand", score: { analytical: 2, ai: 2, data: 1 }, unlocks: ["data", "ai"] },
      { text: "Call support", score: { management: 1 } },
      { text: "Look for security issues", score: { security: 3 }, unlocks: ["security"] },
      {text: "Understanding users and improving reach", score: { marketing: 3, analytical: 1 }, unlocks: ["marketing"]},
      { text: "Ignore and move on", score: { stability: -1 } }
    ]
  },
  {
    id: 11,
    question: "Would you prefer working on:",
    options: [
      { text: "What users see", score: { creative: 2, web: 2, marketing: 1 }, unlocks: ["web"] },
      { text: "What runs behind the scenes", score: { systems: 2, network: 2, technical: 1 }, unlocks: ["network"] },
      { text: "Protecting systems", score: { security: 3 }, unlocks: ["security"] },
      { text: "Managing systems", score: { systems: 2 }, unlocks: ["network"] },
      { text: "Analyzing information", score: { data: 1, ai: 2 }, unlocks: ["data", "ai"] },
      { text: "Promoting products and understanding audience behavior", score: { marketing: 2, people: 1, analytical: 1 }, unlocks: ["marketing"]}
    ]
  },
  {
    id: 12,
    question: "What do you notice in apps/websites?",
    options: [
      { text: "Design", score: { creative: 2 } },
      { text: "Speed", score: { technical: 2 } },
      { text: "Accuracy", score: { data: 1, ai: 1 } },
      { text: "Security", score: { security: 2 } },
      { text: "Flow", score: { systems: 2 } }
    ]
  }
]

export default techSignalQuestions

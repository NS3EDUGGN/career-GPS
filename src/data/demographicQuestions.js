const demographicQuestions = [
  {
    id: 16,
    question: "When you enter a new place, what do you notice first?",
    options: [
      { text: "How it looks", score: { creative: 1 } },
      { text: "How people behave", score: { people: 1 } },
      { text: "How things are arranged", score: { systems: 1, network: 1  } },
      { text: "What could go wrong", score: { security: 1 } },
      { text: "How everything works together", score: { systems: 2 } }
    ]
  },
  {
    id: 17,
    question: "If you are given a task with no instructions, what do you do first?",
    options: [
      { text: "Start trying things", score: { experimentation: 1 } },
      { text: "Observe quietly", score: { analytical: 1 } },
      { text: "Ask questions", score: { people: 1 } },
      { text: "Break it into steps", score: { systems: 2 } },
      { text: "Wait for guidance", score: { ai: 1 } }
    ]
  }
]

export default demographicQuestions

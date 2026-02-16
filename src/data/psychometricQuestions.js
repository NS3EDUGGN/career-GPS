const psychometricQuestions = [
  {
    id: 13,
    question: "When you get free time, what do you naturally do?",
    options: [
      { text: "Watch or explore something new", score: { analytical: 2, web: 2, marketing: 1 } },
      { text: "Play games / try apps", score: { technical: 1 } },
      { text: "Talk to people", score: { people: 2, hr: 1, marketing: 1} },
      { text: "Learn something deeply", score: { analytical: 3, ai: 2 } },
      { text: "Organize or plan things", score: { management: 2 } }
    ]
  },
  {
    id: 14,
    question: "When something feels difficult, you usually:",
    options: [
      { text: "Keep trying different ways", score: { stability: 2 } },
      { text: "Stop and analyze", score: { analytical: 2 } },
      { text: "Ask someone", score: { management: 1 } },
      { text: "Leave it for later", score: { stability: -1 } },
      { text: "Think about audience reaction", score: { marketing: 2, analytical: 1 } },
      { text: "Break it into steps", score: { systems: 2, logistics: 1} }
    ]
  }
]

export default psychometricQuestions

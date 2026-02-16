const logisticsQuestions = [
  {
    id: "log-1",
    question: "What kind of work sounds satisfying?",
    options: [
      { text: "Coordinating operations", score: { logistics: 3 } },
      { text: "Improving processes", score: { logistics: 2, systems: 2 } },
      { text: "Managing timelines", score: { logistics: 2, management: 2 } }
    ]
  },
  {
    id: "log-2",
    question: "What would you focus on daily?",
    options: [
      { text: "Ensuring smooth flow", score: { logistics: 3 } },
      { text: "Reducing delays", score: { logistics: 2, analytical: 1 } },
      { text: "Planning resources", score: { logistics: 2, planning: 2 } }
    ]
  }
]

export default logisticsQuestions

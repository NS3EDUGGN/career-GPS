const hrQuestions = [
  {
    id: "hr-1",
    question: "What part of working with people interests you most?",
    options: [
      { text: "Resolving conflicts", score: { hr: 3, people: 2 } },
      { text: "Hiring and interviewing", score: { hr: 3 } },
      { text: "Helping employees grow", score: { hr: 2, teaching: 2 } }
    ]
  },
  {
    id: "hr-2",
    question: "How would you handle a team issue?",
    options: [
      { text: "Listen to both sides", score: { hr: 3, people: 2 } },
      { text: "Create clear policies", score: { hr: 2, management: 2 } },
      { text: "Escalate carefully", score: { hr: 1 } }
    ]
  }
]

export default hrQuestions

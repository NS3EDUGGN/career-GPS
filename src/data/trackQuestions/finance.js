const financeQuestions = [
  {
    id: "fin-1",
    question: "What part of finance sounds most comfortable?",
    options: [
      { text: "Managing budgets", score: { finance: 3 } },
      { text: "Analyzing profits and losses", score: { finance: 3, analytical: 2 } },
      { text: "Planning investments", score: { finance: 3 } }
    ]
  },
  {
    id: "fin-2",
    question: "Which task sounds more natural?",
    options: [
      { text: "Tracking expenses", score: { finance: 3 } },
      { text: "Forecasting financial growth", score: { finance: 3, analytical: 2 } },
      { text: "Preparing financial reports", score: { finance: 2 } }
    ]
  }
]

export default financeQuestions

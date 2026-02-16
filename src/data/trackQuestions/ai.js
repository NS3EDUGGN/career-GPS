const aiQuestions = [
  {
    id: "ai-1",
    question: "What excites you more about working with intelligence?",
    options: [
      { text: "Finding patterns from data", score: { ai: 3, data: 2 } },
      { text: "Making logical predictions", score: { ai: 3, analytical: 2 } },
      { text: "Experimenting with new ideas", score: { ai: 2, experimentation: 2 } }
    ]
  },
  {
    id: "ai-2",
    question: "When results are wrong, what do you do?",
    options: [
      { text: "Analyze where logic failed", score: { ai: 3, analytical: 2 } },
      { text: "Test different approaches", score: { ai: 2, experimentation: 2 } },
      { text: "Break the problem into steps", score: { ai: 2, systems: 2 } }
    ]
  },
  {
  id: "ai-3",
  question: "What does Machine Learning allow computers to do?",
  options: [
    { text: "Learn from data and improve over time", score: { ai: 2, data: 1 } },
    { text: "Follow fixed rules only", score: {} },
    { text: "Store large files", score: {} },
    { text: "Run faster programs", score: {} }
  ]
},
{
  id: "ai-4",
  question: "Which task is best suited for AI?",
  options: [
    { text: "Recognizing faces in photos", score: { ai: 2, data: 1 } },
    { text: "Writing HTML tags", score: {} },
    { text: "Fixing network cables", score: {} },
    { text: "Typing documents", score: {} }
  ]
}


]

export default aiQuestions

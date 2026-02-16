const contentQuestions = [
  {
    id: "content-1",
    question: "What part of content creation excites you most?",
    options: [
      { text: "Shooting videos or photos", score: { content: 3, creative: 2 } },
      { text: "Writing scripts or captions", score: { content: 3 } },
      { text: "Editing and polishing content", score: { content: 3, creative: 2 } }
    ]
  },
  {
    id: "content-2",
    question: "What kind of feedback motivates you?",
    options: [
      { text: "More views and engagement", score: { content: 3 } },
      { text: "Positive audience comments", score: { content: 2, people: 1 } },
      { text: "Growing followers", score: { content: 3 } }
    ]
  }
]

export default contentQuestions

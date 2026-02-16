const marketingQuestions = [
  {
    id: "mkt-1",
    question: "What excites you about promotion?",
    options: [
      { text: "Understanding audience psychology", score: { marketing: 3 } },
      { text: "Creating catchy campaigns", score: { creative: 2, marketing: 2 } },
      { text: "Analyzing campaign performance", score: { data: 2, marketing: 2 } }
    ]
  },
  {
    id: "mkt-2",
    question: "What would you enjoy optimizing?",
    options: [
      { text: "Ad performance", score: { marketing: 3 } },
      { text: "Social media reach", score: { marketing: 2, people: 1 } },
      { text: "Conversion funnels", score: { marketing: 2, data: 1 } }
    ]
  },
  {
  id: "mkt-3",
  question: "Why is SEO important for a website?",
  options: [
    { text: "To appear higher in search results", score: { marketing: 2, analytical: 1 } },
    { text: "To make the website colorful", score: {} },
    { text: "To protect from hackers", score: {} },
    { text: "To increase server speed", score: {} }
  ]
},
{
  id: "mkt-4",
  question: "What is an online advertisement mainly used for?",
  options: [
    { text: "Attracting potential customers", score: { marketing: 2 } },
    { text: "Fixing website errors", score: {} },
    { text: "Creating databases", score: {} },
    { text: "Testing network security", score: {} }
  ]
}
]

export default marketingQuestions

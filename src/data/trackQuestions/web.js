const webQuestions = [
  {
    id: "web-1",
    question: "What part of creating something visible do you enjoy more?",
    options: [
      { text: "Designing layouts and visuals", score: { web: 3, creative: 2 } },
      { text: "Writing logic to make things work", score: { web: 3, analytical: 2 } },
      { text: "Improving flow and usability", score: { web: 2, systems: 2 } }
    ]
  },
  {
    id: "web-2",
    question: "When a website has an issue, what feels natural?",
    options: [
      { text: "Fixing the UI or interaction", score: { web: 2, creative: 2 } },
      { text: "Debugging step by step", score: { web: 2, analytical: 2 } },
      { text: "Planning a cleaner structure", score: { web: 2, planning: 2 } }
    ]
  },
  {
  id: "web-3",
  question: "Which data structure is best for storing a fixed number of items?",
  options: [
    { text: "Array", score: { web: 2, aiml: 1 } },
    { text: "Linked List", score: { data: 0 } },
    { text: "Stack", score: { aiml: 0 } },
    { text: "Queue", score: { logistics: 0 } }
  ]
},
{
  id: "web-4",
  question: "A loop runs from 1 to 5. How many times will it execute?",
  options: [
    { text: "4 times", score: {} },
    { text: "5 times", score: { data: 1, aiml: 1, web: 2 } },
    { text: "6 times", score: {} },
    { text: "Infinite times", score: {} }
  ]
},
{
  id: "web-5",
  question: "Which HTML tag is used for the largest heading?",
  options: [
    { text: "<h1>", score: { web: 2 } },
    { text: "<heading>", score: {} },
    { text: "<head>", score: {} },
    { text: "<p>", score: {} }
  ]
},
{
  id: "web-6",
  question: "What is React mainly used for?",
  options: [
    { text: "Building user interfaces", score: { web: 2 } },
    { text: "Writing database queries", score: {} },
    { text: "Creating operating systems", score: {} },
    { text: "Managing servers", score: {} }
  ]
}
]

export default webQuestions

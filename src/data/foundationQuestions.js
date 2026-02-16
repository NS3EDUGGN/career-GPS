const foundationQuestions = [
  {
    id: 1,
    question: "What kind of work sounds most interesting?",
    options: [
      { text: "Creating something people can see or use", score: { creative: 2 } },
      { text: "Solving puzzles or problems", score: { analytical: 2 } },
      { text: "Convincing or guiding people", score: { people: 2, marketing: 2, hr: 1 } },
      { text: "Teaching or explaining", score: { teaching: 2 } },
      { text: "Managing tasks or teams", score: { management: 2 } }
    ]
  },
  {
    id: 2,
    question: "What would you enjoy doing for hours?",
    options: [
      { text: "Designing or building", score: { creative: 2 } },
      { text: "Analyzing information", score: { analytical: 2, ai: 1 } },
      { text: "Talking and convincing", score: { people: 2, hr: 1, marketing: 2 } },
      { text: "Helping others understand", score: { teaching: 2, ai: 1 } },
      { text: "Planning and organizing", score: { management: 2, network: 2 } }
    ]
  },
  {
    id: 3,
    question: "How do you usually approach problems?",
    options: [
      { text: "Creative ideas", score: { creative: 2 } },
      { text: "Logical analysis", score: { analytical: 2, ai: 1 } },
      { text: "Discussion with people", score: { people: 2, hr: 2 } },
      { text: "Step-by-step explanation", score: { teaching: 2, ai: 1 } },
      { text: "Structured planning", score: { management: 1, network: 1 } }
    ]
  },
  {
    id: 4,
    question: "What do you prefer working with?",
    options: [
      { text: "Screens & tools", score: { technical: 2, web: 2, network: 1, marketing: 1  } },
      { text: "Numbers & data", score: { data: 1, ai: 1 } },
      { text: "People & communication", score: { people: 2 } },
      { text: "Knowledge & learning", score: { teaching: 2 } },
      { text: "Processes & operations", score: { systems: 2 } }
    ]
  },
  {
    id: 5,
    question: "What frustrates you the most?",
    options: [
      { text: "Repetitive work", score: { creative: 1 } },
      { text: "Illogical decisions", score: { analytical: 2 } },
      { text: "Lack of communication", score: { people: 2 } },
      { text: "People not understanding", score: { teaching: 2 } },
      { text: "Poor planning", score: { management: 2, network: 2 } }
    ]
  },
  {
    id: 6,
    question: "How do you feel about risk?",
    options: [
      { text: "I enjoy experimenting", score: { creative: 2, ai: 2 } },
      { text: "I prefer calculated risks", score: { analytical: 2 } },
      { text: "I take risks for rewards", score: { leadership: 2 } },
      { text: "I prefer stability", score: { systems: 2 } },
      { text: "I like control and planning", score: { management: 1, network: 1 } }
    ]
  },
  {
    id: 7,
    question: "If something is not working, what is your natural reaction?",
    options: [
      { text: "Try different ways until it works", score: { persistence: 2 } },
      { text: "Analyze why it failed", score: { analytical: 2, ai: 1 } },
      { text: "Ask someone experienced", score: { people: 1 } },
      { text: "Look for mistakes", score: { security: 2, ai: 1 } },
      { text: "Restart from basics", score: { systems: 2 } }
    ]
  },
  {
    id: 8,
    question: "How do you handle pressure or deadlines?",
    options: [
      { text: "I enjoy it", score: { leadership: 2 } },
      { text: "I manage it", score: { management: 2 } },
      { text: "I avoid it if possible", score: { comfort: 1 } }
    ]
  },
  {
    id: 9,
    question: "How do you solve problems?",
    options: [
      { text: "Trial & Error", score: { experimentation: 2 } },
      { text: "Deep Analysis", score: { analytical: 2, ai: 1} },
      { text: "Step-by-Step", score: { systems: 2 } },
      { text: "Investigating issues", score: { security: 2, ai: 1 } },
      { text: "Planning First", score: { management: 2, network: 1 } }
    ]
  },
  
  {
  id: 20,
  question: "What kind of career domain you are inclined towards?",
  options: [
    { text: "I enjoy coding", score: { web: 3, ai: 2, data: 2, technical: 2, analytical: 1}, unlocks: ["web", "ai", "data"] },
    { text: "I prefer non-coding technical work", score: { network: 8, security: 3, systems: 2, stability: 1 }, unlocks: ["network", "security"]},
    { text: "I do not enjoy coding and technical work", score: { hr: 2, marketing: 2, logistics: 2}, unlocks: ["marketing", "hr", "logistics"] },
  ]
},




]

export default foundationQuestions

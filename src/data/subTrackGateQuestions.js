const subTrackGateQuestions = {
  tech_coding: [
    {
      id: "tc-1",
      question: "Which activity feels most satisfying to you?",
      options: [
        { text: "Designing Websites for internet", weight: { web: 2 } },
        { text: "Finding useful information", weight: { data: 2 } },
        { text: "Solving hard problems", weight: { ai: 2 } }
      ]
    },
    {
      id: "tc-2",
      question: "What kind of feedback motivates you more?",
      options: [
        { text: "People liking what you made", weight: { web: 2 } },
        { text: "Clear answers from numbers", weight: { data: 2 } },
        { text: "Things getting better with time", weight: { ai: 2 } }
      ]
    },
    {
      id: "tc-3",
      question: "Which struggle feels more acceptable?",
      options: [
        { text: "Improving how things look and work", weight: { web: 2 } },
        { text: "Cleaning messy information", weight: { data: 2 } },
        { text: "Improving results step by step", weight: { ai: 2 } }
      ]
    },
    {
      id: "tc-4",
      question: "What do you like more?",
      options: [
        { text: "Looks good and works well", weight: { web: 2 } },
        { text: "Clear information", weight: { data: 2 } },
        { text: "Correct answers", weight: { ai: 2 } }
      ]
    },
    {
      id: "tc-5",
      question: "Which task sounds more interesting?",
      options: [
        { text: "Designing how things look and work", weight: { web: 2 } },
        { text: "Finding patterns in numbers", weight: { data: 2 } },
        { text: "Creating intelligent systems", weight: { ai: 2 } }
      ]
    }
  ],


  tech_noncoding: [
    {
      id: "tn-1",
      question: "What do you like?",
      options: [
        { text: "Fix problems", weight: { network: 2 } },
        { text: "Stop danger and protect things", weight: { security: 2 } },
        { text: "Manage big apps online", weight: { cloud: 2 } }
      ]
    },
    {
      id: "tn-2",
      question: "Which situation would you rather handle?",
      options: [
        { text: "Fix wifi or network issues", weight: { network: 2 } },
        { text: "Looking for a unusual login", weight: { security: 2 } },
        { text: "Boosting system performance", weight: { cloud: 2 } }
      ]
    },
    {
      id: "tn-3",
      question: "What type of task sounds more natural?",
      options: [
        { text: "Joining computers and devices", weight: { network: 2 } },
        { text: "Saving systems from attacks", weight: { security: 2 } },
        { text: "Managing data on internet", weight: { cloud: 2 } }
      ]
    },
    {
      id: "tn-4",
      question: "Which work feels acceptable?",
      options: [
        { text: "Improving system speed", weight: { network: 2 } },
        { text: "Checking for problems", weight: { security: 2 } },
        { text: "Using online tools", weight: { cloud: 2 } }
      ]
    },
    {
      id: "tn-5",
      question: "Which type of responsibility suits you?",
      options: [
        { text: "Keeping systems work properly", weight: { network: 2 } },
        { text: "Keeping things safe", weight: { security: 2 } },
        { text: "Making systems work for more people using internet", weight: { cloud: 2 } }
      ]
    }
  ],

  // ==========================
  // NON-TECHNICAL
  // Marketing vs HR vs Logistics
  // ==========================
non_technical: [
  {
    id: "nt-1",
    question: "What kind of problems do you prefer?",
    options: [
      { text: "Understanding and influencing people", weight: { marketing: 2 } },
      { text: "Helping people solve issues", weight: { hr: 2 } },
      { text: "Making sure things run on time", weight: { logistics: 2 } },
      { text: "Working with numbers and money", weight: { finance: 2 } },
      { text: "Creating videos, posts, or creative content", weight: { content: 2 } }
    ]
  },
  {
    id: "nt-2",
    question: "Which result makes you feel happy?",
    options: [
      { text: "More people using or liking a product", weight: { marketing: 2 } },
      { text: "A team working happily", weight: { hr: 2 } },
      { text: "Work running smoothly", weight: { logistics: 2 } },
      { text: "Good money planning or profit", weight: { finance: 2 } },
      { text: "A video or post getting views", weight: { content: 2 } }
    ]
  },
  {
    id: "nt-3",
    question: "Which task feels easiest to you?",
    options: [
      { text: "Coming up with new ideas", weight: { marketing: 2 } },
      { text: "Helping people at work", weight: { hr: 2 } },
      { text: "Planning and managing schedules", weight: { logistics: 2 } },
      { text: "Working with money and numbers", weight: { finance: 2 } },
      { text: "Making or editing videos and posts", weight: { content: 2 } }
    ]
  },
  {
    id: "nt-4",
    question: "What kind of work suits you?",
    options: [
      { text: "Checking how ideas or ads are doing", weight: { marketing: 2 } },
      { text: "Listening to and helping employees", weight: { hr: 2 } },
      { text: "Keeping work on track and on time", weight: { logistics: 2 } },
      { text: "Managing accounts or investments", weight: { finance: 2 } },
      { text: "Posting and managing social media", weight: { content: 2 } }
    ]
  },
  {
    id: "nt-5",
    question: "Which responsibility feels better?",
    options: [
      { text: "Growing customers or audience", weight: { marketing: 2 } },
      { text: "Managing people and teams", weight: { hr: 2 } },
      { text: "Helping smooth processes", weight: { logistics: 2 } },
      { text: "Handling financial planning", weight: { finance: 2 } },
      { text: "Building a personal brand", weight: { content: 2 } }
    ]
  },
  {
  id: "nt-6",
  question: "How comfortable are you being on camera or speaking publicly?",
  options: [
    { text: "Very comfortable I enjoy it", weight: { content: 3, marketing: 2 } },
    { text: "Somewhat comfortable", weight: { marketing: 2, hr: 1, content: 1 } },
    { text: "Neutral depends on situation", weight: { hr: 2, logistics: 1 } },
    { text: "Not comfortable at all", weight: { finance: 2, logistics: 2 } }
  ]
}

]

}

export default subTrackGateQuestions

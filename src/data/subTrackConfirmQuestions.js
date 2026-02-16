const subTrackConfirmQuestions = {
  // ===============================
  // TECHNICAL + CODING
  // Web vs Data vs AI
  // ===============================
  tech_coding: [
    {
      id: "confirm-tech-1",
      question: "Which work sounds least annoying to you?",
      options: [
        { text: "Designing how users interact", weight: { web: 2 } },
        { text: "Cleaning and preparing messy data", weight: { data: 2 } },
        { text: "Improving how a system learns", weight: { ai: 2 } }
      ]
    },
    {
      id: "confirm-tech-2",
      question: "What makes you feel successful?",
      options: [
        {text: "Users loving what you designed", weight: { web: 2 } },
        { text: "Finding clear meaning in numbers", weight: { data: 2 } },
        { text: "The system gets better by itself", weight: { ai: 2 } }
      ]
    }
  ],

  // ===============================
  // TECHNICAL + NON-CODING
  // Network vs Security vs Cloud
  // ===============================
  tech_noncoding: [
    {
      id: "confirm-noncode-1",
      question: "What type of work feels easier to you?",
      options: [
        { text: "Keeping computers connected", weight: { network: 2 } },
        { text: "Protecting systems from attacks", weight: { security: 2 } },
        { text: "Handling large online systems", weight: { cloud: 2 } }
      ]
    },
    {
      id: "confirm-noncode-2",
      question: "Which situation would you rather handle?",
      options: [
        { text: "Internet or connection not working", weight: { network: 2 } },
        { text: "Someone trying to log in wrongly", weight: { security: 2 } },
        { text: "System becoming slow or overloaded", weight: { cloud: 2 } }
      ]
    }
  ],

  // ===============================
  // NON-TECHNICAL
  // Marketing vs HR vs Logistics
  // ===============================
 non_technical: [
  {
    id: "confirm-nontech-1",
    question: "Which task sounds more satisfying?",
    options: [
      { text: "Getting people interested in something", weight: { marketing: 2 } },
      { text: "Helping people solve workplace issues", weight: { hr: 2 } },
      { text: "Making sure work runs smoothly", weight: { logistics: 2 } },
      { text: "Working with money", weight: { finance: 2 } },
      { text: "Creating videos, posts, or creative content", weight: { content: 2 } }
    ]
  },
  {
    id: "confirm-nontech-2",
    question: "When do you feel you did a good job?",
    options: [
      { text: "More people engaging with a product", weight: { marketing: 2 } },
      { text: "A team working happily together", weight: { hr: 2 } },
      { text: "Things run without problems", weight: { logistics: 2 } },
      { text: "A profitable or well-planned budget", weight: { finance: 2 } },
      { text: "Your content gets many views", weight: { content: 2 } }
    ]
  }
]

}

export default subTrackConfirmQuestions

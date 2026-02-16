const securityQuestions = [
  {
    id: "sec-1",
    question: "What interests you most about protection?",
    options: [
      { text: "Finding mistakes and loopholes", score: { security: 3, analytical: 2 } },
      { text: "Preventing things from going wrong", score: { security: 3, systems: 2 } },
      { text: "Investigating incidents", score: { security: 2, persistence: 2 } }
    ]
  },
  {
    id: "sec-2",
    question: "Which responsibility feels acceptable?",
    options: [
      { text: "Being responsible for safety", score: { security: 3 } },
      { text: "Monitoring risks continuously", score: { security: 2, control: 2 } },
      { text: "Analyzing failures logically", score: { security: 2, analytical: 2 } }
    ]
  },
  {
  id: "sec-3",
  question: "You receive an email asking for your OTP or password. What should you do?",
  options: [
    { text: "Share it quickly", score: {} },
    { text: "Ignore or report the email", score: { security: 2, analytical: 1 } },
    { text: "Reply asking why they need it", score: {} },
    { text: "Click all links to check", score: {} }
  ]
},
{
  id: "sec-4",
  question: "Which network is generally the least secure?",
  options: [
    { text: "Home Wi-Fi with password", score: {} },
    { text: "Office network", score: {} },
    { text: "Public Wi-Fi", score: { security: 2, network: 1 } },
    { text: "Mobile hotspot", score: {} }
  ]
},
{
  id: "sec-5",
  question: "Why should you regularly update software?",
  options: [
    { text: "To add new emojis", score: {} },
    { text: "To fix security vulnerabilities", score: { security: 2 } },
    { text: "To slow the system", score: {} },
    { text: "To change design only", score: {} }
  ]
},
{
  id: "sec-6",
  question: "If you notice something suspicious online, what do you do?",
  options: [
    { text: "Avoid it and report", score: { cyber_security: 2, analytical: 1 } },
    { text: "Ignore it", score: {} },
    { text: "Click to check", score: {} },
    { text: "Share with friends", score: {} }
  ]
}
]

export default securityQuestions
